import React, { useState, useEffect } from 'react';

import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { theme } from '../styles/theme';
import CustomButton from './CustomButton';
import { useNavigation } from '@react-navigation/native';
import RegisterAPI from './helpers/RegisterAPI';

const InputField = ({ label, placeholder, onChangeText }) => (
  <>
    <Text style={{ fontSize: theme.fontsize.md, marginBottom: 5, fontFamily: theme.font.secondary }}>{label}</Text>
    <TextInput
      style={styles.input_info}
      label={label}
      placeholder={placeholder}
      onChangeText={onChangeText}
      autoCapitalize="none"
    />
  </>
);

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState({ firstName: '', lastName: '' });

  const navigation = useNavigation();

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleConfirmPasswordChange = (text) => {
    setConfirmPassword(text);
  };

  const handleNameChange = (key, value) => {
    setName((prevName) => ({ ...prevName, [key]: value }));
  };

  const handleRegistration = async () => {
    const registrationBody = {
      email: email,
      firstName: name.firstName,
      lastName: name.lastName,
      password: password,
    };
    if (password !== confirmPassword) {
      Alert.alert('Passwords do not match.');
      return;
    } else {
      try {
        const response = await RegisterAPI(registrationBody);

        if (response.ok) {
          console.log('Registration successful:', response);
          navigation.navigate('LoginEmail');
        } else {
          // Handle the case where registration failed
          console.log('Registration failed');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <InputField
          label="Email"
          placeholder="helloitsme@example.com"
          onChangeText={handleEmailChange}
          secureTextEntry={false}
        ></InputField>

        <InputField
          label="Password"
          placeholder="Please enter 8 - 16 characters"
          onChangeText={handlePasswordChange}
          secureTextEntry={true}
        ></InputField>

        <InputField
          label="Confirm Password"
          placeholder="**********"
          onChangeText={handleConfirmPasswordChange}
          secureTextEntry={true}
        ></InputField>

        <InputField
          label="First Name"
          placeholder="Please enter 2 - 16 characters"
          onChangeText={(text) => handleNameChange('firstName', text)}
          secureTextEntry={false}
        ></InputField>

        <InputField
          label="Last Name"
          placeholder="Please enter 2 - 16 characters"
          onChangeText={(text) => handleNameChange('lastName', text)}
          secureTextEntry={false}
        ></InputField>
      </View>
      <CustomButton title="Register" onPress={handleRegistration} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: theme.color.lightpink,
  },
  inputContainer: {
    width: '80%',
    marginTop: 20,
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
});

export default Register;
