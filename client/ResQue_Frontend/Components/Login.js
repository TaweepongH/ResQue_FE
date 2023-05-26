import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CustomButton = ({ title, onPress, style }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};
const handleSignUp = () => {
  navigation.navigate('Signup');
};

const Login = () => {
  // const navigation = useNavigation(); // Get the navigation object using the useNavigation hook

  const handleSignUp = () => {
    console.log("Sign up pressed");
    // Navigate to the Signup screen

  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ResQue</Text>
      <Text style={styles.subtitle}>Skip the line, Save your time!</Text>
      {/* Set up the redirect to Signup */}
      <CustomButton style={styles.button} title="Log in with FaceBook" onPress={() => console.log("Button1 pressed")} />
      <CustomButton style={styles.button} title="Log in with LINE" onPress={() => console.log("Button2 pressed")} />
      <CustomButton style={styles.button} title="Log in with Google" onPress={() => console.log("Button3 pressed")} />
      <CustomButton style={styles.button} title="Log in with E-mail" onPress={() => console.log("Button4 pressed")} />
      <CustomButton style={styles.button} title="Log in with Apple" onPress={() => console.log("Button5 pressed")} />
      {/* <Text style={styles.linkText}>Don't have an account? 
        <Text style={styles.linkText} onPress={handleSignUp}>
          Sign up
        </Text>
      </Text> */}
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
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 18,
    color: 'gray',
    marginBottom: 20,
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
  linkText: {
    marginTop: 40,
    fontSize: 12,
  },
});

export default Login;
