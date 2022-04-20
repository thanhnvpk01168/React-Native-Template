import { Portal } from '@gorhom/portal';
import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { BackHandler, Image, Pressable as PressAble, ScrollView, StyleSheet, TextInput, View, TouchableOpacity } from "react-native"
import { EventRegister } from 'react-native-event-listeners';
import { useSharedValue } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { IMAGES } from '~/assets/images';
import { deviceH, deviceW } from '~/common/Constants';
import { useSelector } from '~/common/hooks';
import { changeLanguageApp, showToast } from '~/common/method/Method';
import { ActionSheet } from '~/components/actionSheet';
import DropDown from '~/components/dropDown/DropDown';
import LazyImage from '~/components/image/LazyImage';
import { Modal } from '~/components/modal';
import OTP from '~/components/otp/OTP';
import ReadMore from '~/components/readMore/ReadMore';
import { SwipeItem } from '~/components/swipe';
import { SwitchSameIOS } from '~/components/switch';
import { Text } from '~/components/text';
import { translate } from '~/translations/i18n';
import { KeyTranslate } from '~/translations/KeyTranslate';
import FlyTo from './FlyTo';


export default function ProfileScreen({ navigation }) {
    const insets = useSafeAreaInsets();
    const { i18n } = useTranslation();

    const reduxStore = useSelector(state => state);

    const toastContent = useSharedValue("empty");

    const refDrop = useRef();
    const refOTP = useRef();
    const refModal = useRef();
    const refActionSheet = useRef();

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
                    style={{ position: 'absolute', top: 0, right: 0, width: 100, height: 100, resizeMode: 'contain', opacity: 0.1 }} />
            </Portal>
            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, paddingTop: insets.top }}>

                <View style={{ marginTop: 10, paddingHorizontal: 10 }}>
                    <Text>{translate(KeyTranslate.dropdown)}</Text>
                    <DropDown
                        // ref={refDrop}
                        data={[
                            { label: 'English', value: "en" },
                            { label: 'France', value: "fr" },
                            { label: 'Japan', value: "jp" },
                        ]}
                        onChangeItem={(e) => {
                            changeLanguageApp(e.value);
                            i18n.changeLanguage(e.value);
                        }}
                    />
                </View>
                <Text style={{ marginTop: 30, paddingHorizontal: 10 }}>OTP</Text>
                <OTP ref={refOTP} length={6} setOTPValid={() => { }} />
                <PressAble
                    style={{ alignSelf: 'center', backgroundColor: 'green', paddingHorizontal: 10, paddingVertical: 5, marginTop: 10, borderRadius: 5 }}
                    onPress={() => {
                        refOTP.current.showOtpInValid("error test 1");
                    }}>
                    <Text style={{ color: 'white' }}>{translate(KeyTranslate.submit)}</Text>
                </PressAble>

                <PressAble
                    style={{ alignSelf: 'center', backgroundColor: 'green', paddingHorizontal: 10, paddingVertical: 5, marginTop: 30, borderRadius: 5 }}
                    onPress={() => {
                        refModal.current.openModal()
                    }}>
                    <Text style={{ color: 'white' }}>{translate(KeyTranslate.open_modal)}</Text>
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
                    <Text style={{ color: 'white' }}>{translate(KeyTranslate.show_toast)}</Text>
                </PressAble>
                <PressAble
                    style={{ alignSelf: 'center', backgroundColor: 'green', paddingHorizontal: 10, paddingVertical: 5, marginTop: 10, borderRadius: 5 }}
                    onPress={() => {
                        refActionSheet.current.open();
                    }}>
                    <Text style={{ color: 'white' }}>Open action sheet</Text>
                </PressAble>
                <PressAble
                    style={{ alignSelf: 'center', backgroundColor: 'green', paddingHorizontal: 10, paddingVertical: 5, marginTop: 10, borderRadius: 5 }}
                    onPress={() => {
                        navigation.navigate("MessageScreen")
                    }}>
                    <Text style={{ color: 'white' }}>test navigate</Text>
                </PressAble>
                <Text>{JSON.stringify(reduxStore)}</Text>
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
                    <Text style={{ color: 'white' }}>{translate(KeyTranslate.show_toast_with_close_button)}</Text>
                </PressAble>
                <View style={{ width: deviceW, justifyContent: 'center', alignItems: 'center', marginVertical: 30 }}>
                    <SwitchSameIOS
                        onChange={(e) => { }} />
                </View>

                <FlyTo />

                <View style={{ borderWidth: 50 }}>
                    <ReadMore numberOfLine={5}>
                        Due to breaking changes in react-native, the version given in the left column (and higher versions) of react-native-svg only supports the react-native version in the right column (and higher versions, if possible).

                        It is recommended to use the version of react given in the peer dependencies of the react-native version you are using.

                        The latest version of react-native-svg should always work in a clean react-native project.
                    </ReadMore>
                </View>
                <ActionSheet ref={refActionSheet}>
                    <View style={{ width: '100%', backgroundColor: 'orange', paddingBottom: insets.bottom, alignSelf: 'center' }}>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => {
                                // refActionSheet.current?.close();
                            }}>
                            <Text>action sheet</Text>
                            <Text>action sheet</Text>
                            <Text>action sheet</Text>
                        </TouchableOpacity>
                    </View>
                </ActionSheet>

                <View style={{ backgroundColor: 'red', width: deviceW - 10, height: 100, justifyContent: "center", alignItems: 'center', alignSelf: 'center', marginBottom: 300 }}>
                    <SwipeItem
                        buttonRight={
                            <TouchableOpacity style={{ width: 250, height: 100, borderWidth: 1, position: 'absolute', right: 0 }}>
                                <Text>buttonRight</Text>
                            </TouchableOpacity>
                        }
                        maxWidthButtonRight={250}
                        styleItem={{
                            width: deviceW - 10,
                            backgroundColor: 'orange',
                            height: 100,
                        }}
                    >
                        <Text>Item 1</Text>
                    </SwipeItem>
                </View>

                {
                    Array(50).fill("0").map((e, i) => {
                        return (
                            <Text style={{ textAlign: "center", color: 'red' }} key={`asdf${i}`}>{translate(KeyTranslate.test)}</Text>
                        )
                    })
                }

            </ScrollView>
            {/* <View style={{ position: 'absolute', top: 0, width: deviceW, height: insets.top }}>
                <LazyImage
                    source={{ uri: 'https://2.bp.blogspot.com/-B2AIu6n6kTE/XJkQCZVyogI/AAAAAAAAC74/hQbH-HbF0KsLBjAgCdzFguG6aK56KxmGACLcBGAs/s1600/nature%2Bwallpaper%2B4.jpg' }}
                    style={{ width: deviceW, height: insets.top }}
                    resizeMode={"cover"}
                />
            </View> */}
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