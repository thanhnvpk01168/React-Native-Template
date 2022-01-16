import React from 'react';

import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen';

import BottomNavigation from './BottomNavigation';
import HomeScreen from '../pages/home/HomeScreen';

const Stack = createNativeStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
  },
};

const hideSplashScreen = () => {
  setTimeout(() => {
    SplashScreen.hide();
  }, 1500);
}

export default function AppNavigation() {
  return (
    <NavigationContainer onReady={hideSplashScreen}>
      <Stack.Navigator
        initialRouteName={'BottomNavigation'}
        screenOptions={{
          headerShown: false,
        }}>

        <Stack.Screen name="BottomNavigation" component={BottomNavigation} />
        {/* <Stack.Screen name="HomeScreen" component={HomeScreen} /> */}

      </Stack.Navigator>
    </NavigationContainer>

  );
}

