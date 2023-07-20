/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import TabNavigator from './Components/TabNavigator/TabNavigator'
import StackNavigator from './Components/StackNavigator/StackNavigator';


import Map from './Components/Map';
import QueData from './Components/QueData';
import LoginEmail from './Components/LoginEmail';
import Register from './Components/Register';



function App(): JSX.Element {
  // TODO: change this when implementing authentication. This is just for easy testing
  const [user, setUser] = useState(true);

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

