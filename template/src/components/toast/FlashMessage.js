import { View } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { Portal } from '@gorhom/portal'
import { EventRegister } from 'react-native-event-listeners'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { COLORS } from '~/common/Constants'
import { Text } from '../text'
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
import { useLayoutDimensions } from '~/common/hooks'

let timeout = null;
export default function FlashMessage() {
    const layoutDimensions = useLayoutDimensions();
    const maxY = useMemo(() => -(layoutDimensions.height / 3 + 10), [layoutDimensions.height]);
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
                    { width: layoutDimensions.width, height: layoutDimensions.height / 3, position: 'absolute' },
                    animatedTranslateY
                ]}>
                <View style={{ width: layoutDimensions.width, backgroundColor: state.backgroundColor, alignItems: 'center', paddingTop: insets.top + 5, paddingBottom: 5 }}>
                    <Text style={state.textStyle}>{state.message}</Text>
                </View>
            </Animated.View>
        </Portal>
    )
}