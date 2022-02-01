/**
 * Example
<Modal
    backdropColor={"rgba(255,1,1,0.3)"}
    hasBackdrop
    ref={refModal}>
        //your components
</Modal>

refModal.current.methodName();(methodName in useImperativeHandle)
*/
import React, { forwardRef, memo, useImperativeHandle, useCallback } from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import isEqual from 'react-fast-compare';
import { Portal } from '@gorhom/portal';
import Animated, { interpolate, useAnimatedStyle, useDerivedValue, useSharedValue, withSpring } from 'react-native-reanimated';
import { deviceH, deviceW } from '~/common/Constants';

let maxHeight = deviceH;

const inputTranslateY = [0, 90];
const outputTranslateY = [0, maxHeight];

const inputOpacity = [0, 90];
const outputOpacity = [0.6, 0];

const inputTranslateX = [0, 90, 100];
const outputTranslateX = [0, 0, deviceW];

function ModalComponent({
    children,
    center = true,
    backdropColor = "rgba(1,1,1,0.3)",
    hasBackdrop = true,
}, ref) {
    const progress = useSharedValue(1000);
    //translate Y
    const translateYDerived = useDerivedValue(() => {
        return interpolate(progress.value, inputTranslateY, outputTranslateY, 'clamp');
    }, []);
    const animTranslateYStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateY: translateYDerived.value }
            ]
        }
    });
    //translate X  & opacity backdrop
    const opacityDerived = useDerivedValue(() => {
        return interpolate(progress.value, inputOpacity, outputOpacity, 'clamp');
    }, []);
    const translateXDerived = useDerivedValue(() => {
        return interpolate(progress.value, inputTranslateX, outputTranslateX, 'clamp');
    }, []);
    const animOpacityStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: `rgba(1,1,1,${opacityDerived.value})`,
            transform: [
                { translateX: translateXDerived.value }
            ]
        }
    });

    const _closeModal = useCallback(() => {
        progress.value = withSpring(100, { damping: 50, stiffness: 300 })
    }, []);

    const _openModal = useCallback(() => {
        progress.value = withSpring(0, { damping: 50, stiffness: 600 })
    }, []);

    useImperativeHandle(ref, () => ({
        closeModal: _closeModal,
        openModal: _openModal
    }))

    return (
        <Portal>
            <TouchableWithoutFeedback
                disabled={!hasBackdrop}
                onPress={_closeModal}>
                <Animated.View
                    style={[
                        styles.main,
                        center ? styles.center : {},
                        animOpacityStyle,
                    ]}>
                    <TouchableWithoutFeedback>
                        <Animated.View style={animTranslateYStyle}>
                            {children}
                        </Animated.View>
                    </TouchableWithoutFeedback>
                </Animated.View>

            </TouchableWithoutFeedback>
        </Portal>
    )
}

export const Modal = memo(forwardRef(ModalComponent), isEqual);

const styles = StyleSheet.create({
    main: {
        ...StyleSheet.absoluteFillObject
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});
