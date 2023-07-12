import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const QueData = () => {

    const [queueData, setQueueData] = useState(null);

    const retrieveData = () => {
        fetch('https://app-57vwexmexq-uc.a.run.app/api/queues/userqueue', {
          method: 'GET',
          
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkF2MGE3ZlBTWjVpcE9aNE9jMGQzIiwicm9sZSI6InVzZXIiLCJpYXQiOjE2ODkwNDgzMjMsImV4cCI6MTY4OTA1MTkyM30.O_sMSvyr8hPIoIE4FjxqpwOxnthY9JuIwFUZjnTsXTo'                                            
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

    useEffect(() => {
        retrieveData(); 
    }, []);

    return (
        
        <View style={styles.container}>
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
  });
  
export default QueData;
  
  

