import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import FastImage from 'react-native-fast-image';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import Svg, { Defs, G, Line, LinearGradient, Mask, Path, Polygon, Polyline, Rect, Stop, Use, Text as TextSVG, Pattern, Ellipse } from 'react-native-svg';
import { deviceH, deviceW } from '~/common/Constants';
import { restartApp } from '~/common/method/Method';
import { KeyStorage } from '~/common/storage/KeyStorage';
import { setItemStorageMMKV } from '~/common/storage/StorageMMK';
import { TextNormal } from '~/components/text/TextNormal';
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
                    <TextNormal>
                        {`${translate(KeyTranslate.name)}`} asdf
                    </TextNormal>
                    <TouchableOpacity onPress={() => {
                        setItemStorageMMKV(KeyStorage.lngI18n, "en");
                        restartApp()
                    }}>
                        <TextNormal>Set en</TextNormal>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        setItemStorageMMKV(KeyStorage.lngI18n, "cn");
                        restartApp()
                    }}>
                        <TextNormal>Set cn</TextNormal>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        setItemStorageMMKV(KeyStorage.lngI18n, "kh");
                        restartApp()
                    }}>
                        <TextNormal>Set kh</TextNormal>
                    </TouchableOpacity>
                </View>


                {/* demo svg */}
                {/* <View style={{ borderWidth: 2, borderColor: 'green', margin: 10 }}>
                    <Svg height="100" width="100">
                        <Line
                            x1="0" y1="0"
                            x2="100" y2="100"
                            stroke="red"
                            strokeWidth="2" />
                    </Svg>
                    <Svg height="100" width="100">
                        <Polygon
                            points="0,0 100,0 100,50 50,50"
                            fill="lime"
                            stroke="purple"
                            strokeWidth="1"
                        />
                    </Svg>
                    <Svg height="50" width="50">
                        <Polyline
                            points="0,0 50,0 50,50 0,50 0,0"
                            fill="none"
                            stroke="black"
                            strokeWidth="5"
                        />
                    </Svg>
                    <Svg height="88" width="600">
                        <Path
                            d={`
                                M 18 3
                                L 46 3
                                L 46 40
                                L 61 40
                                L 32 68
                                L 3 40
                                L 18 40
                                Z
                            `}
                            fill="none"
                            stroke="orange"
                            strokeWidth="5"
                        />
                    </Svg>
                    <Svg width="500" height="500" viewBox="0 0 500 100">
                        <Defs>
                            <Pattern
                                id="TrianglePattern"
                                patternUnits="userSpaceOnUse"
                                x="0"
                                y="0"
                                width="100"
                                height="100"
                                viewBox="0 0 10 10"
                            >
                                <Path d="M 0 0 L 7 0 L 3.5 7 z" fill="red" stroke="blue" />
                            </Pattern>
                        </Defs>
                        <Rect fill="none" stroke="blue" x="1" y="1" width="798" height="398" />
                        <Ellipse
                            fill="url(#TrianglePattern)"
                            stroke="black"
                            strokeWidth="5"
                            cx="400"
                            cy="200"
                            rx="350"
                            ry="150"
                        />
                    </Svg>
                </View> */}
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

// import React, { useState, useRef } from 'react'
// import { StyleSheet, View, Text, TouchableOpacity as TouchableOpacityRN, Pressable, ScrollView, Dimensions, StatusBar, TextInput } from 'react-native'
// import { EventRegister } from 'react-native-event-listeners';
// import { gestureHandlerRootHOC, GestureHandlerRootView, PanGestureHandler, TouchableOpacity } from 'react-native-gesture-handler'
// import Animated, {
//     Easing,
//     useAnimatedGestureHandler,
//     useAnimatedStyle,
//     useSharedValue,
//     withSpring,
//     withTiming,
//     withRepeat,
// } from 'react-native-reanimated';
// import { useSafeAreaFrame, useSafeAreaInsets } from 'react-native-safe-area-context';
// import { deviceH, deviceW } from '~/common/Constants';
// import { showToast } from '~/common/method/Method';
// import DropDown from '~/components/dropDown/DropDown';
// import { Modal as ModalComponent } from '~/components/modal';
// import OTP from '~/components/otp/OTP';
// import { TextNormal } from '~/components/text/TextNormal';
// import LazyImage from '~/components/image/LazyImage';

// const AnimatedView = Animated.createAnimatedComponent(View);


// const ExampleWithHoc = gestureHandlerRootHOC(({ x, y, gestureHandle, gestureHandleStyle }) => (
//     <PanGestureHandler onGestureEvent={gestureHandle}>
//         <AnimatedView pointerEvents='auto' style={[{ width: 100, height: 100, backgroundColor: 'green' }, gestureHandleStyle]}>

//         </AnimatedView>
//     </PanGestureHandler>
//     // <TouchableOpacity
//     //     style={{ width: 100, height: 100, backgroundColor: 'red' }}
//     //     onPress={() => {
//     //         console.log(props)
//     //     }}>

//     // </TouchableOpacity>
// )
// )

// let valueGlobal1 = 1;
// let valueGlobal2 = 2;
// let valueGlobal3 = 3;
// let valueGlobal4 = 4;
// let valueGlobal5 = 5;
// let valueGlobal6 = 6;
// let totalForceUpdate = 0;

// export default MessageScreen = ({ navigation }) => {

//     const insets = useSafeAreaInsets();
//     const frame = useSafeAreaFrame();

//     const [forceUpdate, setForceUpdateState] = useState(0);

//     const setForceUpdate = () => {
//         ++totalForceUpdate;
//         setForceUpdateState(totalForceUpdate);
//     }

//     const [valueGlobalState1, setValueGlobalState1] = useState(1);
//     const [valueGlobalState2, setValueGlobalState2] = useState(1);
//     const [valueGlobalState3, setValueGlobalState3] = useState(1);
//     const [valueGlobalState4, setValueGlobalState4] = useState(1);
//     const [valueGlobalState5, setValueGlobalState5] = useState(1);
//     const [valueGlobalState6, setValueGlobalState6] = useState(1);

//     const [valueGlobalState7, setValueGlobalState7] = useState(1);
//     const [valueGlobalState8, setValueGlobalState8] = useState(1);
//     const [valueGlobalState9, setValueGlobalState9] = useState(1);
//     const [valueGlobalState10, setValueGlobalState10] = useState(1);
//     const [valueGlobalState11, setValueGlobalState11] = useState(1);
//     const [valueGlobalState12, setValueGlobalState12] = useState(1);

//     const [valueGlobalState13, setValueGlobalState13] = useState(1);
//     const [valueGlobalState14, setValueGlobalState14] = useState(1);
//     const [valueGlobalState15, setValueGlobalState15] = useState(1);
//     const [valueGlobalState16, setValueGlobalState16] = useState(1);
//     const [valueGlobalState17, setValueGlobalState17] = useState(1);
//     const [valueGlobalState18, setValueGlobalState18] = useState(1);

//     const valueGlobalAnim1 = useSharedValue(1);
//     const valueGlobalAnim2 = useSharedValue(2);
//     const valueGlobalAnim3 = useSharedValue(3);
//     const valueGlobalAnim4 = useSharedValue(4);
//     const valueGlobalAnim5 = useSharedValue(5);
//     const valueGlobalAnim6 = useSharedValue(6);
//     const valueGlobalAnim7 = useSharedValue(6);
//     const valueGlobalAnim8 = useSharedValue(6);
//     const valueGlobalAnim9 = useSharedValue(6);
//     const valueGlobalAnim10 = useSharedValue(6);
//     const valueGlobalAnim11 = useSharedValue(6);
//     const valueGlobalAnim12 = useSharedValue(6);
//     const valueGlobalAnim13 = useSharedValue(6);
//     const valueGlobalAnim14 = useSharedValue(6);
//     const valueGlobalAnim15 = useSharedValue(6);
//     const valueGlobalAnim16 = useSharedValue(6);
//     const valueGlobalAnim17 = useSharedValue(6);
//     const valueGlobalAnim18 = useSharedValue(6);
//     const valueGlobalAnim19 = useSharedValue(6);
//     const valueGlobalAnim20 = useSharedValue(6);
//     const valueGlobalAnim21 = useSharedValue(6);

//     //panGestureHandle
//     const x = useSharedValue(200 / 4);
//     const y = useSharedValue(200 / 2 - 50);
//     const gestureHandle = useAnimatedGestureHandler({
//         onStart: (_, context) => {
//             context.startX = x.value;
//             context.startY = y.value;
//             console.log("gestureHandle start ")
//         },
//         onActive: (event, context) => {
//             x.value = withSpring(context.startX + event.translationX);
//             y.value = withSpring(context.startY + event.translationY);
//         },
//         onEnd: (_) => {
//             x.value = withSpring(0);
//             y.value = withSpring(0);
//         },
//     });

//     const gestureHandleStyle = useAnimatedStyle(() => {
//         return {
//             transform: [{ translateX: x.value }, { translateY: y.value }],
//         };
//     });

//     const refDrop = useRef();
//     const refModal = useRef();

//     const refOTP = useRef();
//     const [otpValid, setOTPValid] = useState({ status: false, value: "" });

//     console.log("screen 0 : ", Dimensions.get("screen").height);
//     console.log("window 1 : ", Dimensions.get("window").height);
//     console.log("screen - window 2 : ", Dimensions.get("screen").height - Dimensions.get("window").height);

//     console.log(insets.top);



//     return (
//         <View style={{ flex: 1, backgroundColor: 'rgba(0, 255, 144,0.1)' }}>

//             <ScrollView style={{ flex: 1, marginBottom: 100 }}>
//                 <View style={{ height: insets.top }} />

//                 <TextNormal>````</TextNormal>
//                 <TextNormal>````</TextNormal>
//                 <TextNormal>````</TextNormal>
//                 <TextNormal>````</TextNormal>
//                 <TextNormal>````</TextNormal>
//                 <TextNormal>````</TextNormal>
//                 <TextNormal>````</TextNormal>
//                 <TextNormal>````</TextNormal>
//                 <TextNormal>````</TextNormal>
//                 <TextNormal>````</TextNormal>
//                 <TextNormal>````</TextNormal>
//                 <TextNormal>````</TextNormal>
//                 <TextNormal>````</TextNormal>
//                 <TextNormal>````</TextNormal>
//                 <TextNormal>````</TextNormal>
//                 <TextNormal>````</TextNormal>
//                 <TextNormal>````</TextNormal>
//                 <TextNormal>````</TextNormal>
//                 <TextNormal>````</TextNormal>
//                 <TextNormal>````</TextNormal>
//                 <TextNormal>````</TextNormal>
//                 <TextNormal>````</TextNormal>
//                 <TextNormal>````</TextNormal>
//                 <TextNormal>````</TextNormal>
//                 <TextNormal>````</TextNormal>
//                 <TextNormal>````</TextNormal>
//                 <TextNormal>````</TextNormal>
//                 <TextNormal>````</TextNormal>
//                 <TextNormal>````</TextNormal>
//                 <TextNormal>````</TextNormal>
//                 <TextNormal>````</TextNormal>
//                 <TextNormal>````</TextNormal>
//                 <TextNormal>````</TextNormal>
//                 <OTP ref={refOTP} length={6} setOTPValid={setOTPValid} />
//                 <Pressable onPress={() => {
//                     refOTP.current.showOtpInValid("error test 1");
//                 }}>
//                     <TextNormal>otp</TextNormal>
//                 </Pressable>
//                 <Pressable
//                     style={{ justifyContent: 'center', alignItems: 'center', height: 50 }}
//                     onPress={() => {
//                         refModal.current.openModal();
//                     }}>
//                     <TextNormal>````</TextNormal>
//                 </Pressable>
//                 <ModalComponent
//                     backdropColor={"rgba(1,1,1,0.3)"}
//                     hasBackdrop
//                     ref={refModal}>
//                     <View
//                         onLayout={(e) => {
//                             console.log("inset: ", insets.top + " : " + insets.bottom);
//                             console.log("status bar: ", insets.top + " : " + StatusBar.currentHeight);
//                             console.log("onLayout: ", e.nativeEvent.layout.height);
//                             // console.log("deviceH deviceH: ", deviceH);
//                             console.log("frameframe: ", frame);
//                         }}
//                         style={{
//                             width: 100,
//                             height: 100,
//                             borderWidth: 10, borderColor: 'red',
//                             backgroundColor: 'green'
//                         }} >
//                         <TextInput
//                             style={{
//                                 width: 100,
//                                 height: 100,
//                                 borderWidth: 10,
//                                 borderColor: 'blue',
//                             }}
//                         />
//                     </View>
//                 </ModalComponent>
//                 <DropDown
//                     ref={refDrop}
//                     data={[
//                         { label: 'Option1', value: 1 },
//                         { label: 'Option2', value: 2 },
//                         { label: 'Option3', value: 3 },
//                     ]}
//                 // style={{ width: 100, height: 100, borderWidth: 1 }}
//                 // styleItem={{ borderWidth: 1 }}
//                 />
//                 <TextNormal>````</TextNormal>
//                 <TextNormal>````</TextNormal>
//                 <TextNormal>````</TextNormal>
//                 <TextNormal>````</TextNormal>
//                 <TextNormal>````</TextNormal>
//                 <TextNormal>````</TextNormal>
//                 <TextNormal>````</TextNormal>
//                 <TextNormal>````</TextNormal>
//                 <TextNormal>````</TextNormal>
//                 <TextNormal>````</TextNormal>
//                 <TextNormal>````</TextNormal>
//                 <TextNormal>````</TextNormal>
//                 <TextNormal>````</TextNormal>
//                 <TextNormal>````</TextNormal>
//                 <TextNormal>````</TextNormal>
//                 <TextNormal>````</TextNormal>
//                 <TextNormal>````</TextNormal>
//                 <TextNormal>````</TextNormal>
//                 <TextNormal>````</TextNormal>
//                 <TextNormal>````</TextNormal>
//                 <TextNormal>````</TextNormal>
//                 <TextNormal>````</TextNormal>
//                 <TextNormal>````</TextNormal>
//                 <TextNormal>````</TextNormal>
//                 <TextNormal>````</TextNormal>
//                 <TextNormal>````</TextNormal>
//                 <TextNormal>````</TextNormal>
//                 <TextNormal>````</TextNormal>
//                 <TextNormal>````</TextNormal>
//                 <TextNormal>````</TextNormal>
//                 <TextNormal>````</TextNormal>
//                 <TextNormal>````</TextNormal>
//                 <TextNormal>````</TextNormal>
//                 <TextNormal>end</TextNormal>
//             </ScrollView>
//             <View style={{ width: deviceW, height: 100, backgroundColor: 'green', position: 'absolute', bottom: 0 }}>

//             </View>
//         </View>
//     )

//     return (
//         <View pointerEvents='auto' style={{ flex: 1, backgroundColor: 'white', borderColor: 'blue' }}>
//             {/* <ExampleWithHoc
//                 test={"ok"}
//                 x={x}
//                 y={y}
//                 gestureHandle={gestureHandle}
//                 gestureHandleStyle={gestureHandleStyle} /> */}
//             {/* <TouchableOpacityRN
//                 onPress={() => {
//                     EventRegister.emitEvent("show_toast", { content_e: "test vvvv", backgroundColor: 'red' })
//                 }}
//                 style={{ width: 100, height: 100, backgroundColor: 'red' }}>

//             </TouchableOpacityRN> */}
//             <TouchableOpacityRN
//                 onPress={() => {
//                     showToast({
//                         content: "test blue",
//                         contentStyle: { color: 'blue', fontSize: 15, marginTop: 100 },
//                         backgroundColor: 'white',
//                         showBtnClose: true
//                     })
//                 }}
//                 style={{ width: 100, height: 100, backgroundColor: 'rgba(255, 0, 0,0.1)' }}>

//             </TouchableOpacityRN>
//             <TouchableOpacityRN
//                 onPress={() => {
//                     showToast({
//                         content: "test green",
//                         contentStyle: { color: 'green', fontSize: 15 },
//                         backgroundColor: 'white'
//                     })
//                 }}
//                 style={{ width: 100, height: 100, backgroundColor: 'rgba(0, 255, 0,.1)' }}>

//             </TouchableOpacityRN>
//             <TouchableOpacityRN
//                 onPress={() => {
//                     showToast({
//                         content: "test green",
//                     })
//                 }}
//                 style={{ width: 100, height: 100, backgroundColor: 'rgba(140, 0, 255,.1)' }}>

//             </TouchableOpacityRN>

//         </View>
//     )
// }


