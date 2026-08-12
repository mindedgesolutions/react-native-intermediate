import ScreenHeader from '@/components/layout/ScreenHeader';
import ScreenWrapper from '@/components/layout/ScreenWrapper';
import { Text } from '@/components/ui/text';

const AccountScreen = () => {
  return (
    <>
      <ScreenHeader title="Account details" />
      <ScreenWrapper>
        <Text>Account details screen</Text>
      </ScreenWrapper>
    </>
  );
};
export default AccountScreen;
