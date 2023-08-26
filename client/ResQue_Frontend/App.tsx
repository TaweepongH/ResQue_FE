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
import {useAuth} from '/Users/reidgibson-bingham/Documents/projects/groupProjects/ResQue_FE/client/ResQue_Frontend/contexts/AuthContext.js'


function App(): JSX.Element {
  // TODO: change this when implementing authentication. This is just for easy testing
  const { bearerToken, password} = useAuth();
  const [user, setUser] = useState(false);

  const isAuthenticated = () => {
    if (bearerToken !== '') {
      setUser(true);
    } else {
      setUser(false);
    }
  }

  useEffect(() => {
    isAuthenticated();
  }, [bearerToken]); 

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

