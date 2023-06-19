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

function App(): JSX.Element {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <NavigationContainer>
        {/* TODO: Need to handle setIsLoggedIn based on authentication. Skip this for now.*/}
        {isLoggedIn ? (<>
          <TabNavigator />
        </>) : (
          <StackNavigator />
        )}
    </NavigationContainer>
  );
}

export default App;

