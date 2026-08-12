import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { Input, InputField } from '../ui/input';
import { KeyboardTypeOptions, ReturnKeyTypeOptions } from 'react-native';
import { Text } from '../ui/text';

type FormInputProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  errorMsg?: string;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions | undefined;
  returnKeyType?: ReturnKeyTypeOptions | undefined;
};

const FormInput = <T extends FieldValues>({
  name,
  control,
  errorMsg,
  placeholder,
  keyboardType,
  returnKeyType,
}: FormInputProps<T>) => {
  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Input className="my-1">
            <InputField
              type="text"
              placeholder={placeholder || 'Enter details'}
              value={field.value}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              returnKeyType={returnKeyType}
              keyboardType={keyboardType}
            />
          </Input>
        )}
      />
      {errorMsg ? (
        <Text className="text-destructive text-sm">{errorMsg}</Text>
      ) : undefined}
    </>
  );
};
export default FormInput;
