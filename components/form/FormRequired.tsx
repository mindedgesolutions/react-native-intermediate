import { View } from 'react-native';
import { Text } from '../ui/text';

const FormRequired = () => {
  return (
    <View>
      <Text className="text-destructive">*</Text>
    </View>
  );
};
export default FormRequired;
