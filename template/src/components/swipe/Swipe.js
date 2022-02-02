/**
 * Example
const width = deviceW - 10;
<View style={{ backgroundColor: 'red', width: width, height: 100, justifyContent: "center", alignItems: 'center', alignSelf: 'center' }}>
    <SwipeItem
        buttonRight={
            <View style={{ width: 250, height: 100, borderWidth: 1, position: 'absolute', right: 0 }}>
                <TextNormal>buttonRight</TextNormal>
            </View>
        }
        maxWidthButtonRight={250}
        styleItem={{
            width: width,
            backgroundColor: 'orange',
            height: 100,
        }}
    >
        <TextNormal>Item 1</TextNormal>
    </SwipeItem>
</View>
 */
import { TouchableOpacity, View } from 'react-native';
import React from 'react';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';

import { deviceW } from '~/common/Constants';
import { TextNormal } from '../text/TextNormal';

export function SwipeItem({
    styleItem = {
        width: deviceW,
        height: 50,
        backgroundColor: 'orange',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonRight = (
        <View style={[{ position: 'absolute', width: 100, height: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: 'green', right: 0 }]}>
            <TouchableOpacity onPress={() => {
                alert("Delete");
            }}>
                <TextNormal>Delete</TextNormal>
            </TouchableOpacity>
        </View>
    ),
    maxWidthButtonRight = 100,
    children
}) {
    const x = useSharedValue(0);
    const gestureHandler = useAnimatedGestureHandler({
        onStart: (_, ctx) => {
            ctx.startX = x.value;
        },
        onActive: (event, ctx) => {
            if (ctx.startX + event.translationX <= 0 && ctx.startX + event.translationX >= -maxWidthButtonRight) {
                x.value = ctx.startX + event.translationX;
            }
        },
        onEnd: (evt) => {
            if (evt.velocityX / 2 + x.value > -50) {
                x.value = withSpring(0, { damping: 60, stiffness: 300 })
            } else {
                x.value = withSpring(-maxWidthButtonRight, { damping: 60, stiffness: 300 })
            }
        },
    });
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: x.value }
            ],
        };
    });
    return (
        <>
            {buttonRight}
            <PanGestureHandler
                activeOffsetX={[-20, 20]}
                onGestureEvent={gestureHandler}>
                <Animated.View style={[
                    styleItem,
                    animatedStyle
                ]}>
                    {children}
                </Animated.View>
            </PanGestureHandler>

        </>
    );
}
