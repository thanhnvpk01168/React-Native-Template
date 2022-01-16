import React, { memo } from 'react'
import isEqual from 'react-fast-compare';
import { Pressable as PressAble } from 'react-native'
import Animated, { useSharedValue, interpolateColor, useAnimatedStyle, withSpring } from 'react-native-reanimated';

const PressAbleAnimated = Animated.createAnimatedComponent(PressAble);

function SwitchSameIOSComponent({
    trackColor = ["red", "pink"],
    thumbColor = ["white", "black"],
    styleTrack = {
        width: 50,
        height: 30,
        borderRadius: 30,
        justifyContent: 'center',
        paddingHorizontal: 2
    },
    styleThumb = {
        width: 25,
        height: 25,
        borderRadius: 25,
    },
    onChange = () => { }
}) {
    const progress = useSharedValue(0);

    const animatedTrackStyle = useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(
            progress.value,
            [0, 1],
            trackColor,
        );
        return { backgroundColor }
    });

    const animatedThumbStyle = useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(
            progress.value,
            [0, 1],
            thumbColor,
        );
        return {
            backgroundColor,
            transform: [{ translateX: (progress.value) * (styleTrack.width - styleTrack.paddingHorizontal * 2 - styleThumb.width) }],
        }
    });

    const _changeStatus = () => {
        if (progress.value <= 0.5) {
            progress.value = withSpring(1, { damping: 50, stiffness: 300 });
            onChange(1);
        } else {
            progress.value = withSpring(0, { damping: 50, stiffness: 300 });
            onChange(0);
        }
    }

    return (
        <PressAbleAnimated
            onPress={_changeStatus}
            style={[styleTrack, animatedTrackStyle]}>
            <Animated.View style={[styleThumb, animatedThumbStyle]} />
        </PressAbleAnimated>
    )
}

export const SwitchSameIOS = memo(SwitchSameIOSComponent, isEqual);
