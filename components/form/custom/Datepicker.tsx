import { useEffect, useMemo, useState } from 'react';
import { Modal, Pressable, Text, View, type ViewStyle } from 'react-native';
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isAfter,
  isBefore,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
  subMonths,
} from 'date-fns';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { themeColors } from '@/theme';

type DatePickerValue = Date | string | null | undefined;

export type DatePickerProps = {
  value?: DatePickerValue;
  onChange?: (date: Date) => void;
  placeholder?: string;
  dateFormat?: string;
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
  /** Number of years shown in the year selector. */
  minYear?: number;
  maxYear?: number;
  /** First day of week. 0 = Sunday, 1 = Monday, etc. */
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
  /** Optional style for the modal calendar container. */
  calendarStyle?: ViewStyle;
};

const DEFAULT_DATE_FORMAT = 'dd/MM/yyyy';

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const WEEK_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// ---------------------------

const parseDate = (value: DatePickerValue): Date | undefined => {
  if (!value) return undefined;

  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? undefined : value;
  }

  const date = new Date(value);

  return Number.isNaN(date.getTime()) ? undefined : date;
};

// ---------------------------

const isDateDisabled = (date: Date, minDate?: Date, maxDate?: Date) => {
  if (minDate && isBefore(date, minDate)) {
    return true;
  }

  if (maxDate && isAfter(date, maxDate)) {
    return true;
  }

  return false;
};

// Component starts -------------

const DatePicker = ({
  value,
  onChange,
  placeholder = 'Select date',
  dateFormat = DEFAULT_DATE_FORMAT,
  minDate,
  maxDate,
  disabled = false,
  minYear,
  maxYear,
  weekStartsOn = 0,
  className = '',
  calendarStyle,
}: DatePickerProps) => {
  const selectedDate = useMemo(() => parseDate(value), [value]);

  const today = new Date();

  const defaultMinYear = minYear ?? today.getFullYear() - 5;
  const defaultMaxYear = maxYear ?? today.getFullYear() + 5;

  const initialMonth = selectedDate
    ? startOfMonth(selectedDate)
    : startOfMonth(today);

  const [open, setOpen] = useState(false);
  const [visibleMonth, setVisibleMonth] = useState(initialMonth);
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [showYearPicker, setShowYearPicker] = useState(false);

  /**
   * When the value changes from outside the component,
   * keep the visible calendar in sync with it.
   */
  useEffect(() => {
    if (selectedDate) {
      setVisibleMonth(startOfMonth(selectedDate));
    }
  }, [selectedDate]);

  // ---------------------------

  const displayValue = selectedDate ? format(selectedDate, dateFormat) : '';

  // ---------------------------

  const calendarDays = useMemo(() => {
    const monthStart = startOfMonth(visibleMonth);
    const monthEnd = endOfMonth(visibleMonth);

    const start = startOfWeek(monthStart, {
      weekStartsOn,
    });

    const end = endOfWeek(monthEnd, {
      weekStartsOn,
    });

    return eachDayOfInterval({
      start,
      end,
    });
  }, [visibleMonth, weekStartsOn]);

  // ---------------------------

  const years = useMemo(() => {
    return Array.from(
      { length: defaultMaxYear - defaultMinYear + 1 },
      (_, index) => defaultMinYear + index,
    );
  }, [defaultMinYear, defaultMaxYear]);

  // ---------------------------

  const canGoToPreviousMonth = useMemo(() => {
    if (!minDate) return true;

    return !isBefore(
      endOfMonth(subMonths(visibleMonth, 1)),
      startOfMonth(minDate),
    );
  }, [visibleMonth, minDate]);

  // ---------------------------

  const canGoToNextMonth = useMemo(() => {
    if (!maxDate) return true;

    return !isAfter(
      startOfMonth(addMonths(visibleMonth, 1)),
      endOfMonth(maxDate),
    );
  }, [visibleMonth, maxDate]);

  // ---------------------------

  const closeCalendar = () => {
    setOpen(false);
    setShowMonthPicker(false);
    setShowYearPicker(false);
  };

  // ---------------------------

  const openCalendar = () => {
    if (disabled) return;

    if (selectedDate) {
      setVisibleMonth(startOfMonth(selectedDate));
    } else {
      setVisibleMonth(startOfMonth(today));
    }

    setOpen(true);
  };

  // ---------------------------

  const handleDatePress = (date: Date) => {
    if (isDateDisabled(date, minDate, maxDate)) return;

    onChange?.(date);
    closeCalendar();
  };

  // ---------------------------

  const goToPreviousMonth = () => {
    if (!canGoToPreviousMonth) return;

    setVisibleMonth((current) => subMonths(current, 1));
  };

  // ---------------------------

  const goToNextMonth = () => {
    if (!canGoToNextMonth) return;

    setVisibleMonth((current) => addMonths(current, 1));
  };

  // ---------------------------

  const handleMonthSelect = (monthIndex: number) => {
    setVisibleMonth(new Date(visibleMonth.getFullYear(), monthIndex, 1));

    setShowMonthPicker(false);
  };

  // ---------------------------

  const handleYearSelect = (year: number) => {
    setVisibleMonth(new Date(year, visibleMonth.getMonth(), 1));

    setShowYearPicker(false);
  };

  // ---------------------------

  const renderCalendarDay = (date: Date) => {
    const selected = selectedDate ? isSameDay(date, selectedDate) : false;

    const todayDate = isSameDay(date, today);

    const currentMonth = isSameMonth(date, visibleMonth);

    const dateDisabled = isDateDisabled(date, minDate, maxDate);

    return (
      <Pressable
        key={date.toISOString()}
        disabled={dateDisabled}
        onPress={() => handleDatePress(date)}
        className={[
          'h-11 w-11 items-center justify-center rounded-full',
          selected ? 'bg-primary' : '',
          !currentMonth ? 'opacity-30' : '',
          dateDisabled ? 'opacity-30' : '',
        ].join(' ')}
      >
        <Text
          className={[
            'text-sm',
            selected
              ? 'font-semibold text-primary-foreground'
              : 'text-foreground',
            todayDate && !selected ? 'font-bold' : '',
          ].join(' ')}
        >
          {format(date, 'd')}
        </Text>

        {todayDate && !selected ? (
          <View className="absolute bottom-1 h-1 w-1 rounded-full bg-primary" />
        ) : null}
      </Pressable>
    );
  };

  return (
    <>
      <View className={className}>
        <Pressable
          disabled={disabled}
          onPress={openCalendar}
          className={[
            'h-9 flex-row items-center rounded-lg border border-muted-foreground/30 px-4',
            disabled ? 'bg-muted opacity-60' : 'bg-background',
          ].join(' ')}
        >
          <Text
            className={[
              'flex-1 text-base',
              displayValue ? 'text-foreground' : 'text-muted-foreground',
            ].join(' ')}
          >
            {displayValue || placeholder}
          </Text>

          {/* Calendar icon */}
          <FontAwesome
            name="calendar"
            size={20}
            color={themeColors.colorLightGray}
          />
        </Pressable>
      </View>

      {/* Modal */}
      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={closeCalendar}
      >
        <View className="flex-1 items-center justify-center">
          {/* Backdrop */}
          <Pressable
            className="absolute inset-0 bg-black/40"
            onPress={closeCalendar}
          />

          {/* Calendar */}
          <View
            style={calendarStyle}
            className="w-87.5 overflow-hidden rounded-2xl bg-background p-4"
          >
            {/* Header */}
            <View className="mb-4 flex-row items-center justify-between">
              <Pressable
                onPress={goToPreviousMonth}
                disabled={!canGoToPreviousMonth}
                className="h-10 w-10 items-center justify-center rounded-full"
              >
                <Text
                  className={[
                    'text-2xl',
                    canGoToPreviousMonth
                      ? 'text-foreground'
                      : 'text-muted-foreground',
                  ].join(' ')}
                >
                  ‹
                </Text>
              </Pressable>

              <View className="flex-row items-center gap-2">
                {/* Month */}
                <Pressable
                  onPress={() => {
                    setShowMonthPicker((current) => !current);
                    setShowYearPicker(false);
                  }}
                  className="rounded-md px-2 py-2"
                >
                  <Text className="text-base font-semibold text-foreground">
                    {MONTHS[visibleMonth.getMonth()]}
                  </Text>
                </Pressable>

                {/* Year */}
                <Pressable
                  onPress={() => {
                    setShowYearPicker((current) => !current);
                    setShowMonthPicker(false);
                  }}
                  className="rounded-md px-2 py-2"
                >
                  <Text className="text-base font-semibold text-foreground">
                    {visibleMonth.getFullYear()}
                  </Text>
                </Pressable>
              </View>

              <Pressable
                onPress={goToNextMonth}
                disabled={!canGoToNextMonth}
                className="h-10 w-10 items-center justify-center rounded-full"
              >
                <Text
                  className={[
                    'text-2xl',
                    canGoToNextMonth
                      ? 'text-foreground'
                      : 'text-muted-foreground',
                  ].join(' ')}
                >
                  ›
                </Text>
              </Pressable>
            </View>

            {/* Month picker */}
            {showMonthPicker ? (
              <View className="mb-4 rounded-xl border border-border bg-background p-2">
                <View className="flex-row flex-wrap">
                  {MONTHS.map((month, index) => {
                    const active = index === visibleMonth.getMonth();

                    return (
                      <Pressable
                        key={month}
                        onPress={() => handleMonthSelect(index)}
                        className={[
                          'w-1/3 items-center rounded-lg px-2 py-3',
                          active ? 'bg-primary' : '',
                        ].join(' ')}
                      >
                        <Text
                          className={[
                            'text-sm',
                            active
                              ? 'font-semibold text-primary-foreground'
                              : 'text-foreground',
                          ].join(' ')}
                        >
                          {month.substring(0, 3)}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              </View>
            ) : null}

            {/* Year picker */}
            {showYearPicker ? (
              <View className="mb-4 max-h-64 rounded-xl border border-border bg-background">
                <View className="flex-row flex-wrap p-2">
                  {years.map((year) => {
                    const active = year === visibleMonth.getFullYear();

                    return (
                      <Pressable
                        key={year}
                        onPress={() => handleYearSelect(year)}
                        className={[
                          'w-1/4 items-center rounded-lg px-2 py-3',
                          active ? 'bg-primary' : '',
                        ].join(' ')}
                      >
                        <Text
                          className={[
                            'text-sm',
                            active
                              ? 'font-semibold text-primary-foreground'
                              : 'text-foreground',
                          ].join(' ')}
                        >
                          {year}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              </View>
            ) : null}

            {/* Weekdays */}
            <View className="mb-2 flex-row">
              {Array.from({ length: 7 }, (_, index) => {
                const weekdayIndex = (index + weekStartsOn) % 7;

                return (
                  <View
                    key={weekdayIndex}
                    className="w-[14.2857%] items-center"
                  >
                    <Text className="text-xs font-medium text-muted-foreground">
                      {WEEK_DAYS[weekdayIndex]}
                    </Text>
                  </View>
                );
              })}
            </View>

            {/* Calendar grid */}
            <View className="flex-row flex-wrap">
              {calendarDays.map(renderCalendarDay)}
            </View>

            {/* Footer */}
            <View className="mt-4 flex-row justify-end">
              <Pressable
                onPress={closeCalendar}
                className="rounded-lg px-4 py-2"
              >
                <Text className="font-medium text-muted-foreground">
                  Cancel
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};
export default DatePicker;
