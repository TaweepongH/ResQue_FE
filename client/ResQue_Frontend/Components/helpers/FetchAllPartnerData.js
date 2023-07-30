import React, { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';


const FetchPartnerData = () => {

    const [partnerData, setPartnerData] = useState('');

    const retrieveAllPartnerData = () => {

        fetch('https://app-57vwexmexq-uc.a.run.app/api/partners/all', {
          method: 'GET',
          
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkF2MGE3ZlBTWjVpcE9aNE9jMGQzIiwicm9sZSI6InVzZXIiLCJpYXQiOjE2ODkwNDgzMjMsImV4cCI6MTY4OTA1MTkyM30.O_sMSvyr8hPIoIE4FjxqpwOxnthY9JuIwFUZjnTsXTo'                                            
            // the authorization token currently needs to be changed every 5 min. To change it, login with: hello@hii.com, password: 99999999 and a new token will be generated and show in the console logs via the LoginEmail component
          },
        })
          .then((response) => response.text())
          .then((data) => {
            if (data) {
                console.log("there is data 👍");
            }
            try {
                const jsonData = JSON.parse(data); // Parse the response text to a JavaScript object
                console.log('JSON Data:', jsonData); // This will log the response data as a JavaScript object
                setPartnerData(jsonData); // Store the received data in state
              } catch (error) {
                console.error('Error parsing JSON:', error);
              }
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      };

    useState( () => {
        retrieveAllPartnerData();
    }, []);


    return (
        <Text>

            just retreiving data and logging it in the console

        </Text>
    )
}

export default FetchPartnerData;