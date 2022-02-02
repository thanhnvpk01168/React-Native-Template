import React, { memo, useCallback, useState } from 'react'
import { Pressable, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import isEqual from 'react-fast-compare'
import Animated, { useAnimatedRef } from 'react-native-reanimated';
import { Portal } from '@gorhom/portal';

import { TextNormal } from '../text/TextNormal';
import { translate } from '~/translations/i18n';
import { KeyTranslate } from '~/translations/KeyTranslate';

function DropDownComponent({
    placeHolder = translate(KeyTranslate.select_an_item),
    data = [],
    style = { width: '100%', padding: 5, borderWidth: 0.3, borderColor: 'rgba(1,1,1,0.3)', backgroundColor: 'white' },
    styleDropDown = { backgroundColor: 'white', borderWidth: 0.5 },
    styleItem = { paddingHorizontal: 5, paddingTop: 4, backgroundColor: 'white' },
    textStyleItem = {},
    onChangeItem = () => { }
}, ref) {

    const _refDrop = useAnimatedRef();
    const [selectedValue, setSelectedValue] = useState(null);
    const [dropHeight, setDropHeight] = useState(0);
    const [detailDrop, setDetailDrop] = useState({ status: false, x: 0, y: 0, width: 0, height: 0, pageX: 0, pageY: 0 });

    const _onToggle = useCallback(() => {
        if (_refDrop && _refDrop.current) {
            _refDrop.current.measure((x, y, width, height, pageX, pageY) => {
                setDetailDrop({ status: true, x, y, width, height, pageX, pageY })
            });
        }
    }, [_refDrop]);

    const _onLayoutDrop = useCallback((e) => {
        const { height: DropH } = e.nativeEvent.layout;
        setDropHeight(DropH);
    }, []);

    return (
        <Animated.View onLayout={_onLayoutDrop} ref={_refDrop}>
            <View style={[style]}>
                <Pressable onPress={_onToggle}>
                    <TextNormal style={!!!selectedValue && { color: "gray" }}>{!!selectedValue ? selectedValue.value : placeHolder}</TextNormal>
                </Pressable>
                <Portal>
                    {
                        detailDrop.status &&
                        <TouchableWithoutFeedback onPress={() => setDetailDrop({ ...detailDrop, status: false })}>
                            <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
                                <TouchableWithoutFeedback>
                                    <View style={{
                                        width: detailDrop.width,
                                        borderWidth: 0.4,
                                        borderColor: 'gray',
                                        backgroundColor: 'white',
                                        paddingBottom: 4,
                                        transform: [
                                            { translateX: detailDrop.pageX },
                                            { translateY: detailDrop.pageY + dropHeight },
                                        ]
                                    }}>
                                        {
                                            data.map((e, i) => {
                                                return (
                                                    <TouchableOpacity
                                                        style={styleItem}
                                                        key={`ItemDropDown${i}`}
                                                        onPress={() => {
                                                            onChangeItem(e);
                                                            setSelectedValue(e);
                                                        }}>
                                                        <TextNormal style={textStyleItem}>
                                                            {e.label}
                                                        </TextNormal>
                                                    </TouchableOpacity>
                                                )
                                            })
                                        }
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        </TouchableWithoutFeedback>
                    }
                </Portal>
            </View>
        </Animated.View>
    )
}

export default DropDown = memo(DropDownComponent, isEqual)