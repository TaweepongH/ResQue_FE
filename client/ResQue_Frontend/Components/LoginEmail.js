
import React, { useState, useCallback, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { theme } from '../styles/theme';
import CustomButton from './CustomButton';
import LoginAPI from './helpers/LoginAPI';


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
    
    LoginAPI(email, password, setBearerTokenContext, setEmailContext);
  
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
      <CustomButton title="Log in" onPress={handleLogin}/>

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
    backgroundColor: theme.color.lightpink,
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%',
    marginTop: 30,
  },
  input_info: {
    backgroundColor: theme.color.white,
    borderColor: theme.color.gray,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingTop: 5,
    paddingBottom: 10,
    marginBottom: 12,
    width: '100%',
    fontFamily: theme.font.secondary,
    fontSize: theme.fontsize.md,
  },
  forgotButton: {
    alignSelf: 'flex-end',
    marginBottom: 10,
    marginRight: 40,
  },
  forgotText: {
    fontFamily: theme.font.secondary,
    color: theme.color.red,
    fontSize: theme.fontsize.sm,
    fontWeight: '500',
    textAlign: 'right',
  },
  signupContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  noAccountText: {
    fontFamily: theme.font.secondary,
    color: theme.color.gray,
  },
  signupText: {
    fontFamily: theme.font.secondary,
    color: theme.color.red,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});

export default LoginEmail;

