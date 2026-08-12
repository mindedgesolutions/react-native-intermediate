import ScreenHeader from '@/components/layout/ScreenHeader';
import ScreenWrapper from '@/components/layout/ScreenWrapper';
import { Text } from '@/components/ui/text';
import { themeColors } from '@/theme';
import Entypo from '@expo/vector-icons/Entypo';

const ForgotPasswordScreen = () => {
  return (
    <>
      <ScreenHeader
        title={'Forgot password screen'}
        link={`/`}
        linkText="Back to home"
        linkIcon={
          <Entypo name="home" size={18} color={themeColors.colorWhite} />
        }
      />
      <ScreenWrapper>
        <Text>Forgot password screen</Text>
      </ScreenWrapper>
    </>
  );
};
export default ForgotPasswordScreen;
