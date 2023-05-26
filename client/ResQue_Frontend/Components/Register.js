import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

const Register = () => {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
      />      
       <TextInput
        style={styles.input}
        placeholder="Name"
      />
        <TouchableOpacity style={styles.button} >
        <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>     

      <Text style={styles.title}>Terms and Condition</Text>

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
     marginTop:10,
  },
  buttonText:{
    marginTop:8,
    color: 'white',
    
  }

};

export default Register;
