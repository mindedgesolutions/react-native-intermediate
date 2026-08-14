import ScreenHeader from '@/components/layout/ScreenHeader';
import ScreenWrapper from '@/components/layout/ScreenWrapper';
import TextWrapper from '@/components/layout/TextWrapper';

const AccountScreen = () => {
  return (
    <>
      <ScreenHeader title="Account details (test page)" />
      <ScreenWrapper>
        <TextWrapper>Account details screen</TextWrapper>
      </ScreenWrapper>
    </>
  );
};
export default AccountScreen;
