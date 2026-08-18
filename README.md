This is a repository for a start / intermediate React-Native using Uniwind CSS and Gluestack UI library along with Zod validation. The main highlight of this repo are:
1. Completely custom datepicker component (Not Gluestack UI standard datepicker)

I will keep adding more and more code. Below is how I setup the entire project. Feel free to customize as per requirements:
1.  npm create expo-app -- taskly --template
2.  npm install uniwind tailwindcss
3.  global.css (create if not there)
4.  global.css (add following)
    @import 'tailwindcss';
    @import 'uniwind';
5.  Create global.d.ts and add:
    /// <reference types="uniwind/types" />

    declare module '*.css';

6.  import './global.css' in App.tsx
7.  If you don't see a metro.config.js file in your project, you can create it with npx expo customize metro.config.js
8.  replace present metro.config.js code with the following:
    const { getDefaultConfig } = require('expo/metro-config');
    const { withUniwindConfig } = require('uniwind/metro');

    const config = getDefaultConfig(__dirname);

    module.exports = withUniwindConfig(config, {
    cssEntryFile: './global.css',
    dtsFile: './uniwind-types.d.ts',
    extraThemes: ['dark'],
    });

9.  global.d.ts (create)
10. global.d.ts (add following):
    /// <reference types="uniwind/types" />

    declare module '*.css';

11. npx gluestack-ui@latest init
12. npx expo install react-native-gesture-handler react-native-reanimated react-native-safe-area-context react-native-svg react-dom react-native-web
13. npx expo install babel-preset-expo
14. babel.config.js (add following if not there):
    module.exports = function (api) {
    api.cache(true);

        return {
        presets: ['babel-preset-expo'],

            plugins: [
              [
                'module-resolver',
                {
                  root: ['./'],
                  alias: {
                    '@': './',
                  },
                },
              ],
              'react-native-worklets/plugin',
            ],

        };

    };

15. npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar
16. package.json - change "main": "index.ts" to "main": "expo-router/entry"
17. npx expo install @react-native-async-storage/async-storage - this package is installed to access localStorage
18. npx expo install expo-notifications expo-device - these packages are used for push notifications (locally)
19. npm i expo-linear-gradient - gradient lib (LinearGradient)
20. npx expo install react-native-keyboard-aware-scroll-view - To show bottom most input fields of a long form (if not used, bottom most fields will be overlayed by keyboard)
21. npx expo install expo-image-picker - for selecting images from phone gallery (without permission)
22. adb shell rm /sdcard/Download/* - to delete all files / folders from local storage (folder > cmd > run command)
23. adb push "C:\Users\hp\Downloads\a.jpg" /sdcard/Download/a.jpg - for adding photo
24. adb shell ls -l /sdcard/Download/ - to check photos
25. npx expo install expo-file-system - download, move files etc.
26. npx expo install expo-dev-client - needed for production build
27. npx expo prebuild --platform android --clean and npx expo prebuild --platform ios --clean - to create native project
28. npx expo run:android - to run the native bundle
29. to create APK, run: 1. cd android 2. gradlew.bat assembleRelease
30. gradlew assembleRelease -PreactNativeArchitectures=arm64-v8a - for android APK only (reduces APK size)
31. if splash screen and app icon doesn't update, run the following:
    a. npx expo prebuild --platform android --clean
    b. npx expo run:android
32. for gluestack ui calendar, below additional packges will be needed:
    a. npx gluestack-ui@latest add menu
    b. npx expo install @react-stately/utils

---

if after the setup, if error: return RNGestureHandlerModule.installUIRuntimeBindings() happens then: npx expo install --fix
this happens mostly because incompatible "react-native-gesture-handler" version (incompatible 3._, compatible 2._)

---

<!-- remove all backslashes (\) and keep the remaining special characters -->

App setup (layouts and screens):

1. Create providers folder
2. Create AppProvider.tsx
3. AppProvider.tsx:
   import '@/global.css';
   import { GestureHandlerRootView } from 'react-native-gesture-handler';
   import {
   SafeAreaListener,
   SafeAreaProvider,
   } from 'react-native-safe-area-context';
   import { Uniwind } from 'uniwind';
   import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';

const AppProvider = ({ children }: { children: React.ReactNode }) => {
return (
<GestureHandlerRootView style={{ flex: 1 }}>
<SafeAreaProvider>
<SafeAreaListener
onChange={({ insets }) => {
Uniwind.updateInsets(insets);
}} >
<GluestackUIProvider mode="system">{children}</GluestackUIProvider>
</SafeAreaListener>
</SafeAreaProvider>
</GestureHandlerRootView>
);
};
export default AppProvider;

4. Create app folder
5. Create _layout.tsx
6. _layout.tsx
   import AppProvider from '@/providers/AppProvider';
   import { StatusBar } from 'expo-status-bar';
   import { Stack } from 'expo-router';

const RootLayout = () => {
return (
<>
<AppProvider>
<StatusBar style="light" hidden={false} />
<Stack screenOptions={{ headerShown: false }} />
</AppProvider>
</>
);
};
export default RootLayout;

7. Create (tabs) folder
8. Create 2 files: _layout.tsx, index.tsx
9. _layout.tsx
   import { Tabs } from 'expo-router';
   import Entypo from '@expo/vector-icons/Entypo';
   import Foundation from '@expo/vector-icons/Foundation';
   import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const TabLayout = () => {
return (
<Tabs
screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderColor: '#fff',
        },
        tabBarActiveTintColor: '#dc2626',
        tabBarInactiveTintColor: '#000',
      }} >
<Tabs.Screen
name="index"
options={{
          title: 'Home',
          tabBarIcon: ({ color }) => {
            return <Entypo name="home" size={18} color={color} />;
          },
        }}
/>
<Tabs.Screen
name="counter"
options={{
          title: 'Counter',
          tabBarIcon: ({ color }) => {
            return <Entypo name="add-to-list" size={18} color={color} />;
          },
        }}
/>
<Tabs.Screen
name="idea"
options={{
          title: 'Ideas',
          tabBarIcon: ({ color }) => {
            return <Foundation name="lightbulb" size={18} color={color} />;
          },
        }}
/>
<Tabs.Screen
name="articles"
options={{
          title: 'Articles',
          tabBarIcon: ({ color }) => {
            return <MaterialIcons name="article" size={18} color={color} />;
          },
        }}
/>
</Tabs>
);
};
export default TabLayout;

10. if there's no tabs or bottom navigation, then:
    import { Stack } from 'expo-router';

const TabLayout = () => {
return <Stack screenOptions={{ headerShown: false }} />;
};
export default TabLayout;

11. index.tsx:
    import { Text, View } from 'react-native';

export default function App() {
return (
<View>
<Text>This is the landing screen</Text>
</View>
);
}

12. Change import path in root index.ts: import App from './app/(tabs)';
