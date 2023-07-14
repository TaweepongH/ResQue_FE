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
import RestaurantData from './Components/RestaurantData';


function App(): JSX.Element {
  // TODO: change this when implementing authentication. This is just for easy testing
  const [user, setUser] = useState(true);

  return (
    // <NavigationContainer>

    //     {/* TODO: Need to handle setIsLoggedIn based on authentication. Skip this for now.*/}
    //   {user ? (<>
    //       <TabNavigator />
    //     </>) : (
    //       <StackNavigator />
    //     )}

    // </NavigationContainer>
    <RestaurantData></RestaurantData>
  );
}

export default App;

