// import statusCodes along with GoogleSignin
import { useState, useEffect } from 'react';
import { GoogleSignin, statusCodes, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import {View, Button, Text, Alert} from 'react-native';
import { GoogleAuthProvider, signInWithCredential, getAuth } from 'firebase/auth'; // Make sure to import getAuth from 'firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebaseApp from '../config/firebaseConfig.js';
import { useAnimatedGestureHandler } from 'react-native-reanimated';
import { useAuth } from '../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import LoginAPI from './helpers/LoginAPI.js';

GoogleSignin.configure({
    webClientId: '350964133055-3vbor7lg8rla3fm17ae14re1uo5rdj5e.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
  });

const GoogleAuth = () => {

    const navigation = useNavigation();

    const { setEmailContext, setBearerTokenContext } = useAuth();

    const handleRegistration  = (userData) => {

        fetch(`https://app-57vwexmexq-uc.a.run.app/api/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify({
          email: `${userData.email}`,
          firstName: `${userData.givenName}`,
          lastName: `${userData.familyName}`, 
          active: true,
          socialMediaToken: `${userData.id}`

        }),
      }).then((response) => response.text())
        .then((data) => {

            console.log("registration data: ", data);

            LoginAPI(userData.email, '', setBearerTokenContext, setEmailContext, userData.id)

        }).catch((error) => {
          console.error('Error:', error);
        });

    }

    const signIn = async () => {

        try {
        
        await GoogleSignin.hasPlayServices();

        const {idToken, user} = await GoogleSignin.signIn();
        
        const auth = getAuth(firebaseApp);

        console.log('token data: ', idToken);
        
        const googleCredentials = GoogleAuthProvider.credential(idToken);
        
        await signInWithCredential(auth, googleCredentials);

        console.log("user data: ", user);

        // now we begin the registration and login process using our db
        handleRegistration(user)

        } catch (error) {
            console.log("error from auth component: ", error);
            Alert.alert(error);
            navigation.navigate('Login');
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            // user cancelled the login flow
        } else if (error.code === statusCodes.IN_PROGRESS) {
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            // this is if we want to impliment google auth for android
            // play services not available or outdated
        } 
        }
    };

    useEffect(() => {
        signIn();
    }, []);

  return (
    <View>

    </View>
  )

}

export default GoogleAuth;

