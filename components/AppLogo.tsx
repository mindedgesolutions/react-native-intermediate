import { Image } from 'react-native';

type LogoProps = {
  width?: number;
  height?: number;
};

export function AppLogo({ width = 90, height = 150 }: LogoProps) {
  return (
    <Image
      source={require('@/assets/national-emblem.png')}
      style={{ width: width, height: height }}
      className="object-cover"
    />
  );
}
