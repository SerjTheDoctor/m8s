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

const RadioButton = ({ text, checked, editable, removable, onChangeChecked, onChangeText, onRemove }: RadioButtonParamList) => {
    const [ innerText, setInnerText ] = useState(text)
    const [ innerChecked, setInnerChecked ] = useState(checked)
    const [ editing, setEditing ] = useState(false)

    if (innerText.length > 25 && !editing) {
        const ellipsed = innerText.substring(0, 22) + '...'
        setInnerText(ellipsed)
    }

    const handleChangeCheck = () => {
        onChangeChecked?.(!innerChecked)
        setInnerChecked(!innerChecked)
    }

    const handleFocus = () => {
        setInnerText(text)
        setEditing(true)
    }

    const handleBlur = () => {
        setEditing(false)
        onChangeText?.(innerText)
    }

    return (
        <View style={styles.container}>
            <View style={styles.radio}>
                <MaterialIcons.Button
                    name={innerChecked ? "radio-button-checked" : "radio-button-unchecked"}
                    backgroundColor="transparent"
                    underlayColor='transparent'
                    onPress={handleChangeCheck}
                />
                <TextInput 
                    style={styles.text} 
                    value={innerText}
                    onFocus={handleFocus}
                    onChangeText={setInnerText}
                    onBlur={handleBlur}
                />
            </View>
            {removable && (
                <FontAwesome.Button
                    name="close"
                    backgroundColor="inherit"
                    onPress={onRemove}
                />
            )}
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
        color: 'white',
        width: '70%'
    }
})

export default RadioButton