import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
// import { useNavigation } from '@react-navigation/native';

const LoginEmail = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const navigation = useNavigation();
  const handleEmailChange = (text) => {
    setEmail(text);
  };
  const handlePasswordChange = (text) => {
    setPassword(text);
  };
  const handleRegister = () => {
    navigation.navigate('Register'); // Replace 'Register' with the actual name of your signup screen
  };

  const handleSubmit = () => {
    // Perform the necessary logic when the form is submitted
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log in</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={handleEmailChange}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={handlePasswordChange}
      />
      
      <View style={styles.forgotContainer}>
        <TouchableOpacity>
          <Text style={styles.btn_pw}>Forgot Password ?</Text>
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Log in</Text>
      </TouchableOpacity>

      <Text style={styles.signup}>
        Don't have an account?
        <TouchableOpacity>
          <Text style={styles.signup_btn}> Sign up</Text>
        </TouchableOpacity>
      </Text>
    </View>
  );
};

const styles = {
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FEEEEF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom:290,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: 300,
  },
  title: {
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#CC313D',
    borderRadius: 3,
    width: '80%',
    height: 35,
    alignItems: 'center',
    marginBottom: 15,
  },
  btn_pw: {
    color: '#CC313D',
    textAlign: 'right', // Align the text to the right
  },
  buttonText: {
    marginTop: 8,
    color: 'white',
    fontWeight:'bold',
  },
  signup_btn: {
    color: '#CC313D',
    textDecorationLine: 'underline',
  },
  forgotContainer: {
    alignSelf: 'flex-end', // Align the container to the right side
    marginBottom: 20,
    marginRight:40,
  },
};

export default LoginEmail;
