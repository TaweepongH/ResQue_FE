
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../Login';
import LoginEmail from '../LoginEmail';
import Register from '../Register';
import ResetPwd from '../../screens/ResetPwd';
import TermsPolicies from '../../screens/more/TermsPolicies';
import Settings from '../../screens/Settings'
import EditProfile from '../../screens/myinfo/EditProfile';
import GoogleAuth from '../GoogleAuth';
import Feedback from '../Feedback';

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
      <Stack.Screen name='GoogleAuth' component={GoogleAuth} />
      <Stack.Screen name='Register' component={Register} />
      <Stack.Screen name='ResetPwd' component={ResetPwd} />
      <Stack.Screen name='Settings' component={Settings} />
      <Stack.Screen name='Feedback' component={Feedback} />
      <Stack.Screen name='TermsPolicies' component={TermsPolicies} />
      <Stack.Screen name='EditProfile' component={EditProfile} />

    </Stack.Navigator>
  )
}

export default StackNavigator;
