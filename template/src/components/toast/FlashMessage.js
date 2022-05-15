import { View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Portal } from '@gorhom/portal'
import { EventRegister } from 'react-native-event-listeners'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { COLORS, deviceH, deviceW } from '~/common/Constants'
import { Text } from '../text'
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'

let timeout = null;
const maxY = -(deviceH / 3 + 10);
export default function FlashMessage() {

    const insets = useSafeAreaInsets();
    const translateYValue = useSharedValue(maxY);
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
                translateYValue.value = withSpring(maxY, { damping: 12 });
            }, 3000);

        });
        return () => {
            EventRegister.removeEventListener(listEventShowMsg);
        }
    }, [])


    return (
        <Portal>
            <Animated.View
                pointerEvents={'box-none'}
                style={[
                    { width: deviceW, height: deviceH / 3, position: 'absolute' },
                    animatedTranslateY
                ]}>
                <View style={{ width: deviceW, backgroundColor: state.backgroundColor, alignItems: 'center', paddingTop: insets.top + 5, paddingBottom: 5 }}>
                    <Text style={state.textStyle}>{state.message}</Text>
                </View>
            </Animated.View>
        </Portal>
    )
}