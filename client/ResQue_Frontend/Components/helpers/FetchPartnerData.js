import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TextInput, Button } from 'react-native';


// note: make sure you use postman to get the appropriate Bearer Token
// for the JSON data in the post request body include the following test partner data: 

// "email": "yg@yg.com",
// "password": "123456789"

const restaurantIDBearerToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijl2Tk1TNFF1WWRBaFRnbWZJNm1yIiwicm9sZSI6InBhcnRuZXIiLCJpYXQiOjE2OTA4NDIyMzAsImV4cCI6MTY5MDg0NTgzMH0.S_WTxTixEphSPoLDLNELYJBMpQFfqnErFSLRNieS6PU'

const FetchPartnerData = () => {

    const [partnerData, setPartnerData] = useState('');
    const [restaurantName, setRestaurantName] = useState('');
    const [restaurantsByArea, setRestaurantsByArea] = useState('');

    const retrieveAllPartnerData = () => {

        fetch('https://app-57vwexmexq-uc.a.run.app/api/partners/all', {
          method: 'GET',
          
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
        })
          .then((response) => response.text())
          .then((data) => {
            if (data) {
                console.log("there is data from the partners/all api 👍");
            }
            try {
                const jsonData = JSON.parse(data); // Parse the response text to a JavaScript object
                console.log('All partner data:', jsonData); // This will log the response data as a JavaScript object
                setPartnerData(jsonData); // Store the received data in state
              } catch (error) {
                console.error('Error parsing JSON:', error);
              }
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      };

      const retreivePartnerByName = () => {
      
        fetch(  `https://app-57vwexmexq-uc.a.run.app/api/partners/idorname/${restaurantName}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            Authorization: `Bearer ${restaurantIDBearerToken}`
          },
        })
        .then((response) => response.text())
        .then((data) => {
          if (data) {
              console.log("there is data from the partners/idorname api 👍");
          }
          try {
            console.log("data: ", data);
            } catch (error) {
              console.error('Error parsing JSON:', error);
            }
        })
        .catch((error) => {
          console.error('Error:', error);
        });

      }

      const retreivePartnerByArea = () => {
        fetch(  `https://app-57vwexmexq-uc.a.run.app/api/partners/area/${restaurantsByArea}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            Authorization: `Bearer ${restaurantIDBearerToken}`
          },
        })
        .then((response) => response.text())
        .then((data) => {
          if (data) {
              console.log("there is data from the partners/area api 👍");
          }
          try {
            console.log("Partner data By area: ", data);
            } catch (error) {
              console.error('Error parsing JSON:', error);
            }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
      }

    useState( () => {
        retrieveAllPartnerData();
    }, []);


    return (

      <View style={{ justifyContent: 'flex-start', marginTop: 50 }}> 
        {/* Add the input field for the restaurant name */}
        <TextInput
            style={styles.input}
            placeholder="Enter Restaurant Name"
            value={restaurantName}
            onChangeText={setRestaurantName} // Update the state variable when the user types in the input field
        />
        {/* Add a button to trigger the API call with the new restaurant name */}
        <Button title="Get Partner Data By Name" onPress={retreivePartnerByName} />
        <TextInput
            style={styles.input}
            placeholder="Enter Restaurant Area"
            value={restaurantsByArea}
            onChangeText={setRestaurantsByArea} // Update the state variable when the user types in the input field
        />
        {/* Add a button to trigger the API call with the new restaurant name */}
        <Button title="Get Partner Data By Area" onPress={retreivePartnerByArea} />

        <Text>
            all the partner data is immediately logged to the console. use the above input fields to retrieve specific partner data. Make sure to follow the steps of getting the bearer token first. 
        </Text>
      </View>
  
    )
}

const styles = StyleSheet.create({
  input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 10,
      paddingHorizontal: 10,
  },
});


export default FetchPartnerData;