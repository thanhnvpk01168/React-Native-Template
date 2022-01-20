/**
 * Example
const refActionSheet = useRef();
<ActionSheet ref={refActionSheet}>
    <View style={{ width: '100%', backgroundColor: 'orange', paddingBottom: insets.bottom,alignSelf:'center' }}>
        <TouchableOpacity onPress={() => {
            refActionSheet.current?.close();
        }}>
            <TextNormal>test</TextNormal>
        </TouchableOpacity>
    </View>
</ActionSheet>
*/
import React, { forwardRef, memo, useCallback, useImperativeHandle, useState } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { Portal } from '@gorhom/portal';
import { deviceH, deviceW } from '~/common/Constants';
import Animated, { interpolate, useAnimatedStyle, useDerivedValue, useSharedValue, withSpring } from 'react-native-reanimated';
import isEqual from 'react-fast-compare';

const inputTranslateY = [0, 90];
const inputBackgroundColor = [10, 90];
const inputTranslateX = [90, 100];

function ActionSheetComponent({ children }, ref) {
    const progress = useSharedValue(100);
    const [onLayout, setOnLayout] = useState({ height: 0, width: 0, x: 0, y: 0 });

    const translateYDerived = useDerivedValue(() => {
        return interpolate(progress.value, inputTranslateY, [0, onLayout.height], 'clamp');
    }, [onLayout.height]);

    const backgroundColorDerived = useDerivedValue(() => {
        return interpolate(progress.value, inputBackgroundColor, [0.5, 0], 'clamp');
    });

    const translateXDerived = useDerivedValue(() => {
        return interpolate(progress.value, inputTranslateX, [0, deviceW], 'clamp');
    });

    const animTranslateYStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: translateYDerived.value,
                },
            ],
        };
    });
    const animOpacityStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: `rgba(1,1,1,${backgroundColorDerived.value})`,
            transform: [
                { translateX: translateXDerived.value }
            ]
        };
    });

    const _open = useCallback(() => {
        progress.value = withSpring(0, { damping: 60, stiffness: 300 });
    }, []);
    const _close = useCallback(() => {
        progress.value = withSpring(100, { damping: 60, stiffness: 300 });
    }, []);

    useImperativeHandle(ref, () => ({
        open: _open,
        close: _close
    }))

    return (
        <Portal>
            <TouchableWithoutFeedback onPress={_close}>
                <Animated.View style={[
                    { width: deviceW, height: deviceH, backgroundColor: 'red', position: 'absolute', justifyContent: 'flex-end' },
                    animOpacityStyle
                ]}>
                    <TouchableWithoutFeedback
                        onLayout={(e) => {
                            const { height, width, x, y } = e.nativeEvent.layout;
                            setOnLayout({ height, width, x, y });
                            _close()
                        }}>
                        <Animated.View style={animTranslateYStyle}>
                            {children}
                        </Animated.View>
                    </TouchableWithoutFeedback>
                </Animated.View>
            </TouchableWithoutFeedback>
        </Portal>
    );
}
export const ActionSheet = memo(forwardRef(ActionSheetComponent), isEqual);