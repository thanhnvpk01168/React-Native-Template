import { Text as TextRN } from 'react-native'
import React from 'react'
import { TextProps } from './type';

function TextComponent({
    children,
    style = {},
    ...rest
}: TextProps) {

    return (
        <TextRN
            allowFontScaling={false}
            {...rest}
            style={
                Array.isArray(style)
                    ? [{ color: "rgb(28, 28, 30)" }, ...style]
                    : [{ color: "rgb(28, 28, 30)" }, style]
            }>

            {children}

        </TextRN>
    )
}

export const Text = TextComponent; // || memo(TextComponent, equals);