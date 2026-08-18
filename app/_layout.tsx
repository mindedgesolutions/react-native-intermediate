import AppProvider from '@/providers/AppProvider';
import { StatusBar } from 'expo-status-bar';
import { Stack } from 'expo-router';

const RootLayout = () => {
  return (
    <>
      <AppProvider>
        <StatusBar style="light" hidden={false} />
        <Stack screenOptions={{ headerShown: false, animation: 'fade' }}>
          <Stack.Screen
            name="new"
            options={{
              presentation: 'containedModal',
              animation: 'slide_from_bottom',
            }}
          />
        </Stack>
      </AppProvider>
    </>
  );
};
export default RootLayout;
