import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext.js';

const renderButton = (name) => {
  const navigation = useNavigation();
  const { bearerToken, password, setBearerTokenContext } = useAuth();
  
  var companyList;
  const handleButtonPress = () => {
    
    //alert('RenderButton Data: ' + name);
        const response = fetch(`https://app-57vwexmexq-uc.a.run.app/api/partners/area/${name}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                Authorization: `Bearer ${bearerToken}`,
            }
        })
        .then((response) => response.json())
        .then((data) => {
            if (data) {
                console.log(data[0].companyName);
                companyList = data;
            } else {
                console.log("there is no data from edit user data API...");
            }
        })
        .catch((error) => {
            console.log("Error, the error from the edit user data API is: ", error);
        })

    navigation.navigate('RestaurantList', { location: name });
  }

  return (
    <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
      <Text style={styles.buttonText}>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 48,
    backgroundColor: '#F7C5CC',
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 15,
    color: 'black',
    textAlign: 'center',
  },
});

export default renderButton;
