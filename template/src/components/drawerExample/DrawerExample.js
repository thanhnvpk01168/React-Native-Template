import { StyleSheet, View, TouchableOpacity } from 'react-native'
import React, { useMemo, useRef } from 'react'
import { DrawerLayout } from 'react-native-gesture-handler';
import LazyImage from '../image/LazyImage';
import { COLORS } from '~/common/Constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '../text';
import { showFlashMsg } from '~/common/method/Method';
import { useDispatch } from 'react-redux';
import { increment } from '~/store/store';
import { useLayoutDimensions } from '~/common/hooks';

export default function DrawerExample({ navigation }) {
    const layoutDimensions = useLayoutDimensions();
    const insets = useSafeAreaInsets();
    const refDrawer = useRef();

    const drawerWidth = useMemo(() => layoutDimensions.width * 0.7, [layoutDimensions.width])

    const dispatch = useDispatch();

    return (
        <View style={{ flex: 1 }}>
            <DrawerLayout
                ref={refDrawer}
                drawerWidth={drawerWidth}
                overlayColor={'rgba(1,1,1,0.5)'}
                drawerPosition={DrawerLayout.positions.Left}
                drawerType="front"
                drawerBackgroundColor="#ddd"
                renderNavigationView={() => {
                    return (
                        <View style={{ backgroundColor: 'red', marginTop: insets.top }}>
                            <Text>I am in the drawer!</Text>
                        </View>
                    )
                }}
            // onDrawerClose={() => { }}
            // onDrawerOpen={() => { }}
            // onDrawerSlide={(e) => { console.log("onDrawerSlide", e) }}
            >

                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ ...StyleSheet.absoluteFillObject }}>
                        <LazyImage
                            source={{ uri: "https://www.desktopbackground.org/download/480x800/2015/10/14/1026365_download-for-android-phone-backgrounds-dotted-wallpapers-from_960x800_h.jpg" }}
                            style={{ width: layoutDimensions.width, height: layoutDimensions.height }}
                            resizeMode='cover'
                        />
                    </View>
                    <TouchableOpacity onPress={() => refDrawer.current.openDrawer()}>
                        <View style={{ width: 100, height: 100, borderRadius: 50, borderWidth: 5, borderColor: 'red', backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }} >
                            <Text>Open drawer</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        navigation.goBack()
                    }}>
                        <View style={{ width: 55, height: 55, borderRadius: 50, borderWidth: 5, borderColor: 'red', backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }} >
                            <Text style={{ textAlign: 'center' }}>go back</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        showFlashMsg({
                            backgroundColor: COLORS.successBg,
                            message: "Writes your message success here, Writes your message success here, Writes your message success here",
                            textStyle: { color: COLORS.successText, textAlign: 'center' }
                        })
                    }}>
                        <View style={{ width: 55, height: 55, borderRadius: 50, borderWidth: 5, borderColor: 'red', backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }} >
                            <Text style={{ textAlign: 'center' }}>success</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        showFlashMsg({
                            backgroundColor: COLORS.errorBg,
                            message: "Writes your message error here",
                            textStyle: { color: COLORS.successText, textAlign: 'center' }
                        })
                    }}>
                        <View style={{ width: 55, height: 55, borderRadius: 50, borderWidth: 5, borderColor: 'red', backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }} >
                            <Text style={{ textAlign: 'center' }}>error</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        showFlashMsg({
                            backgroundColor: COLORS.warnBg,
                            message: "Writes your message warn here",
                            textStyle: { color: COLORS.successText, textAlign: 'center' }
                        })
                    }}>
                        <View style={{ width: 55, height: 55, borderRadius: 50, borderWidth: 5, borderColor: 'red', backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }} >
                            <Text style={{ textAlign: 'center' }}>warning</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {
                        dispatch(increment());
                    }}>
                        <View style={{ width: 55, height: 55, borderRadius: 50, borderWidth: 5, borderColor: 'red', backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }} >
                            <Text style={{ textAlign: 'center' }}>dispatch</Text>
                        </View>
                    </TouchableOpacity>

                </View>
            </DrawerLayout>
        </View>
    )
}