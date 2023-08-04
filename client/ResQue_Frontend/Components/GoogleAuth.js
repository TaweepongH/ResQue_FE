// import statusCodes along with GoogleSignin
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import {View, Button} from 'react-native';
import { GoogleAuthProvider, signInWithCredential, getAuth } from 'firebase/auth'; // Make sure to import getAuth from 'firebase/auth'



GoogleSignin.configure({
    webClientId: '350964133055-3vbor7lg8rla3fm17ae14re1uo5rdj5e.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
    // iosClientId: '350964133055-jd9e7mlfdpfi4bkjtvhvhr7etb1aqppl.apps.googleusercontent.com', // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
  });

const GoogleAuth = () => {

const signIn = async () => {
    try {
      
      await GoogleSignin.hasPlayServices();
      
      const idToken = await GoogleSignin.signIn();

      const auth = getAuth();
      
      const googleCredentials = GoogleAuthProvider.credential(idToken);
      console.log("testing here");
      
      await signInWithCredential(auth, googleCredentials);

      setState({ userInfo });
    } catch (error) {
        console.log("error from auth component: ", error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  return (
    <View style={{ justifyContent: 'flex-start', marginTop: 50 }}>
        <Button title="Google Sign In!" onPress={signIn} >
        </Button>
    </View>
  )

}

export default GoogleAuth;

