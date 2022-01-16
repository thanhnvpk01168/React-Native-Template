import { Dimensions, Platform } from "react-native";
import { getWindowHeightAndroid } from "./nativeModule";

export const isIos = Platform.OS === 'ios';

const { width, height } = Dimensions.get("window");
export const { deviceW, deviceH } = {
    deviceW: width,
    deviceH: isIos ? height : getWindowHeightAndroid()
}
