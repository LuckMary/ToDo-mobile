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

const ViewTask = ({ route, navigation }) => {
  const { name, description } = route.params

  return (
    <View style={styles.all}>
      <Text style={styles.text}>Задача {name}</Text>
      <Text style={styles.text}>Описание задачи: {description}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: 'black'
  },
  all: {
    padding: 20,

    flex: 1
  }
})

export default ViewTask
