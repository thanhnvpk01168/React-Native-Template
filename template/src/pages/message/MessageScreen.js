import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native"
import FastImage from 'react-native-fast-image';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import Svg, { Defs, G, Line, LinearGradient, Mask, Path, Polygon, Polyline, Rect, Stop, Use, Text as TextSVG, Pattern, Ellipse } from 'react-native-svg';
import { deviceH, deviceW } from '~/common/Constants';
import { restartApp } from '~/common/method/Method';
import { KeyStorage } from '~/common/storage/KeyStorage';
import { setItemStorageMMKV } from '~/common/storage/StorageMMK';
import { Text } from '~/components/text';
import { translate } from '~/translations/i18n';
import { KeyTranslate } from '~/translations/KeyTranslate';

export default function MessageScreen({ navigation }) {
    const heightValue = useSharedValue(1);
    const heightStyle = useAnimatedStyle(() => {
        return {
            opacity: heightValue.value
        }
    })
    return (
        <View style={styles.main}>
            <View style={{ ...StyleSheet.absoluteFillObject }}>
                <FastImage
                    source={{ uri: "https://www.desktopbackground.org/download/480x800/2015/10/14/1026365_download-for-android-phone-backgrounds-dotted-wallpapers-from_960x800_h.jpg" }}
                    style={{ width: deviceW, height: deviceH }}
                    resizeMode='cover'
                />
            </View>
            <ScrollView>
                <View style={{ borderWidth: 2 }}>
                    <TouchableOpacity
                        style={{ width: 100, height: 100, backgroundColor: 'rgba(32,234,44,0.1)' }}
                        onPress={() => {
                            // heightValue.value= withSpring(1)
                            navigation.navigate("HomeScreen")
                        }}>

                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ width: 100, height: 100, backgroundColor: 'rgba(66,8,99,0.2)' }}
                        onPress={() => {
                            heightValue.value = withSpring(0)
                        }}>

                    </TouchableOpacity>
                    <Animated.View style={[{ width: 100, height: 100, backgroundColor: 'pink' }, heightStyle]}>

                    </Animated.View>
                    <Text>
                        {`${translate(KeyTranslate.name)}`} asdf
                    </Text>
                    <TouchableOpacity onPress={() => {
                        setItemStorageMMKV(KeyStorage.lngI18n, "en");
                        restartApp()
                    }}>
                        <Text>Set en</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        setItemStorageMMKV(KeyStorage.lngI18n, "cn");
                        restartApp()
                    }}>
                        <Text>Set cn</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        setItemStorageMMKV(KeyStorage.lngI18n, "kh");
                        restartApp()
                    }}>
                        <Text>Set kh</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: 'rgba(1,1,1,0.5)'
    }
})