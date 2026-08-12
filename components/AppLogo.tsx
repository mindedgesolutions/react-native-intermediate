import { Image } from 'react-native';

type LogoProps = {
  width?: number;
  height?: number;
};

export function AppLogo({ width = 60, height = 100 }: LogoProps) {
  return (
    <Image
      source={require('@/assets/national-emblem.png')}
      style={{ width: width, height: height }}
      className="object-cover"
    />
  );
}
