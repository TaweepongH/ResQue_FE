
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../Login';
import LoginEmail from '../LoginEmail';
import Register from '../Register';
import ResetPwd from '../../screens/ResetPwd';
import OtpVerify from '../../screens/OtpVerify';
import CreateNewPwd from '../../screens/CreateNewPwd';
import PwdResetComplete from '../../screens/PwdResetComplete';
import EditProfile from '../../screens/myinfo/EditProfile';
import GoogleAuth from '../GoogleAuth';
import RestaurantInfo from '../RestaurantInfo';
import QueueConfirm from '../../screens/QueueConfirm';

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
      <Stack.Screen name='OtpVerify' component={OtpVerify} />
      <Stack.Screen name='CreateNewPwd' component={CreateNewPwd} />
      <Stack.Screen name='PwdResetComplete' component={PwdResetComplete} />
      <Stack.Screen name='EditProfile' component={EditProfile} />
      <Stack.Screen name='RestaurantInfo' component={RestaurantInfo} />
      <Stack.Screen name='QueueConfirm' component={QueueConfirm} />
    </Stack.Navigator>
  )
}

export default StackNavigator;
