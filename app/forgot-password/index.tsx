import ScreenHeader from '@/components/layout/ScreenHeader';
import ScreenWrapper from '@/components/layout/ScreenWrapper';
import TextWrapper from '@/components/layout/TextWrapper';
import { Button, ButtonText } from '@/components/ui/button';
import { Link } from 'expo-router';

const ForgotPasswordScreen = () => {
  return (
    <>
      <ScreenHeader title={'Forgot password'} />
      <ScreenWrapper className="flex gap-8">
        <TextWrapper>Forgot password screen</TextWrapper>
        <Link href={`/`} asChild>
          <Button
            variant="default"
            className="max-w-32 bg-app-orange-foreground active:bg-app-orange-foreground/70"
          >
            <ButtonText>Back to Login</ButtonText>
          </Button>
        </Link>
      </ScreenWrapper>
    </>
  );
};
export default ForgotPasswordScreen;
