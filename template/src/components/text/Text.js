import { Text as TextRN } from 'react-native'
import React from 'react'

function TextComponent(props) {

    const {
        children,
        style = {},
        ...rest
    } = props;

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