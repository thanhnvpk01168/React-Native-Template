import { useState, useEffect } from "react";
import isEqual from "react-fast-compare";
import { EventRegister } from "react-native-event-listeners";
import { useSelector as useReduxSelector } from 'react-redux';
import { GlobalVariants } from "../GlobalVariants";

export function useLayoutDimensions() {
    const [layoutDimensions, setLayoutDimensions] = useState({ "height": GlobalVariants.layoutHeight, "width": GlobalVariants.layoutWidth, "x": 0, "y": 0 });
    useEffect(() => {
        const listenerEvent = EventRegister.addEventListener('SET_SIZE_LAYOUT', (layout) => {
            setLayoutDimensions({ ...layout })
        })
        return () => {
            EventRegister.removeEventListener(listenerEvent)
        }
    }, []);
    return layoutDimensions;
}

export function useSelector(selector = () => { }) {
    return useReduxSelector(selector, isEqual);
}