import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { Textarea, TextareaInput } from '../ui/textarea';
import { Text } from '../ui/text';

type FormInputProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  errorMsg?: string;
  placeholder?: string;
};

const FormTextarea = <T extends FieldValues>({
  name,
  control,
  errorMsg,
  placeholder,
}: FormInputProps<T>) => {
  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Textarea size="sm">
            <TextareaInput
              placeholder={placeholder || 'Enter details'}
              value={field.value}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
            />
          </Textarea>
        )}
      />
      {errorMsg ? (
        <Text className="text-destructive text-sm">{errorMsg}</Text>
      ) : undefined}
    </>
  );
};
export default FormTextarea;
