
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../Login';
import LoginEmail from '../LoginEmail';
import Register from '../Register';
import ResetPwd from '../../screens/ResetPwd';
import OtpVerify from '../../screens/OtpVerify';
import CreateNewPwd from '../../screens/CreateNewPwd';
import PwdResetComplete from '../../screens/PwdResetComplete';
import TermsPolicies from '../../screens/more/TermsPolicies';
import Settings from '../../screens/Settings'
import EditProfile from '../../screens/myinfo/EditProfile';
import GoogleAuth from '../GoogleAuth';
import Feedback from '../Feedback';
import RestaurantInfo from '../RestaurantInfo';
import MyInfo from '../../screens/myinfo/MyInfo';
import RestaurantList2 from '../RestaurantList';
import Main from '../Main';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{  
        headerStyle: {
          backgroundColor: 'white',
          height: 110, 
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 24,
        },
        headerTintColor: 'black',
        headerTitleAlign: 'center',
        // headerBackTitleVisible: false, // not working
        headerBackTitleStyle: {fontSize: 0} 
      }}
    >
      <Stack.Screen 
        name='Login' 
        component={Login} 
        options={{
          headerShown: false,
        }}
        />
      <Stack.Screen 
        name='LoginEmail' 
        component={LoginEmail} 
        options={{
          headerTitle: 'Log in',
        }}
        />
      <Stack.Screen 
        name='GoogleAuth' 
        component={GoogleAuth} 
        options={{
          headerShown: false,
        }}
        />
      <Stack.Screen
        name='Register' 
        component={Register}
        options={{
          headerTitle: 'Register',
        }}
      />
      <Stack.Screen 
        name='ResetPwd' 
        component={ResetPwd}
        options={{
          headerTitle: 'Reset Password',
        }}
        />
      <Stack.Screen 
        name='OtpVerify' 
        component={OtpVerify} 
        options={{
          headerTitle: 'Reset Password',
        }}
      />         
      <Stack.Screen 
        name='CreateNewPwd' 
        component={CreateNewPwd}
        options={{
          headerTitle: 'Reset Password',
        }}
        />
      <Stack.Screen 
        name='PwdResetComplete' 
        component={PwdResetComplete} 
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name='Settings' component={Settings} />
      <Stack.Screen name='Feedback' component={Feedback} />
      <Stack.Screen name='TermsPolicies' component={TermsPolicies} />
      <Stack.Screen name='EditProfile' component={EditProfile} />
      <Stack.Screen name='RestaurantInfo' component={RestaurantInfo} />
      <Stack.Screen name='MyInfo' component={MyInfo} />
    </Stack.Navigator>
  )
}

export default StackNavigator;
