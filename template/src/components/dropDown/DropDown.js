import React, { forwardRef, memo, useCallback, useImperativeHandle, useRef, useState, useEffect } from 'react'
import { Pressable, View } from 'react-native'
import isEqual from 'react-fast-compare'
import { measure, runOnJS, runOnUI, useAnimatedRef } from 'react-native-reanimated';

import { TextNormal } from '../text/TextNormal';
import { Modal } from '../modal';
import { translate } from '~/translations/i18n';
import { KeyTranslate } from '~/translations/KeyTranslate';

const setLayoutOnUI = (
    ref,
    updateFunc,
) => {
    'worklet';
    const { width, height, pageX, pageY } = measure(ref);
    runOnJS(updateFunc)({ w: width, h: height, x: pageX, y: pageY, s: 1 });
};

function DropDownComponent({
    placeHolder = translate(KeyTranslate.select_an_item),
    data = [],
    style = { width: '80%', padding: 5, borderWidth: 0.3, borderColor: 'rgba(1,1,1,0.3)', backgroundColor: 'white' },
    styleDropDown = { backgroundColor: 'white', borderWidth: 0.5 },
    styleItem = { paddingHorizontal: 5, paddingTop: 2, backgroundColor: 'white' },
    textStyleItem = {},
    onChangeItem = () => { }
}, ref) {

    const _refDrop = useAnimatedRef();
    const refModal = useRef();
    const [viewLayout, setViewLayout] = useState({ h: 0, w: 0, x: 0, y: 0, s: null });
    const [selectedValue, setSelectedValue] = useState(null);
    const [dropHeight, setDropHeight] = useState(0);

    const _onToggle = useCallback(() => {
        runOnUI(setLayoutOnUI)(_refDrop, setViewLayout);
    }, [_refDrop, refModal]);

    const _onLayoutDrop = useCallback((e) => {
        const { height: DropH } = e.nativeEvent.layout;
        setDropHeight(DropH);
    }, []);

    useImperativeHandle(ref, () => ({
        method1: () => { },
    }));

    useEffect(() => {
        if (!!refModal?.current && !!viewLayout.s) {
            setTimeout(() => {
                refModal.current.openModal();
            }, 50);
        }
    }, [viewLayout]);

    return (
        <View onLayout={_onLayoutDrop} ref={_refDrop} style={[style]}>
            <Pressable onPress={_onToggle}>
                <TextNormal style={!!!selectedValue && { color: "gray" }}>{!!selectedValue ? selectedValue.value : placeHolder}</TextNormal>
            </Pressable>

            <Modal
                backdropColor={"rgba(55,55,55,0)"}
                hasBackdrop
                center={false}
                enableAnimation={false}
                ref={refModal}>
                <View
                    key={viewLayout}
                    style={[
                        styleDropDown,
                        {
                            width: viewLayout.w,
                            transform: [
                                { translateY: viewLayout.y + dropHeight },
                                { translateX: viewLayout.x }
                            ],
                        }
                    ]}>
                    {
                        data.map((e, i) => {
                            return (
                                <Pressable
                                    style={styleItem}
                                    key={`ItemDropDown${i}`}
                                    onPress={() => {
                                        onChangeItem(e);
                                        setSelectedValue(e);
                                    }}>
                                    <TextNormal style={textStyleItem}>
                                        {e.label}
                                    </TextNormal>
                                </Pressable>
                            )
                        })
                    }
                </View>
            </Modal>
        </View>
    )
}

export default DropDown = memo(forwardRef(DropDownComponent), isEqual)