import { useState, useEffect } from "react";
import isEqual from "react-fast-compare";
import { Dimensions } from "react-native";
import { useSelector as useReduxSelector } from 'react-redux';

import { deviceH, deviceW, isIos } from "../Constants";
import { getWindowHeightAndroid } from "../nativeModule";

export function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState({ w: deviceW, h: deviceH });

    useEffect(() => {
        const subscriptionD = Dimensions.addEventListener('change', ({ window: { width, height } }) => {
            let w = Dimensions.get("window").width;
            let h = Dimensions.get("window").height;
            if (!isIos && width < height) {
                h = getWindowHeightAndroid();
            }
            setWindowDimensions({ w, h })
        })
        return () => {
            subscriptionD.remove();
        };
    }, []);

    return windowDimensions;
}

export function useSelector(selector = () => { }) {
    return useReduxSelector(selector, isEqual);
}