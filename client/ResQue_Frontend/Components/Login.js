import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Navbar from './Navbar/Navbar';

const CustomButton = ({ title, onPress, style }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};
const Login = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>ResQue</Text>
      <Text style={styles.subtitle}>Skip the line, Save your time!</Text>
      {/* need to set up for redirect to each login method */}
      <CustomButton style={styles.button} title="Log in with FaceBook" onPress={() => console.log('Button1 pressed')} />
      <CustomButton style={styles.button} title="Log in with LINE" onPress={() => console.log('Button2 pressed')} />
      <CustomButton style={styles.button} title="Log in with Google" onPress={() => console.log('Button3 pressed')} />
      <CustomButton style={styles.button} title="Log in with E-mail" onPress={() => console.log('Button4 pressed')} />
      <CustomButton style={styles.button} title="Log in with Apple" onPress={() => console.log('Button5 pressed')} />
      <Navbar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    color: 'gray',
    marginBottom: 40,
  },
  button: {
    backgroundColor: 'gray',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 2,
    marginTop: 10,
    width: 210,
    height: 40,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Login;
