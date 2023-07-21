import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

const InputField = ({ label, placeholder, onChangeText }) => (
  <>
    <Text style={{ color: 'black', fontSize: 15, marginLeft: 40, marginBottom: 3 }}>
      {label}
    </Text>
    <TextInput
      style={styles.input_info}
      label={label}
      placeholder={placeholder}
      onChangeText={onChangeText}
    />
  </>
);

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState({ firstName: '', lastName: '' });


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
      headers: {'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({
      email: `${email}`,
      password: `${password}`, 
      firstName: `${name.firstName}`,
      lastName: `${name.lastName}`

    }),
  }).then((response) => response.text())
    .then((data) => {

      console.log("data: ", data);
      
      if (data.substring(2, 9) === 'message') {
        // if the email entered is already registered
        Alert.alert(data.substring(12, data.length - 2));  
      }

      if (data.substring(2, 4) === 'id') {
        // upon successful registration
        Alert.alert("Success! Thank you.");  
      }
      
    }).catch((error) => {
      console.error('Error:', error);
    });
    }
    
  }


  return (
    <View style={styles.container}>
      
      <InputField
        label="Email"
        placeholder="helloitsme@example.com"
        onChangeText={handleEmailChange}
      ></InputField>
      
      <InputField
        label="Password" 
        placeholder="Please enter 8 - 16 characters" 
        onChangeText={handlePasswordChange}
      ></InputField>
      
      <InputField
         label="Confirm Password" 
         placeholder="**********" 
         onChangeText={handleConfirmPasswordChange}
      ></InputField>
      
      <InputField
        label="First Name"
        placeholder="Please enter 2 - 16 characters"
        onChangeText={(text) => handleNameChange('firstName', text)}
      ></InputField>
      
      <InputField
        label="Last Name"
        placeholder="Please enter 2 - 16 characters"
        onChangeText={(text) => handleNameChange('lastName', text)}
      ></InputField>
    
      <TouchableOpacity style={styles.registerButton} onPress={handleRegistration}>
        <Text style={styles.registerButtonText}>Register</Text>
      </TouchableOpacity>
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
    marginLeft: 40,
    marginBottom: 15,
  },
  input_info: {
    backgroundColor:'white',
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
  marginTop: 10,
  alignSelf: 'center', 
},

  registerButtonText: {
    marginTop: 8,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Register;
