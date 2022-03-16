import React, { useEffect, useState } from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import { EventRegister } from 'react-native-event-listeners'
import { deviceH, deviceW } from '~/common/Constants'

export default function LoadingApp() {

    const [showLoading, setShowLoading] = useState(false);
    
    useEffect(() => {
        const listEventShowToast = EventRegister.addEventListener("show_loading_app", (status) => {
            setShowLoading(status);
        });
        return () => {
            EventRegister.removeEventListener(listEventShowToast);
        }
    }, []);

    return (
        showLoading ?
            <View style={styles.main}>
                <ActivityIndicator size={'large'} color={"orange"} />
            </View>
            :
            <></>
    )
}

const styles = StyleSheet.create({
    main: {
        width: deviceW,
        height: deviceH,
        position: 'absolute',
        top: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "rgba(255,255,255,0.2)",
    }
})
