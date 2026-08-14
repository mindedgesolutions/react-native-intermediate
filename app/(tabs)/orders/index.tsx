import ScreenHeader from '@/components/layout/ScreenHeader';
import ScreenWrapper from '@/components/layout/ScreenWrapper';
import TextWrapper from '@/components/layout/TextWrapper';

const ListOrdersScreen = () => {
  return (
    <>
      <ScreenHeader title="Orders (test page)" />
      <ScreenWrapper>
        <TextWrapper>List of orders</TextWrapper>
      </ScreenWrapper>
    </>
  );
};
export default ListOrdersScreen;
