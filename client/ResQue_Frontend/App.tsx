/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './Components/TabNavigator/TabNavigator'
import StackNavigator from './Components/StackNavigator/StackNavigator';
import {useAuth} from './contexts/AuthContext.js'


function App(): JSX.Element {
  
  const { bearerToken, password} = useAuth();
  const [user, setUser] = useState(true); //TODO: Need to be false before commit

  // const isAuthenticated = () => {
  //   if (bearerToken !== '') {
  //     setUser(true);
  //   } else {
  //     setUser(false);
  //   }
  // }

  // useEffect(() => {
  //   isAuthenticated();
  // }, [bearerToken]); 

  return (

    <NavigationContainer>


      {/* TODO: Need to handle setIsLoggedIn based on authentication. Skip this for now.*/}
      {user ? (<>
        <TabNavigator />
      </>) : (
          <StackNavigator />
        )}

    </NavigationContainer>

  );
}

export default App;

