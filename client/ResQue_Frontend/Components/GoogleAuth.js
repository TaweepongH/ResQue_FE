// import statusCodes along with GoogleSignin
import { useState } from 'react';
import { GoogleSignin, statusCodes, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import {View, Button, Text, Alert} from 'react-native';
import { GoogleAuthProvider, signInWithCredential, getAuth } from 'firebase/auth'; // Make sure to import getAuth from 'firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebaseApp from '../config/firebaseConfig.js';
import { useAnimatedGestureHandler } from 'react-native-reanimated';
import { useAuth } from '../contexts/AuthContext';

// after authenticating with google, we have to register the user if they aren't already registered then log them in, so we will use two api calls after authentication

// Retrieve the user's Google credentials (ID token) after a successful sign-in.
// Use Firebase Authentication (or another authentication service) to sign in or create a user account using the Google credentials.
// If the user is successfully authenticated, you can grant them access to your app.

// first we auto call the googleSignIn function, then inside of that function we call the handleRegistration function which will conditionally call the handleLogin function


GoogleSignin.configure({
    webClientId: '350964133055-3vbor7lg8rla3fm17ae14re1uo5rdj5e.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
  });

const GoogleAuth = () => {


    const { setEmailContext, setBearerTokenContext, setPasswordContext } = useAuth();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userData, setUserData] = useState('');
    // the password will just have to be a random string, because Google will not provide us with a user's password
    const password = "GooglePassword";
    // const password = Array.from({ length: 24 }, () => Math.random().toString(36)[2]).join('');


    const handleLogin = (userData) => {

        console.log("this is the userData: ", userData);

        fetch(`https://app-57vwexmexq-uc.a.run.app/api/users/login`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({
      email: userData.email,
      password: password
    }),
    })
    .then((response) => response.text())
    .then((data) => {

        console.log("data: ", data); // Success message from the server
    
        // this is where we will define the bearerToken for the rest of our app to use
        // if there is an accessToken key in the data message, then we will set the bearerTokenContext to it
        if (JSON.parse(data).accessToken) {
            setBearerTokenContext(JSON.parse(data).accessToken)
        } else {
            //error messages etc.
            Alert.alert(JSON.parse(data).title, JSON.parse(data).message);
        }
        
        }).catch((error) => {
        console.error('Error:', error);
        });

        setPasswordContext(password);
        setEmailContext(userData.email);
        
    }

    const handleRegistration  = (userData) => {

        console.log('User Email:', userData.email);
        console.log('User Password:', password);

        console.log('user first name: ', userData.givenName);
        console.log('user last name: ', userData.familyName);

        fetch(`https://app-57vwexmexq-uc.a.run.app/api/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify({
          email: `${userData.email}`,
          password: `${password}`,
          firstName: `${userData.givenName}`,
          lastName: `${userData.familyName}`, 
          active: true
        }),
      }).then((response) => response.text())
        .then((data) => {

          console.log("registration data: ", data);

          // if the email entered is already registered then we should log them in
          if (JSON.parse(data).message === "User is already registered!") {

            // handle login functionality here
            handleLogin(userData)
            

          } else {
            // otherwise we should register them then log them in
            // if the data returns an object with an ID key, the user has successfully registered
            if (JSON.parse(data).id) {

                Alert.alert("Success! Thank you.");
                // then log them in
                handleLogin(userData);

            }

          }
          

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

        setIsAuthenticated(true);

        console.log("user data: ", user);

        // now we begin the registration and login process using our db
        handleRegistration(user)

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

