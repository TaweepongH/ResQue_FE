import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import logo from '../Image/logo.png';

const CustomButton = ({ title, onPress, style }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const Login = () => {
  const handleSignUp = () => {
    console.log("Sign up pressed");
  };

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <CustomButton title="Log in with FaceBook" onPress={() => console.log("Facebook btn pressed")} />
      <CustomButton title="Log in with Google" onPress={() => console.log("Google btn pressed")} />
      <CustomButton title="Log in with E-mail" onPress={() => console.log("Email btn pressed")} />

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
    color: 'white',
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

