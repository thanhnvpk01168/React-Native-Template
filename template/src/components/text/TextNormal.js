import React, { memo } from 'react'
import isEqual from 'react-fast-compare';
import { Text } from 'react-native'

const TextNormalComponent = ({ children, style }) => {
    return (
        <Text style={{ color: 'black', fontSize: 15, ...style }}>
            {children}
        </Text>
    )
}
export const TextNormal = memo(TextNormalComponent, isEqual);
