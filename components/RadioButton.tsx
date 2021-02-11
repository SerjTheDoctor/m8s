import React, { useState } from 'react'

import { Button, StyleSheet, TextInput } from 'react-native';
import { View, Text } from './Themed'
import { FontAwesome, MaterialIcons } from '@expo/vector-icons'

type RadioButtonParamList = {
    text: string;
    checked?: boolean;
    editable?: boolean;
    removable?: boolean;
    onChangeChecked?: (value: boolean) => void;
    onChangeText?: (text: string) => void;
    onRemove?: () => void;
}

const RadioButton = ({ text, checked, onChangeChecked, onRemove }: RadioButtonParamList) => {
    const [ innerChecked, setInnerChecked ] = useState(checked)
    let ellipsed = ''
    
    if (text.length > 25) {
        text = text.substring(0, 22)
        ellipsed = '...'
    }

    const handleChangeCheck = () => {
        onChangeChecked?.(!innerChecked)
        setInnerChecked(!innerChecked)
    }

    return (
        <View style={styles.container}>
            <View style={styles.radio}>
                <MaterialIcons.Button
                    name={innerChecked ? "radio-button-checked" : "radio-button-unchecked"}
                    backgroundColor="inherit"
                    onPress={handleChangeCheck}
                />
                <Text style={styles.text}>
                    {text}{ellipsed}
                </Text>
            </View>
            <FontAwesome.Button
                name="close"
                backgroundColor="inherit"
                onPress={onRemove}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 8,
    },
    radio: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        fontSize: 15,
    }
})

export default RadioButton