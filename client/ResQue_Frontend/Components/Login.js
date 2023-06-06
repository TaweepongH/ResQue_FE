import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import logo from '../Image/logo.png';

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
      <Image source={logo} style={styles.logo} />
      <CustomButton style={styles.button} title="Log in with FaceBook" onPress={() => console.log("Button1 pressed")} />
      <CustomButton style={styles.button} title="Log in with Google" onPress={() => console.log("Button3 pressed")} />
      <CustomButton style={styles.button} title="Log in with E-mail" onPress={() => console.log("Button4 pressed")} />
    <Text style={styles.signup}>
        Don't have an account ?
        <TouchableOpacity>
          <Text style={styles.signup_btn}>Sign up</Text>
        </TouchableOpacity>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#FEEEEF',
   
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 5,
  },
 logo:{
marginBottom:90,
 },
  button: {
    backgroundColor: '#CC313D',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    marginTop: 10,
    width:'80%',

  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf:'center',
  },
  signup:{
    color:'grey'
  },
  signup_btn:{
    color:'#CC313D',
     textDecorationLine: 'underline',
     marginTop:10,
  }

});

export default Login;
