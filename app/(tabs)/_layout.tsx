import { Redirect, Stack, Tabs } from 'expo-router';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { themeColors } from '@/theme';
import { useUserStore } from '@/store/user.store';

const TabLayout = () => {
  const { hasFinishedOnboarding } = useUserStore();
  if (!hasFinishedOnboarding) {
    return <Redirect href={`/onboarding`} />;
  }
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: themeColors.colorWhite,
          borderColor: themeColors.colorWhite,
        },
        tabBarActiveTintColor: themeColors.colorOrange,
        tabBarInactiveTintColor: themeColors.colorBlack,
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          title: 'Home',
          tabBarIcon: ({ size, color }) => {
            return <Entypo name="leaf" size={size} color={color} />;
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ size, color }) => {
            return (
              <MaterialIcons name="account-circle" size={size} color={color} />
            );
          },
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: 'Orders',
          tabBarIcon: ({ size, color }) => {
            return <Entypo name="add-to-list" size={size} color={color} />;
          },
        }}
      />
    </Tabs>
  );
};
export default TabLayout;
