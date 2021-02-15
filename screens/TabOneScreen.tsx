import React, { useState, useRef } from 'react';
import { Button, StyleSheet, TextInput } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import { TodoItem } from '../types';
import RadioButton from '../components/RadioButton';
import { View, Text } from '../components/Themed';

const initialTodoList: TodoItem[] = [
  { id: 1, text: 'Apa plata 5L x2', checked: false },
  { id: 2, text: 'Strongbow Red berries x5', checked: true },
  { id: 3, text: 'Paine 500g', checked: true },
  { id: 4, text: 'Servetele', checked: false },
  { id: 5, text: 'Hartie igienica', checked: true },
]

const cmp = (a: TodoItem, b: TodoItem) => {
  if (!a.checked && b.checked) return -1
  if (a.checked && !b.checked) return 1

  return a.text.localeCompare(b.text)
}

const TabOneScreen = () => {
  const [ item, setItem ] = useState('')
  const [ todoList, setTodoList ] = useState<TodoItem[]>(initialTodoList)

  const handleAdd = () => {
    const noSpaces = item.replace(/ /g, '')
    if (noSpaces === '') {
      return
    }

    let maxId = 0
    if (todoList.length > 0) {
      maxId = todoList.sort((a, b) => b.id - a.id)[0].id + 1
    }
    const newItem = {
      id: maxId,
      text: item.trim(),
      checked: false,
    }
    
    const newTodoList = [
      ...todoList,
      newItem,
    ]
    
    setTodoList(newTodoList)
    setItem('')
  }

  const updateItem = (index: number, partial: any) => {
    const newTodoList = [...todoList]
    const deletedItem = newTodoList.splice(index, 1)[0] // splice returns array
    newTodoList.push({
      ...deletedItem,
      ...partial
    })
    setTodoList(newTodoList)
  }

  const removeItem = (index: number) => {
    if (index < 0 || index >= todoList.length)
      return
    
    const newTodoList = [...todoList]
    newTodoList.splice(index, 1)
    setTodoList(newTodoList)
  }

  return (
    <View style={styles.container}>
      <View style={styles.addSection}>
        <TextInput
          style={styles.addInput}
          value={item}
          onChangeText={setItem}
          onSubmitEditing={handleAdd}
          blurOnSubmit={false}
          enablesReturnKeyAutomatically
        />
        <Button
          title='Add'
          onPress={handleAdd}
        />
      </View>
      <FlatList
        style={styles.list}
        data={todoList.sort(cmp)}
        renderItem={ ({ item, index }) => (
          <RadioButton 
            text={item.text}
            checked={item.checked}
            removable={true}
            onChangeChecked={value => updateItem(index, { checked: value })}
            onChangeText={value => updateItem(index, { text: value })}
            onRemove={() => removeItem(index)}
          />
        )}
        keyExtractor={item => item.id.toString()}
      />
      <Text>
        length: {todoList.length}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  addSection: {
    display: 'flex',
    flexDirection: 'row',
  },
  addInput: {
    height: 40,
    width: '80%',
    color: 'white',
    paddingLeft: 8,
    marginRight: 10,
    borderColor: 'white',
    borderBottomWidth: 0.5,
    borderRadius: 10,
  },
  list: {
    padding: 10,
    marginTop: 20,
  }
});

export default TabOneScreen