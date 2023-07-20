import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const LoginEmail = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleLogin = () => {
    
    console.log('User Email:', email);
    console.log('User Password:', password);

    fetch(`https://app-57vwexmexq-uc.a.run.app/api/users/login`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({
      email: `${email}`,
      password: `${password}`
    }),
  }).then((response) => response.text())
    .then((data) => {
      console.log("data: ", data); // Success message from the server
    }).catch((error) => {
      console.error('Error:', error);
    });

  };
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input_info}
          placeholder="Enter your email"
          value={email}
          onChangeText={handleEmailChange}
        />

        <TextInput
          style={styles.input_info}
          placeholder="Enter your password"
          value={password}
          onChangeText={handlePasswordChange}
        />
      </View>

      <TouchableOpacity style={styles.forgotButton}>
        <Text style={styles.forgotText}>Forgot Password ?</Text>
      </TouchableOpacity>

      {/* where the handleLogin function is called */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin} >
        <Text style={styles.loginText}>Log in</Text>
      </TouchableOpacity>

      <View style={styles.signupContainer}>
        <Text style={styles.noAccountText}>Don't have an account?  </Text>
        <TouchableOpacity>
          <Text style={styles.signupText}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEEEEF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 290,
  },
  inputContainer: {
    width: '80%',
    marginBottom: 10,
  },
  input_info: {
    backgroundColor:'white',
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '100%',
  },
  title: {
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: '#CC313D',
    borderRadius: 3,
    width: '80%',
    height: 35,
    alignItems: 'center',

  },
  forgotButton: {
    alignSelf: 'flex-end',
    marginBottom: 20,
    marginRight: 40,
  },
  forgotText: {
    color: '#CC313D',
    textAlign: 'right',
  },
  loginText: {
    marginTop: 8,
    color: 'white',
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
  },
});

export default LoginEmail;

