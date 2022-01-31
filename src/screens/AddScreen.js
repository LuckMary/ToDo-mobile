import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  StyleSheet
} from 'react-native'
import axios from 'axios'

const Add = ({ navigation }) => {
  const [task, setTask] = useState('')
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(false)
  const [description, setDescription] = useState('')

  const addTask = async () => {
    setLoading(true)
    try {
      const { data } = await axios.post(
        'https://stage.moezdorovie.org/api/v3/todo',
        {
          name: JSON.stringify({
            name: task,
            description
          })
        }
      )
      setTasks([...tasks, data.task])
      setTask('')
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }
  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <ActivityIndicator />
      </View>
    )
  }
  return (
    <View style={{ flex: 1, padding: 20, paddingTop: 10 }}>
      <TextInput
        value={task}
        onChangeText={setTask}
        placeholder="Введите заголовок задачи..."
        style={[{ borderColor: task ? 'black' : 'grey' }, styles.input]}
      />
      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="Введите описание задачи..."
        multiline
        style={[
          {
            borderColor: task ? 'black' : 'grey',
            minHeight: 80,
            paddingBottom: 45
          },
          styles.input
        ]}
      />

      <TouchableOpacity
        onPress={() => {
          addTask()
          navigation.goBack()
        }}
        activeOpacity={0.5}
        disabled={!task}
        style={[
          {
            backgroundColor: task ? 'blue' : 'lightgrey',
            borderColor: task ? 'blue' : 'grey'
          },
          styles.button
        ]}
      >
        <Text style={styles.buttonText}>Добавить задачу</Text>
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    paddingStart: 12,
    paddingEnd: 12,
    maxHeight: 100,
    marginTop: 15
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    height: 50,
    marginTop: 15,
    marginBottom: Platform.OS === 'ios' ? 10 : 0
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: '500'
  }
})
export default Add
