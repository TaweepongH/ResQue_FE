// import statusCodes along with GoogleSignin
import { useState } from 'react';
import { GoogleSignin, statusCodes, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import {View, Button, Text} from 'react-native';
import { GoogleAuthProvider, signInWithCredential, getAuth } from 'firebase/auth'; // Make sure to import getAuth from 'firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebaseApp from '/Users/reidgibson-bingham/Documents/projects/groupProjects/ResQue_FE/client/ResQue_Frontend/config/firebaseConfig.js';
import { useAnimatedGestureHandler } from 'react-native-reanimated';


GoogleSignin.configure({
    webClientId: '350964133055-3vbor7lg8rla3fm17ae14re1uo5rdj5e.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
  });

const GoogleAuth = () => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const signIn = async () => {

        try {
        
        await GoogleSignin.hasPlayServices();

        const {idToken} = await GoogleSignin.signIn();
        
        const auth = getAuth(firebaseApp);

        console.log('token data: ', idToken);
        
        const googleCredentials = GoogleAuthProvider.credential(idToken);
        
        await signInWithCredential(auth, googleCredentials);

        setIsAuthenticated(true);

        } catch (error) {
            console.log("error from auth component: ", error);
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            // user cancelled the login flow
        } else if (error.code === statusCodes.IN_PROGRESS) {
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            // play services not available or outdated
        } 
        }
    };

  return (
    <View style={{ justifyContent: 'flex-start', marginTop: 50 }}>
        {isAuthenticated ? (
            <Text>You've successfully authenticated yourself via Google!</Text>
        ) : (
            <GoogleSigninButton title="Google Sign In!" onPress={signIn} />  
        )}
        
    </View>
  )

}

export default GoogleAuth;

