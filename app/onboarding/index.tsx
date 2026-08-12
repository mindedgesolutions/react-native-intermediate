import { AppLogo } from '@/components/AppLogo';
import ScreenWrapper from '@/components/layout/ScreenWrapper';
import ConfirmOnboardingModal from '@/components/modals/ConfirmOnboardingModal';
import { Text } from '@/components/ui/text';
import { themeColors } from '@/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import { View } from 'react-native';

const OnboardingScreen = () => {
  return (
    <>
      <LinearGradient
        colors={[
          themeColors.colorDarkcolorOrange,
          themeColors.colorOrange,
          themeColors.colorLightOrage,
        ]}
        className="flex-1 justify-center"
      >
        <ScreenWrapper className="w-full items-center gap-8">
          <View className="flex items-center gap-2">
            <Text className="uppercase text-2xl font-extrabold tracking-wider">
              Test
            </Text>
            <Text className="text-base font-medium tracking-wide">
              This is a test app
            </Text>
          </View>
          <AppLogo />
          <ConfirmOnboardingModal />
          <Link href={`/forgot-password`}>
            <Text>Forgot password?</Text>
          </Link>
        </ScreenWrapper>
      </LinearGradient>
    </>
  );
};
export default OnboardingScreen;
