import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleEmailChange = (text) => {
    setEmail(text);
    console.log("email value: ", email);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    console.log("password value: ", password);
  };

  const handleConfirmPasswordChange = (text) => {
    setConfirmPassword(text);
  };

  const handleFirstNameChange = (text) => {
    setFirstName(text);
    console.log("first name value: ", firstName);
  }

  const handleLastNameChange = (text) => {
    setLastName(text)
    console.log("last name value: ", lastName);
  }

  const handleRegistration = () => {

    console.log('User Email:', email);
    console.log('User Password:', password);
    console.log('user first name: ', firstName);
    console.log('user last name: ', lastName);

    if (password !== confirmPassword) {
      Alert.alert('Passwords do not match');
    return;
    } else {
      fetch(`https://app-57vwexmexq-uc.a.run.app/api/users/register`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({
      email: `${email}`,
      password: `${password}`, 
      firstName: `${firstName}`,
      lastName: `${lastName}`
    }),
  }).then((response) => response.text())
    .then((data) => {
      console.log("data: ", data); // Success message from the server
      
      if (data.substring(2, 9) === 'message') {
        Alert.alert(data.substring(12, data.length - 2));  
      }

      if (data.substring(2, 4) === 'id') {
        Alert.alert("Success! Thank you");  
      }
      
    }).catch((error) => {
      console.error('Error:', error);
    });
    }

    

    
  }


  return (
    <View style={styles.container}>
      <Text
        style={{color: 'black', fontSize: 15, marginLeft: 40, marginBottom: 3}}
      >Email</Text>
      <TextInput 
        style={styles.input_info}
        label="Email" 
        placeholder="helloitsme@example.com"
        onChangeText={handleEmailChange}  
      />
      <Text
        style={{color: 'black', fontSize: 15, marginLeft: 40, marginBottom: 3}}
      >Password</Text>
      <TextInput
        style={styles.input_info}
        label="Password" 
        placeholder="Please enter 8 - 16 characters" 
        onChangeText={handlePasswordChange}
      />
      <Text
        style={{color: 'black', fontSize: 15, marginLeft: 40, marginBottom: 3}}
      >Confirm Password</Text>
      <TextInput
        style={styles.input_info}
        label="Confirm Password" 
        placeholder="**********" 
        onChangeText={handleConfirmPasswordChange}
      />
      <Text
        style={{color: 'black', fontSize: 15, marginLeft: 40, marginBottom: 3}}
      >First Name</Text>
      <TextInput
        style={styles.input_info}
        label="First Name"
        placeholder="Please enter 2 - 16 characters" 
        onChangeText={handleFirstNameChange}
      />
      <Text
        style={{color: 'black', fontSize: 15, marginLeft: 40, marginBottom: 3}}
      >Last Name</Text>
      <TextInput
        style={styles.input_info}
        label="Last Name"
        placeholder="Please enter 2 - 16 characters" 
        onChangeText={handleLastNameChange}
      />
      {/* <InputField 
        label="Email" 
        placeholder="helloitsme@example.com"
        onChangeText={handleEmailChange}  
      />
      <InputField 
        label="Password" 
        placeholder="Please enter 8 - 16 characters" 
        onChangeText={handlePasswordChange}
      />
      <InputField 
        label="Confirm Password" 
        placeholder="**********" 
      />
      <InputField 
        label="First Name"
        placeholder="Please enter 2 - 16 characters" 
        onChangeText={handleFirstNameChange}
      />
      <InputField 
        label="Last Name"
        placeholder="Please enter 2 - 16 characters" 
        onChangeText={handleLastNameChange}
      /> */}
      <TouchableOpacity style={styles.registerButton} onPress={handleRegistration}>
        <Text style={styles.registerButtonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

// const InputField = ({ label, placeholder }) => {
//   return (
//     <View style={styles.inputContainer}>
//       <Text style={styles.labelText}>{label}</Text>
//       <TextInput style={styles.infoInput} placeholder={placeholder} />
//     </View>
//   );
// };

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
