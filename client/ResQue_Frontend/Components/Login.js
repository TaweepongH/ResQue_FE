import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import logo from '../Image/newLogo.png';
import CustomButton from './CustomButton';

const Login = () => {
  const navigation = useNavigation();

  const handleSignUp = () => {
    navigation.navigate('Register');
  };
  const handleLoginEmail = () => {
    navigation.navigate('LoginEmail');
  };

  const handleGoogleAuth = () => {
    navigation.navigate('GoogleAuth')
  }

  const handleForgotPwrd = () => {
    navigation.navigate('ResetPwd');
  }


  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <CustomButton icon="facebook-square" title="Log in with FaceBook" onPress={() => console.log("Facebook btn pressed")} />
      <CustomButton icon="google" title="Log in with Google" onPress={handleGoogleAuth} />
      <CustomButton icon="mail" title="Log in with E-mail" onPress={handleLoginEmail} />
      <CustomButton icon="mail" title="forgot Pwrd?" onPress={handleForgotPwrd} />

      <View style={styles.signupContainer}>
        <Text style={styles.noAccountText}>Don't have an account? </Text>
        <TouchableOpacity onPress={handleSignUp}>
          <Text style={styles.signupText}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEEEEF',
  },
  logo: {
    marginBottom: 90,

  },
  button: {
    backgroundColor: '#CC313D',
    borderRadius: 4,
    marginTop: 10,
    width: '80%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FEEEEF',
    marginLeft: 10, // Adjust the margin as needed
    fontSize: 16,
    fontWeight: 'bold',
  },
  signupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  noAccountText: {
    color: 'grey',
  },
  signupText: {
    color: '#CC313D',
    textDecorationLine: 'underline',
    marginLeft: 5,
  },
});

export default Login;

