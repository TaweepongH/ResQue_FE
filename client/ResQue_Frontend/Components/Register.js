import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

const Register = () => {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <Text style={styles.text}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="helloitsme@example.com"
      />
      <Text style={styles.text}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Please enter 8 - 16 characters"
      />
      <Text style={styles.text}>Confirm Password</Text>
      <TextInput
        style={styles.input}
        placeholder="**********"
      />  
      <Text style={styles.text}>Name</Text>    
       <TextInput
        style={styles.input}
        placeholder="Please enter 2 - 16 characters"
      />
        <TouchableOpacity style={styles.button} >
        <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>     


    </View>
  );
};

const styles = {
  container:{
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#FEEEEF',
    paddingBottom:190,
    width:'100%',
    height:'100%',
  },
  input: {
    backgroundColor:'white',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    width:300,
  },
  title:{
    marginBottom:20
  },
  text:{
    alignSelf:'flex-start',
    marginLeft:40,
  },
  button:{
     backgroundColor: '#CC313D',
     borderRadius:3,
     width:"80%",
     height:35,
     alignItems:'center',
     marginBottom:15,
     marginTop:10,
  },
  buttonText:{
    marginTop:8,
    color: 'white',
    fontWeight:'bold',
    
  }

};

export default Register;
