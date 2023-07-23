
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../Login';
import LoginEmail from '../LoginEmail';
import Register from '../Register';
import ResetPwd from '../../screens/ResetPwd';

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
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='LoginEmail' component={LoginEmail} />
      <Stack.Screen name='Register' component={Register} />
      <Stack.Screen name='ResetPwd' component={ResetPwd} />
    </Stack.Navigator>
  )
}

export default StackNavigator;
