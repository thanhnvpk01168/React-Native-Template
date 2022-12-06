/**
 * @format
 */
 import 'react-native-gesture-handler';
 import 'react-native-reanimated'
 import { AppRegistry } from 'react-native';
 import App from './App';
 import { name as appName } from './app.json';
 
//  LogBox.ignoreLogs([
//      "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
//  ]);
 // console.log = () => { };
 // console.info = () => { };
 // console.warn = () => { };
 // console.error = () => { };
 AppRegistry.registerComponent(appName, () => App);
 