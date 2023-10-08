import { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext.js';
import { theme } from '../styles/theme';

const renderButton = (name) => {

  const navigation = useNavigation();
  const { bearerToken, password, setBearerTokenContext } = useAuth();

  const handleButtonPress = async () => {
    try {
       console.log("renderButton/ selected Area is ",name);
        navigation.navigate('Home', { screen:'RestaurantList2', names: name});
      // Fetch data for the selected area using the 'name'
      const response = await fetch(`https://app-57vwexmexq-uc.a.run.app/api/partners/area/${name}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: `Bearer ${bearerToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data) {
          console.log(data[0].companyName);
        } else {
          console.log("There is no data from the API...");
        }
      } else {
        console.log("Failed to fetch data from the API.", response.status);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
      <Text style={styles.buttonText}>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 48,
    backgroundColor: theme.color.pink,
    borderWidth: 1,
    borderColor: theme.color.lightgray,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: theme.font.secondary,
    fontSize: theme.fontsize.md,
    color: theme.color.blackAlt,
    textAlign: 'center',
    lineHeight: 18,
  },
});

export default renderButton;

