
import React, { useState, useCallback, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import CustomModal from './CustomModal.js';


const LoginEmail = () => {
  
  const { setEmailContext, setBearerTokenContext, setPasswordContext } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  const handleSignUp = () => {
     navigation.navigate('Register');
  };

  // chat gpt suggested i "memoize" these handlers with the useCallback hook because they're likely to receive the same input often. ie. when a user signs in multiple times
  const handleEmailChange = useCallback((text) => {
    setEmail(text);
  }, []);

  const handlePasswordChange = useCallback((text) => {
    setPassword(text);
  }, []);
                                           
   const handleForgotPwd = () => {
     navigation.navigate('ResetPwd');
  };

  const handleLogin = async () => {
    
    console.log('User Email:', email);
    console.log('User Password:', password);

    try {

      const response = await fetch(`https://app-57vwexmexq-uc.a.run.app/api/users/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({
        email: email,
        password: password
        }),
      })

      const data = await response.json();

      console.log("data: ", data); // Success message from the server
  
      // this is where we will define the bearerToken for the rest of our app to use
      // if there is an accessToken key in the data message, then we will set the bearerTokenContext to it
      if (response.ok && data.accessToken) {
    
        setBearerTokenContext(data.accessToken)
        setPasswordContext(password);
        setEmailContext(email);
        
      } else {
        //error messages etc.
        
        Alert.alert(data.title, data.message);
      }
      
    } catch (error) {
  
      console.error("Error:", error);
  
    }
  
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input_info}
          placeholder="Enter your email"
          value={email}
          onChangeText={handleEmailChange}
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input_info}                       
          placeholder="Enter your password"
          value={password}
          onChangeText={handlePasswordChange}
          autoCapitalize="none"
          // in the future we can include the secureTextEntry property to hide the password when it's being typed in
          // secureTextEntry
        />
      </View>

      <TouchableOpacity style={styles.forgotButton}>
        <Text style={styles.forgotText} onPress={handleForgotPwd}>Forgot Password ?</Text>
      </TouchableOpacity>

      {/* where the handleLogin function is called */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin} >
        <Text style={styles.loginText}>Log in</Text>
      </TouchableOpacity>

      <View style={styles.signupContainer}>
        <Text style={styles.noAccountText}>Don't have an account?  </Text>
        <TouchableOpacity>
          <Text style={styles.signupText} onPress={handleSignUp}>Sign up</Text>
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

