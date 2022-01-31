import React from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

const Task = ({ task, toggleTask, deleteTask, navigation }) => {
  const { name, description } = JSON.parse(task.name)

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
            toggleTask(task.id)
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
          <Icon name="check" size={20} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() =>
            navigation.navigate('ViewScreen', {
              name,
              description
            })
          }
          style={{ width: '75%' }}
        >
          <Text
            style={{
              marginLeft: 16,
              marginTop: 3,
              width: '100%',
              fontSize: 16,
              textDecorationLine: task.isCompleted ? 'line-through' : 'none'
            }}
          >
            {name}
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() => {
          deleteTask(task.id)
        }}
        style={styles.delete}
        activeOpacity={0.5}
      >
        <Icon name="close" size={20} color="white" />
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
