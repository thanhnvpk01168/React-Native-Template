import { Dimensions, Platform } from "react-native";
import { initialWindowMetrics } from "react-native-safe-area-context";

export const isIos = Platform.OS === 'ios';

const { width, height } = Dimensions.get("window");
export const { deviceW, deviceH } = {
    deviceW: width,
    deviceH: isIos ? height : initialWindowMetrics.frame.height + initialWindowMetrics.frame.y
}


export const COLORS = {
    warnBg: '#fff3cd',
    warnText: '#664d03',

    successBg: '#d1e7dd',
    successText: '#0f5132',

    errorBg: '#f8d7da',
    errorText: '#842029',

    infoBg: '#cff4fc',
    infoText: '#055160',
}
