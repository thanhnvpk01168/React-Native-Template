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
import { StyleSheet, Pressable } from 'react-native';
import isEqual from 'react-fast-compare';
import { Portal } from '@gorhom/portal';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { deviceH } from '~/common/Constants';


const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

let maxHeight = deviceH + 50;
function ModalComponent({
    children,
    center = true,
    backdropColor = "rgba(1,1,1,0.3)",
    hasBackdrop = true,
    enableAnimation = true
}, ref) {
    const animTranslateYValue = useSharedValue(maxHeight);
    const animTranslateYStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateY: animTranslateYValue.value }
            ]
        }
    })

    const _closeModal = useCallback(() => {
        if (enableAnimation) {
            animTranslateYValue.value = withSpring(maxHeight, { damping: 50, stiffness: 300 })
        } else {
            animTranslateYValue.value = maxHeight;
        }
    }, []);
    
    const _openModal = useCallback(() => {
        if (enableAnimation) {
            animTranslateYValue.value = withSpring(0, { damping: 50, stiffness: 600 })
        } else {
            animTranslateYValue.value = 0;
        }
    }, []);

    useImperativeHandle(ref, () => ({
        closeModal: _closeModal,
        openModal: _openModal
    }))

    return (
        <Portal>
            <AnimatedPressable
                disabled={!hasBackdrop}
                onPress={_closeModal}
                style={[
                    styles.main,
                    center ? styles.center : {},
                    {
                        backgroundColor: backdropColor
                    },
                    animTranslateYStyle
                ]}>
                <Pressable>
                    {children}
                </Pressable>
            </AnimatedPressable>
        </Portal>
    )
}

export const Modal = memo(forwardRef(ModalComponent), isEqual);
// export default Modal1 = forwardRef(ModalComponent);

const styles = StyleSheet.create({
    main: {
        ...StyleSheet.absoluteFillObject
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});

