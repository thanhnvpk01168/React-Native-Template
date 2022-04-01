/**
 * Example
const refOTP = useRef();
const [otpValid, setOTPValid] = useState({ status: false, value: "" });
<OTP ref={refOTP} length={6} setOTPValid={setOTPValid} />
refOTP.current.showOtpInValid("error test 1")
 */
import React, { forwardRef, memo, useCallback, useImperativeHandle, useMemo, useRef, useState } from 'react'
import { Pressable, StyleSheet, TextInput, View } from 'react-native'
import isEqual from 'react-fast-compare';

import { deviceW } from '~/common/Constants';
import { Text } from '../text';

const maxHeightOTP = 100;
const paddingHorizontal = 20;
const borderWidthOTP = 1;
const width = deviceW - paddingHorizontal * 2;
const SpaceBetweenTwoOTP = 10

function OTPComponent({
    length = 6,
    setOTPValid
}, ref) {
    const whOTP = useMemo(() => (width / length - SpaceBetweenTwoOTP > maxHeightOTP ? maxHeightOTP : width / length - SpaceBetweenTwoOTP), []);

    const [otp, setOtp] = useState('');
    const [otpInValid, setOtpInValid] = useState({ status: false, msg: "" });
    const [isFocused, setIsFocused] = useState(false)

    const _inputRef = useRef();

    const _setFocus = useCallback(() => {
        if (_inputRef.current) {
            _inputRef.current.focus();
        }
    }, [_inputRef]);

    const _onFocus = useCallback(() => {
        setIsFocused(true);
    }, []);

    const _onBlur = useCallback(() => {
        setIsFocused(false);
    }, []);

    const _onOtpChange = (text) => {
        setOtp(text.trim());
        if (text.trim().length >= length) {
            setOTPValid({ status: true, value: otp });
            setOtpInValid({ status: false, msg: "" });
        } else {
            setOTPValid({ status: false, value: otp });
            setOtpInValid({ status: false, msg: "" });
        }
    };

    const _showError = (msg) => {
        setOtpInValid({ status: true, msg: msg });
    }

    useImperativeHandle(ref, () => ({
        method1: () => { },
        method2: () => { },
        showOtpInValid: _showError
    }));

    return (
        <>
            <View style={[styles.main]}>
                <View
                    pointerEvents='none'
                    style={styles.input}>
                    <TextInput
                        ref={_inputRef}
                        value={otp}
                        maxLength={length}
                        keyboardType='numeric'
                        autoCapitalize={'none'}
                        autoFocus={false}
                        underlineColorAndroid={'transparent'}
                        onChangeText={_onOtpChange}
                        onFocus={_onFocus}
                        onBlur={_onBlur}
                        selectionColor={'transparent'}
                    />
                </View>
                {
                    Array(length).fill("0").map((e, i) => {
                        return (
                            <Pressable
                                onPress={_setFocus}
                                key={`otp${i}`}
                                style={[
                                    styles.otp,
                                    {
                                        width: whOTP, height: whOTP,
                                        borderColor: isFocused ? otpInValid.status ? 'red' : i < otp.length ? "green" : i === otp.length ? "blue" : "gray" : otpInValid.status ? 'red' : "gray"
                                    }
                                ]}>
                                <Text>
                                    {
                                        i <= otp.length - 1 ? otp.charAt(i) : ''
                                    }
                                </Text>
                            </Pressable>
                        )
                    })
                }

            </View>
            {
                otpInValid.status &&
                <Text style={{ color: 'red', fontSize: 20, textAlign: 'center', marginTop: 10 }}>
                    {otpInValid.msg}
                </Text>
            }
        </>
    )
}
export default OTP = memo(forwardRef(OTPComponent), isEqual);

const styles = StyleSheet.create({
    main: {
        width: deviceW,
        borderColor: 'red',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: paddingHorizontal
    },
    input: {
        position: 'absolute',
        maxWidth: 1,
        maxHeight: 1,
        minHeight:1,
        opacity: 0,
        overflow: 'hidden',
        bottom:0
    },
    otp: {
        borderWidth: borderWidthOTP,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        textAlign: 'center'
    }
})
