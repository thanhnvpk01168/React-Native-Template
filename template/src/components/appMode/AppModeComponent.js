import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { AppMode } from '~/common/ConfigApp'

export default function AppModeComponent() {
    return (
        <View pointerEvents={'none'} style={[styles.wrapMode]}>
            <Text adjustsFontSizeToFit={true} style={[styles.textAppMode]}>
                {AppMode.toUpperCase()} MODE
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapMode: {
        position: 'absolute',
        right: -20,
        top: 0,
        zIndex: 999,
        width: 150,
        backgroundColor: '#bc9372',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        transform: [{ rotate: '45deg' }, { translateX: 30 }],
    },
    textAppMode: {
        fontWeight: 'bold',
        color: '#FFFFFF',
        fontSize: 11,
        textAlign: 'center',
    }
})
