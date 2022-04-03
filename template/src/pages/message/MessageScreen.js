import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import DrawerExample from '~/components/drawerExample/DrawerExample'

export default function MessageScreen({ navigation }) {
    return (
        <DrawerExample navigation={navigation} />
    )
}
