import { StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Portal } from '@gorhom/portal'
import { EventRegister } from 'react-native-event-listeners'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { COLORS, deviceW } from '~/common/Constants'
import { Text } from '../text'
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'

let timeout = null;
export default function FlashMessage() {

    const insets = useSafeAreaInsets();
    const translateYValue = useSharedValue(-100 - insets.top);
    const [state, setState] = useState({
        backgroundColor: COLORS.successBg,
        message: "Writes your message here",
        textStyle: { color: COLORS.successText }
    })

    const animatedTranslateY = useAnimatedStyle(() => {
        return {
            transform: [
                { translateY: translateYValue.value }
            ]
        }
    })

    useEffect(() => {
        const listEventShowMsg = EventRegister.addEventListener("show_flash_msg", ({ backgroundColor, message, textStyle }) => {
            try {
                clearTimeout(timeout);
            } catch (error) { }

            setState({
                backgroundColor,
                message,
                textStyle
            })

            translateYValue.value = withSpring(0, { damping: 20 });
            timeout = setTimeout(() => {
                translateYValue.value = withSpring(-100 - insets.top, { damping: 12 });
            }, 3000);

        });
        return () => {
            EventRegister.removeEventListener(listEventShowMsg);
        }
    }, [])


    return (
        <Portal>
            <Animated.View
                style={[
                    { width: deviceW, backgroundColor: state.backgroundColor, position: 'absolute', top: 0, paddingTop: insets.top + 5, alignItems: 'center', paddingBottom: 5 },
                    animatedTranslateY
                ]}>
                <Text style={state.textStyle}>{state.message}</Text>
            </Animated.View>
        </Portal>
    )
}