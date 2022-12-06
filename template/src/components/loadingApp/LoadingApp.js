import React, { useEffect, useState } from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import { EventRegister } from 'react-native-event-listeners'
import { useLayoutDimensions } from '~/common/hooks';

export default function LoadingApp() {
    const layoutDimensions = useLayoutDimensions();
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
            <View style={[styles.main, { width: layoutDimensions.width, height: layoutDimensions.height }]}>
                <ActivityIndicator size={'large'} color={"orange"} />
            </View>
            :
            <></>
    )
}

const styles = StyleSheet.create({
    main: {
        position: 'absolute',
        top: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "rgba(255,255,255,0.2)"
    }
})
