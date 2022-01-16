import { Portal } from '@gorhom/portal';
import React, { useEffect, useRef } from 'react';
import { BackHandler, Image, Pressable as PressAble, ScrollView, StyleSheet, Text, TextInput, View } from "react-native"
import { EventRegister } from 'react-native-event-listeners';
import { useSharedValue } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { IMAGES } from '~/assets/images';
import { deviceH, deviceW } from '~/common/Constants';
import { changeLanguageApp, showToast } from '~/common/method/Method';
import DropDown from '~/components/dropDown/DropDown';
import LazyImage from '~/components/image/LazyImage';
import { Modal } from '~/components/modal';
import OTP from '~/components/otp/OTP';
import { SwitchSameIOS } from '~/components/switch';
import { TextNormal } from '~/components/text/TextNormal';
import { translate } from '~/translations/i18n';
import { KeyTranslate } from '~/translations/KeyTranslate';
import FlyTo from './FlyTo';


export default function ProfileScreen({ navigation }) {
    const insets = useSafeAreaInsets();

    const toastContent = useSharedValue("empty");

    const refDrop = useRef();
    const refOTP = useRef();
    const refModal = useRef();

    useEffect(() => {
        let backHandler = null;

        const unsubscribeOnFocusScreen = navigation.addListener('focus', () => {
            backHandler = BackHandler.addEventListener("hardwareBackPressProfileScreen",
                () => {
                    navigation.goBack();
                    EventRegister.emit("TAB_SELECTED", 1);
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
        <View style={[styles.main]}>
            <Portal>
                <Image
                    source={IMAGES.black_hole}
                    style={{ position: 'absolute', top: 0, right: 0, width: 100, height: 100, resizeMode: 'contain' }} />
            </Portal>
            <ScrollView style={{ flex: 1, marginBottom: 55 + insets.bottom, paddingTop: deviceH / 6 }}>

                <View style={{ marginTop: 10, paddingHorizontal: 10 }}>
                    <TextNormal>{translate(KeyTranslate.dropdown)}</TextNormal>
                    <DropDown
                        ref={refDrop}
                        data={[
                            { label: 'English', value: "en" },
                            { label: 'France', value: "fr" },
                            { label: 'Japan', value: "jp" },
                        ]}
                        onChangeItem={(e) => {
                            changeLanguageApp(e.value);
                        }}
                    />
                </View>
                <TextNormal style={{ marginTop: 30, paddingHorizontal: 10 }}>OTP</TextNormal>
                <OTP ref={refOTP} length={6} setOTPValid={() => { }} />
                <PressAble
                    style={{ alignSelf: 'center', backgroundColor: 'green', paddingHorizontal: 10, paddingVertical: 5, marginTop: 10, borderRadius: 5 }}
                    onPress={() => {
                        refOTP.current.showOtpInValid("error test 1");
                    }}>
                    <TextNormal style={{ color: 'white' }}>{translate(KeyTranslate.submit)}</TextNormal>
                </PressAble>

                <PressAble
                    style={{ alignSelf: 'center', backgroundColor: 'green', paddingHorizontal: 10, paddingVertical: 5, marginTop: 30, borderRadius: 5 }}
                    onPress={() => {
                        refModal.current.openModal()
                    }}>
                    <TextNormal style={{ color: 'white' }}>{translate(KeyTranslate.open_modal)}</TextNormal>
                </PressAble>
                <TextInput
                    onChangeText={(text) => {
                        toastContent.value = text;
                    }}
                    defaultValue='empty'
                    style={{ width: deviceW, height: 50, borderWidth: 1, marginTop: 30, color: 'black' }}
                />

                <PressAble
                    style={{ alignSelf: 'center', backgroundColor: 'green', paddingHorizontal: 10, paddingVertical: 5, marginTop: 10, borderRadius: 5 }}
                    onPress={() => {
                        showToast({
                            content: toastContent.value,
                            contentStyle: { color: 'black' },
                            backgroundColor: 'white',
                            showBtnClose: false,
                        })
                    }}>
                    <TextNormal style={{ color: 'white' }}>{translate(KeyTranslate.show_toast)}</TextNormal>
                </PressAble>
                <PressAble
                    style={{ alignSelf: 'center', backgroundColor: 'green', paddingHorizontal: 10, paddingVertical: 5, marginTop: 10, borderRadius: 5 }}
                    onPress={() => {
                        showToast({
                            content: toastContent.value,
                            contentStyle: { color: 'black' },
                            backgroundColor: 'white',
                            showBtnClose: true,
                        })
                    }}>
                    <TextNormal style={{ color: 'white' }}>{translate(KeyTranslate.show_toast_with_close_button)}</TextNormal>
                </PressAble>
                <View style={{ width: deviceW, justifyContent: 'center', alignItems: 'center',marginVertical:30 }}>
                    <SwitchSameIOS
                        onChange={(e) => { }} />
                </View>

                <FlyTo />

                {
                    Array(50).fill("0").map((e, i) => {
                        return (
                            <Text style={{ textAlign: "center", color: 'red' }} key={`asdf${i}`}>{translate(KeyTranslate.test)}</Text>
                        )
                    })
                }

            </ScrollView>
            <View style={{ position: 'absolute', top: 0, width: deviceW, height: insets.top }}>
                <LazyImage
                    source={{ uri: 'https://2.bp.blogspot.com/-B2AIu6n6kTE/XJkQCZVyogI/AAAAAAAAC74/hQbH-HbF0KsLBjAgCdzFguG6aK56KxmGACLcBGAs/s1600/nature%2Bwallpaper%2B4.jpg' }}
                    style={{ width: deviceW, height: insets.top }}
                    resizeMode={"cover"}
                />
            </View>
            <Modal
                backdropColor={"rgba(1,1,1,0.3)"}
                hasBackdrop
                ref={refModal}>
                <LazyImage
                    source={{ uri: 'https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80' }}
                    style={{ width: deviceW * 0.8, height: deviceW * 0.8 }}
                />
            </Modal>
        </View>
    )
}
const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: 'white'
    }
})