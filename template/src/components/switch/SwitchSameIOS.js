/**
 * Example
<SwitchSameIOS onChange={(e) => { }} />
 */
import React, { memo } from 'react'
import isEqual from 'react-fast-compare';
import { Pressable } from 'react-native'
import Animated, { useSharedValue, interpolateColor, useAnimatedStyle, withSpring, useDerivedValue } from 'react-native-reanimated';

const PressAbleAnimated = Animated.createAnimatedComponent(Pressable);

const useInterpolateColor = (
    progress,
    input,
    output,
    colorSpace,
) => {
    'worklet';
    return useDerivedValue(() =>
        interpolateColor(progress.value, input, output, colorSpace),
    );
};
function SwitchSameIOSComponent({
    trackColor = ["red", "green"],
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

    const backgroundThumbColor = useInterpolateColor(
        progress,
        [0, 1],
        thumbColor
    );
    const animatedThumbStyle = useAnimatedStyle(() => ({
        backgroundColor: backgroundThumbColor.value,
        transform: [{ translateX: (progress.value) * (styleTrack.width - styleTrack.paddingHorizontal * 2 - styleThumb.width) }],
    }));

    const TrackColor = useInterpolateColor(
        progress,
        [0, 1],
        trackColor
    );
    const animatedTrackStyle = useAnimatedStyle(() => ({
        backgroundColor: TrackColor.value,
    }));

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
