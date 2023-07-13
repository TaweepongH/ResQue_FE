
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../Login';
import LoginEmail from '../LoginEmail';
import Register from '../Register';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: {
          fontWeight: 'bold',
        }, 
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen name='Login In' component={LoginEmail} />
      <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
      <Stack.Screen name='Register' component={Register} />
    </Stack.Navigator>
  )
}

export default StackNavigator;
