import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ProfileScreen from '../pages/profile/ProfileScreen';
import { deviceW } from '~/common/Constants';
import { Pressable as PressAble, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TextNormal } from '~/components/text/TextNormal';
import HomeScreen from '~/pages/home/HomeScreen';
import { translate } from '~/translations/i18n';
import { KeyTranslate } from '~/translations/KeyTranslate';
import { EventRegister } from 'react-native-event-listeners';

const BuildNavBottom = ({ navigation }) => {
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
    <View style={[styles.main, { height: 55 + insets.bottom, paddingBottom: insets.bottom }]}>

      <PressAble
        style={styles.tab}
        onPress={() => {
          _navigate("HomeScreen", 1);
        }}>
        <TextNormal style={tabSelected == 1 && { color: 'green' }}>
          {translate(KeyTranslate.home)}
        </TextNormal>
      </PressAble>

      <PressAble
        style={styles.tab}
        onPress={() => {
          _navigate("ProfileScreen", 2);
        }}>
        <TextNormal style={tabSelected == 2 && { color: 'green' }}>
          {translate(KeyTranslate.profile)}
        </TextNormal>
      </PressAble>

    </View>
  )
}

const Tab = createBottomTabNavigator();
export default function BottomNavigation({ navigation }) {
  return (
    <>
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
      <BuildNavBottom navigation={navigation} />
    </>
  );
}
const styles = StyleSheet.create({
  main: {
    position: 'absolute',
    bottom: 0,
    width: deviceW,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth:1,
    borderColor:'rgba(1,1,1,0.1)'
  },
  tab: {
    flex: 1,
    justifyContent:'center',
    alignItems:'center',
    height:50
  }
})