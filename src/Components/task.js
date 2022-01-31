import React from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

const Task = ({ task, toggleTask1, deleteTask }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12
      }}
    >
      <View
        style={{
          flexDirection: 'row'
        }}
      >
        <TouchableOpacity
          onPress={() => {
            toggleTask1(task.id)
          }}
          style={[
            styles.complete,
            {
              borderColor: task.isCompleted ? 'blue' : 'lightgrey',
              backgroundColor: task.isCompleted ? 'blue' : 'white'
            }
          ]}
          activeOpacity={0.5}
        >
          <Icon name="check" size={20} color="white"></Icon>
        </TouchableOpacity>
        <Text
          style={{
            marginLeft: 16,
            marginTop: 3,
            width: '75%',
            fontSize: 16,
            textDecorationLine: task.isCompleted ? 'line-through' : 'none'
          }}
        >
          {task.name}
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => {
          deleteTask(task.id)
        }}
        style={styles.delete}
        activeOpacity={0.5}
      >
        <Icon name="close" size={20} color="white"></Icon>
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
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
export default Task
