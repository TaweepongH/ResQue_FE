import React, { useState, useEffect } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

const InputField = ({ label, placeholder, onChangeText, secureTextEntry }) => (
  <>
    <Text style={{ color: 'black', fontSize: 15, marginLeft: 40, marginBottom: 3 }}>
      {label}
    </Text>
    <TextInput
      style={styles.input_info}
      label={label}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      onChangeText={onChangeText}
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

  const handleRegistration = () => {

    console.log('User Email:', email);
    console.log('User Password:', password);

    console.log('user first name: ', name.firstName);
    console.log('user last name: ', name.lastName);

    if (password !== confirmPassword) {
      Alert.alert('Passwords do not match.');
      return;
    } else {
      fetch(`https://app-57vwexmexq-uc.a.run.app/api/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify({
          email: `${email}`,
          password: `${password}`,
          firstName: `${name.firstName}`,
          lastName: `${name.lastName}`, 
          active: true
        }),
      }).then((response) => response.text())
        .then((data) => {

          console.log("registration data: ", data);

          // if the email entered is already registered
          if (JSON.parse(data).message) {
            
            Alert.alert(JSON.parse(data).message);

          }

          // if the data returns an object with an ID key, the user has successfully registered
          if (JSON.parse(data).id) {

            Alert.alert("Success! Thank you. Redirecting you to the Login page");
            // navigate to the login component only after successfully registering
            navigation.navigate('LoginEmail');

          }

        }).catch((error) => {
          console.error('Error:', error);
        });
    }

  }

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

        <TouchableOpacity style={styles.registerButton} onPress={handleRegistration}>
          <Text style={styles.registerButtonText}>Register</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FEEEEF',
    paddingBottom: 190,
  },
  inputContainer: {
    marginTop: 70
  },
  input_info: {
    backgroundColor: 'white',
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    marginLeft: 40,
    width: '80%',
  },
  infoInput: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    width: '90%',
  },
  registerTitle: {
    alignSelf: 'center',
    marginBottom: 20,
  },

  labelText: {
    marginBottom: 5,
  },
  registerButton: {
    backgroundColor: '#CC313D',
    borderRadius: 3,
    width: '80%',
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    alignSelf: 'center',
  },

  registerButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Register;
