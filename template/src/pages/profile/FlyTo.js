import { Portal } from '@gorhom/portal'
import React, { memo, useEffect, useState } from 'react'
import isEqual from 'react-fast-compare';
import { TouchableOpacity } from 'react-native';
import Animated, { interpolate, useAnimatedRef, useAnimatedStyle, useDerivedValue, useSharedValue, withSpring } from 'react-native-reanimated';
import { deviceW } from '~/common/Constants';
import { Text } from '~/components/text';

let whHole = 100;
const ItemComponent = ({ item, index }) => {
    const progress = useSharedValue(0);
    const outputX = [0, deviceW - (whHole - 25) - item.x];
    const outputY = [0, -item.y + (whHole / 2 - 25)];
    const translateYDerived = useDerivedValue(() => {
        return interpolate(progress.value, [0, 100], outputY, 'clamp');
    });

    const translateXDerived = useDerivedValue(() => {
        return interpolate(progress.value, [0, 100], outputX, 'clamp');
    });
    const opacity = useDerivedValue(() => {
        return interpolate(progress.value, [0, 90, 100], [1, 1, 0], 'clamp');
    });
    const animTranslateStyle = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
            transform: [
                {
                    translateY: translateYDerived.value,
                },
                {
                    translateX: translateXDerived.value,
                },
            ],
        };
    });

    useEffect(() => {
        progress.value = withSpring(100, { damping: 60 });
    }, [])
    return (
        <Portal>
            <Animated.View
                key={`CItem${index}`}
                style={[
                    { position: 'absolute', top: item.y, left: item.x, width: 50, height: 50, borderRadius: 25, backgroundColor: 'brown' },
                    animTranslateStyle
                ]}>

            </Animated.View>
        </Portal>
    )
}
const Item = memo(ItemComponent, isEqual);
export default function FlyTo() {
    const _refDrop = useAnimatedRef();
    const [arrItem, setArrItem] = useState([]);

    const _onToggle = () => {
        if (_refDrop && _refDrop.current) {
            _refDrop.current.measure((x, y, width, height, pageX, pageY) => {
                setArrItem([...arrItem, { w: width, h: height, x: pageX, y: pageY }]);
            });
        }
    }
    return (
        <Animated.View
            ref={_refDrop}
            style={{ width: 100, height: 100, justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
            <TouchableOpacity
                style={{ width: 88, height: 88, borderRadius: 50, borderWidth: 2, borderColor: 'red', justifyContent: 'center', alignItems: 'center' }}
                activeOpacity={1}
                onPress={_onToggle}>
                <Text>
                    Fire
                </Text>
            </TouchableOpacity>
            {
                arrItem.map((e, i) => {
                    return (
                        <Item key={`itemInfLy${i}`} item={e} index={i} />
                    )
                })
            }
        </Animated.View>

    )
}
