import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const QueData = () => {

    const [queueData, setQueueData] = useState(null);

    const retrieveData = () => {
        fetch('https://app-57vwexmexq-uc.a.run.app/api/queues/userqueue', {
          method: 'GET',
          
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkF2MGE3ZlBTWjVpcE9aNE9jMGQzIiwicm9sZSI6InVzZXIiLCJpYXQiOjE2ODg3NjIwNDgsImV4cCI6MTY4ODc2MjY0OH0.INd0ZVQtA4-YOS3ZtOmkTfsgKi9nDArELx-jRHeePiY'                   
            // the authorization token currently needs to be changed every 5 min. To change it, login with: hello@hii.com, password: 99999999 and a new token will be generated and show in the console logs via the LoginEmail component
          },
        })
          .then((response) => response.text())
          .then((data) => {
            console.log('data:', data); // Success message from the server
            setQueueData(data); // Store the received data in state
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      };

    useEffect( () => {
        retrieveData();
    }, []);

    return (
        <View>
            
            <Text>{queueData}</Text>
            
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FEEEEF',
      alignItems: 'centaer',
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
  
  export default QueData;
  
  

