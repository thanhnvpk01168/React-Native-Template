import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useRef } from 'react'
import { DrawerLayout } from 'react-native-gesture-handler';
import LazyImage from '../image/LazyImage';
import { deviceH, deviceW } from '~/common/Constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TextNormal } from '../text/TextNormal';

const drawerWidth = deviceW * 0.7;
export default function DrawerExample() {
    const insets = useSafeAreaInsets();
    const refDrawer = useRef();

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
                            style={{ width: deviceW, height: deviceH }}
                            resizeMode='cover'
                        />
                    </View>
                    <TouchableOpacity onPress={() => refDrawer.current.openDrawer()}>
                        <View style={{ width: 100, height: 100, borderRadius: 50, borderWidth: 5, borderColor: 'red', backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }} >
                            <TextNormal>Open drawer</TextNormal>
                        </View>
                    </TouchableOpacity>
                </View>
            </DrawerLayout>
        </View>
    )
}