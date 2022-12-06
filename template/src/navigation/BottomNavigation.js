import React, { useState, useEffect, memo } from 'react';
import { Pressable as PressAble, StyleSheet, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import isEqual from 'react-fast-compare';

import ProfileScreen from '../pages/profile/ProfileScreen';
import { deviceW } from '~/common/Constants';
import HomeScreen from '~/pages/home/HomeScreen';
import { KeyTranslate } from '~/translations/KeyTranslate';
import { EventRegister } from 'react-native-event-listeners';
import { Text, TextTranslate } from '~/components/text';
import { useLayoutDimensions } from '~/common/hooks';

const BuildNavBottom = memo(({ navigation }) => {
  const layoutDimensions = useLayoutDimensions();
  const insets = useSafeAreaInsets();
  const [tabSelected, setTabSelected] = useState(1)
  _navigate = (screenName, tabNumber) => {
    navigation.navigate(screenName);
    setTabSelected(tabNumber);
  }
  useEffect(() => {
    const listenerEvent = EventRegister.addEventListener('TAB_SELECTED', (data) => {
      setTabSelected(data)
    })
    return () => {
      EventRegister.removeEventListener(listenerEvent)
    }
  }, [])
  return (
    <View style={[styles.main, { height: 55 + insets.bottom, paddingBottom: insets.bottom, width: layoutDimensions.width }]}>

      <PressAble
        style={styles.tab}
        onPress={() => {
          _navigate("HomeScreen", 1);
        }}>
        <TextTranslate style={tabSelected == 1 && { color: 'green' }}>
          {KeyTranslate.home}
        </TextTranslate>
      </PressAble>

      <PressAble
        style={styles.tab}
        onPress={() => {
          _navigate("ProfileScreen", 2);
        }}>
        <TextTranslate style={tabSelected == 2 && { color: 'green' }}>
          {KeyTranslate.profile}
        </TextTranslate>
      </PressAble>

    </View>
  )
}, isEqual);

const Tab = createBottomTabNavigator();
const TabNavigator = memo(() => {
  return (
    <Tab.Navigator
      screenOptions={{
        lazy: true,
        headerShown: false,
        showLabel: false,
        activeTintColor: 'green',
        inactiveTintColor: 'gray',
        labelStyle: {
          fontSize: 14,
        },
        // tabBarHideOnKeyboard: true,
        tabBarStyle: { position: 'absolute', borderWidth: 10, bottom: -200 }
      }}>

      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen name="ProfileScreen" component={ProfileScreen} />

    </Tab.Navigator>
  )
}, isEqual);

export default function BottomNavigation({ navigation }) {
  return (
    <>
      <TabNavigator />
      <BuildNavBottom navigation={navigation} />
    </>
  );
}
const styles = StyleSheet.create({
  main: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: 'rgba(1,1,1,0.1)'
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50
  }
})