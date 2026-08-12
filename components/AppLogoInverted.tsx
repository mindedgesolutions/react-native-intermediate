import { Image } from 'react-native';

const AppLogoInverted = () => {
  return (
    <Image
      source={require('@/assets/national-emblem-inverted.png')}
      style={{ width: 60, height: 100 }}
    />
  );
};
export default AppLogoInverted;
