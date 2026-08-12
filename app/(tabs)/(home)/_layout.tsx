import { Stack } from 'expo-router';

const HomeLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false, animation: 'fade' }}></Stack>
  );
};
export default HomeLayout;
