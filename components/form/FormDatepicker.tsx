import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import DatePicker, { type DatePickerProps } from './custom/Datepicker';
import { Text } from '../ui/text';

type FormDatePickerProps<T extends FieldValues> = Omit<
  DatePickerProps,
  'value' | 'onChange' | 'error'
> & {
  name: Path<T>;
  control: Control<T>;
  error?: string;
};

const FormDatepicker = <T extends FieldValues>({
  name,
  control,
  error,
  ...props
}: FormDatePickerProps<T>) => {
  console.log(error);
  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState }) => (
          <DatePicker
            {...props}
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />
      {error && <Text className="text-destructive text-sm">{error}</Text>}
    </>
  );
};
export default FormDatepicker;
