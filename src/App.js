/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-shadow */

import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Home from './screens/HomeScreen'
import Add from './screens/AddScreen'
import ViewTask from './screens/ViewScreen'

const Stack = createNativeStackNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="HomeScreen"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddScreen"
          component={Add}
          options={{ title: 'Добавьте задачу!' }}
        />
        <Stack.Screen
          name="ViewScreen"
          component={ViewTask}
          options={{ title: 'task.name' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
