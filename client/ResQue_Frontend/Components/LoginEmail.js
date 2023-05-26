import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

const LoginEmail = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (text) => {
    setEmail(text);
  };
  const handlePasswordChange = (text) => {
    setPassword(text);
  };
  const handleRegister = () => {
    console.log("Sign up pressed");
    // Navigate to the Signup screen

  };
  const handleSubmit = () => {
    // Perform the necessary logic when the form is submitted
    console.log('Email:', email);
     console.log('Password:', password);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log in with Email</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={handleEmailChange}
      />


      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        value={password}
        onChangeText={handlePasswordChange}
      />

    <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Log in</Text>
      </TouchableOpacity>     

      <Text>Forgot your password?</Text>

      <TouchableOpacity onPress={() => console.log("Register pressed")}>
      <Text>or Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  container:{
    marginTop:60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width:300,
  },
  title:{
    marginBottom:20
  },
  button:{
     backgroundColor: 'grey',
     borderRadius:3,
     width:100,
     height:35,
     alignItems:'center',
     marginBottom:15,
  },
  buttonText:{
    marginTop:8,
    color: 'white',
    
  }

};

export default LoginEmail;
