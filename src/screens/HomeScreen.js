import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  ActivityIndicator
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import axios from 'axios'

import Task from '../components/Task'

const Home = ({ navigation }) => {
  const [task, setTask] = useState('')
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchTasks()
    })

    return unsubscribe
  }, [navigation])

  const fetchTasks = async () => {
    setLoading(true)
    try {
      const { data } = await axios.get(
        'https://stage.moezdorovie.org/api/v3/todo'
      )
      setTasks(data.tasks)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const deleteTask = async id => {
    setLoading(true)
    try {
      const { data } = await axios.delete(
        `https://stage.moezdorovie.org/api/v3/todo/${id}`
      )

      if (data.deletedTask) {
        const tasksWithoutTask = tasks.filter(
          task => task.id !== data.deletedTask.id
        )

        setTasks(tasksWithoutTask)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const toggleTask = async id => {
    setLoading(true)
    try {
      const { data } = await axios.patch(
        `https://stage.moezdorovie.org/api/v3/todo/${id}`
      )

      const func = task => {
        if (task.id === data.task.id) {
          return data.task
        }

        return task
      }
      if (data.task) {
        const tasksAfterComplete = tasks.map(func)

        setTasks(tasksAfterComplete)
      }
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
    <KeyboardAvoidingView
      style={styles.all}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
    >
      <Text style={styles.header}>Список дел</Text>

      <FlatList
        style={{ marginTop: 20 }}
        contentContainerStyle={{ flexGrow: 1 }}
        data={tasks}
        renderItem={({ item }) => (
          <Task
            key={item.id}
            task={item}
            toggleTask={toggleTask}
            deleteTask={deleteTask}
            navigation={navigation}
          />
        )}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <Icon name="plus-circle" size={180} color="#E8E8E8" />
          </View>
        )}
      />

      {/* <ScrollView
        style={{ flex: 1, paddingTop: 20 }}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
      >
        {!!tasks.length ? (
          <>
            {tasks.map(task => (
              <Task
                key={task.id}
                task={task}
                toggleTask1={toggleTask}
                deleteTask={deleteTask}
                hello="world"
              />
            ))}
          </>
        ) : (
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <Icon name="plus-circle" size={180} color="#E8E8E8"></Icon>
          </View>
        )}
      </ScrollView> */}

      <View>
        {/* <TextInput
          value={task}
          onChangeText={setTask}
          placeholder="Введите название задачи..."
          multiline
          style={[{ borderColor: task ? 'black' : 'grey' }, styles.input]}
        /> */}

        <TouchableOpacity
          onPress={() => navigation.navigate('AddScreen')}
          activeOpacity={0.5}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Добавить задачу</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  all: {
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 30,
    marginBottom: Platform.OS === 'ios' ? 30 : 0,
    flex: 1
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black'
  },

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
    height: 70,
    marginTop: 15,
    marginBottom: Platform.OS === 'ios' ? 10 : 0,
    backgroundColor: 'blue',
    borderColor: 'blue'
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    fontWeight: '500'
  },
  delete: {
    backgroundColor: 'lightgrey',
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    width: 30,
    borderRadius: 6
  },
  complete: {
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    width: 30,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'blue'
  }
})

export default Home
