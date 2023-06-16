/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import Navbar from './Components/Navbar/Navbar';
import { NavigationContainer } from '@react-navigation/native';
import Login from './Components/Login';
import LoginEmail from './Components/LoginEmail';
import Register from './Components/Register';

function App(): JSX.Element {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <NavigationContainer>
      {/* TODO: Need to handle setIsLoggedIn based on authentication. Skip this for now.*/}
      {/* {isLoggedIn ? <Navbar /> : <Login />} */}
      <LoginEmail/>
    </NavigationContainer>
  );
}

export default App;

