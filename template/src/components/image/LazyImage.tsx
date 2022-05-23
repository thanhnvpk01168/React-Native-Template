/**
 * Example
<LazyImage
    source={{ uri: "" }}  or source={require("")}
    style={{ width: 50, height: 50 }}
    resizeMode='cover' />
*/
import React from 'react'
import { StyleSheet, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { SvgComponent } from '~/assets/svgIcon'
import { SvgIcon } from '../svgIcon/SvgIconComponent'
import { FastImageProps } from './type'

export default function LazyImage({
    source,
    style = {},
    resizeMode = 'contain'
}: FastImageProps) {
    return (
        <View style={
            Array.isArray(style)
                ? [...style]
                : [style]
        }>
            <View
                style={[
                    StyleSheet.absoluteFillObject,
                    styles.bottomBg
                ]}>
                <SvgIcon source={SvgComponent.photo} size={35} color='#a5a5a5' />
            </View>
            <FastImage
                source={source}
                style={style}
                resizeMode={resizeMode}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    bottomBg: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})
