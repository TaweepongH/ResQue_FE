import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const Register = () => {
  return (
    <View style={styles.container}>
      <InputField label="Email" placeholder="helloitsme@example.com" />
      <InputField label="Password" placeholder="Please enter 8 - 16 characters" />
      <InputField label="Confirm Password" placeholder="**********" />
      <InputField label="Name" placeholder="Please enter 2 - 16 characters" />
      <TouchableOpacity style={styles.registerButton}>
        <Text style={styles.registerButtonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const InputField = ({ label, placeholder }) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.labelText}>{label}</Text>
      <TextInput style={styles.infoInput} placeholder={placeholder} />
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
