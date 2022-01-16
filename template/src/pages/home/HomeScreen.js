import React, { useEffect } from 'react';
import { StyleSheet, View, BackHandler } from "react-native"
import { deviceH, deviceW } from '~/common/Constants';
import LazyImage from '~/components/image/LazyImage';

export default function HomeScreen({ navigation }) {
    useEffect(() => {
        let backHandler = null;

        const unsubscribeOnFocusScreen = navigation.addListener('focus', () => {
            backHandler = BackHandler.addEventListener("hardwareBackPressHomeScreen",
                () => {
                    BackHandler.exitApp();
                    return true;
                }
            );
        });
        const unsubscribeOnBlurScreen = navigation.addListener('blur', () => {
            try {
                backHandler.remove();
            } catch (error) { }
        });

        return () => {
            unsubscribeOnFocusScreen();
            unsubscribeOnBlurScreen()
            try {
                backHandler.remove();
            } catch (error) { }
        };
    }, []);

    return (
        <View style={styles.main}>
            <View style={{ ...StyleSheet.absoluteFillObject }}>
                <LazyImage
                    source={{ uri: "https://www.desktopbackground.org/download/480x800/2015/10/14/1026365_download-for-android-phone-backgrounds-dotted-wallpapers-from_960x800_h.jpg" }}
                    style={{ width: deviceW, height: deviceH }}
                    resizeMode='cover'
                />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: 'rgba(1,1,1,0.2)'
    }
})