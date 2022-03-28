import { useTheme as useThemeRN } from '@react-navigation/native';

import { ColorDefault, ColorDark } from './color';

const Default = {
  dark: false,
  colors: ColorDefault,
};
const Dark = {
  dark: true,
  colors: ColorDark,
};
export const MyAppTheme = {
  default: Default,
  dark: Dark,
};


export const useTheme = () => {
  const payload = useThemeRN();
  return payload;
};



//     - payload -
// {
//   "colors": {
//     "background": "rgb(1, 1, 1)",
//     "border": "rgb(39, 39, 41)",
//     "card": "rgb(18, 18, 18)",
//     "error": "rgb(255, 59, 48)",
//     "info": "#ffd700",
//     "notification": "rgb(255, 69, 58)",
//     "primary": "rgb(10, 132, 255)",
//     "text": "#ffd700"
//   },
//   "dark": true
// }

{/* <NavigationContainer onReady={() => {do something}} theme={MyAppTheme["dark"]} /> */ }