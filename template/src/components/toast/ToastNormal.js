/**
 * Example
showToast({
    content: "test green",
    contentStyle: { color: 'green', fontSize: 15 },
    backgroundColor: 'white'
})
 */
import React, { useEffect, useState } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { EventRegister } from 'react-native-event-listeners';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SvgComponent } from '~/assets/svgIcon';

import { SvgIcon } from '../svgIcon/SvgIconComponent';
import { Text } from '../text';

let totalForceUpdate = 1;
let timeOut = null;
let measureHeightToast = 0;
let content = null;
let background = "white";
let btnClose = { visible: false };

const hideToast = (animTranslateYValue) => {
    try {
        clearTimeout(timeOut);
    } catch (error) { }
    animTranslateYValue.value = withSpring(-measureHeightToast - 10, { damping: 60 });
}

const setForceUpdate = (setForceUpdateState) => {
    ++totalForceUpdate;
    setForceUpdateState(totalForceUpdate);
}

export default function ToastNormal() {
    const insets = useSafeAreaInsets()
    const animTranslateYValue = useSharedValue(-50);
    const [forceUpdate, setForceUpdateState] = useState(0);

    const animTranslateYStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateY: animTranslateYValue.value }
            ]
        }
    });

    useEffect(() => {
        const listEventShowToast = EventRegister.addEventListener("show_toast", ({ content_e, backgroundColor, contentStyle, showBtnClose }) => {
            try {
                clearTimeout(timeOut);
            } catch (error) { }
            content = { msg: content_e, style: contentStyle };
            background = backgroundColor;
            btnClose = { visible: showBtnClose };
            setForceUpdate(setForceUpdateState);
        });
        return () => {
            EventRegister.removeEventListener(listEventShowToast);
            totalForceUpdate = 1;
            timeOut = null;
            measureHeightToast = 0;
            content = null;
            background = "white";
            btnClose = { visible: false }
        }
    }, []);

    return (
        <Animated.View
            key={`ToastNormal${forceUpdate}`}
            onLayout={(event) => {
                if (content !== null) {
                    const h = event.nativeEvent.layout.height + insets.top;
                    measureHeightToast = h;
                    animTranslateYValue.value = withSpring(insets.top + 5, { damping: 12 });
                    timeOut = setTimeout(() => {
                        animTranslateYValue.value = withSpring(-h - 10, { damping: 60 });
                    }, 3000)
                }
            }}
            style={[
                styles.main,
                animTranslateYStyle,
                {
                    backgroundColor: background,
                    borderWidth: 1.5,
                    borderColor: 'rgba(196, 196, 196,.2)'
                }
            ]}>
            <Text style={content?.style || {}}>
                {content?.msg}
            </Text>
            {
                btnClose.visible &&
                <View style={[styles.btnClose, styles.shadow]}>
                    <Pressable
                        style={{ width: 20, height: 20, justifyContent: 'center', alignItems: 'center' }}
                        onPress={() => hideToast(animTranslateYValue)}>
                        <SvgIcon source={SvgComponent.close_x} color='red' size={10} />
                    </Pressable>

                </View>
            }
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    main: {
        backgroundColor: 'white',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        marginHorizontal: 10,
        padding: 10,
        borderRadius: 10,
        overflow: 'visible',
        zIndex: 1
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 5,
    },
    btnClose: {
        width: 20,
        height: 20,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        position: 'absolute',
        top: -5,
        right: -5,
        zIndex: 2
    }
})
