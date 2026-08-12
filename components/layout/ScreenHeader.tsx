import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '../ui/text';
import { LinearGradient } from 'expo-linear-gradient';
import { themeColors } from '../../theme';
import { Link } from 'expo-router';
import { Button } from '../ui/button';

type ScreenHeaderProps = {
  title: string;
  link?: string;
  linkText?: string;
  linkIcon?: React.ReactNode;
};

export default function ScreenHeader({
  title,
  link,
  linkText,
  linkIcon: LinkIcon,
}: ScreenHeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <LinearGradient
      colors={[themeColors.colorOrange, themeColors.colorDarkcolorOrange]}
      style={{ paddingTop: insets.top }}
    >
      <View className="px-5 py-2 flex flex-row justify-between items-center">
        <Text className="text-base tracking-wider text-card font-bold">
          {title}
        </Text>
        {link && (
          <Link href={link} asChild>
            <Button size="icon" variant="link">
              <View className="flex flex-row gap-1.5">
                {LinkIcon}
                {linkText && <Text className="text-card">{linkText}</Text>}
              </View>
            </Button>
          </Link>
        )}
      </View>
    </LinearGradient>
  );
}
