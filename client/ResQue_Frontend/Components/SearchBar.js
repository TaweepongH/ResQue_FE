import { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useAuth } from '../contexts/AuthContext.js';
import CustomModal from './CustomModal.js';




const SearchBar = () => {

  const { partners } = useAuth();

  useEffect(() => {
    console.log("initial partner data: ", partners);
  }, [])


  const handleFilter = (searchTerm) => {

    setPartnerDataContext(
      partners.filter((restaurant) => {
        restaurant.companyName.toUpperCase().includes(searchTerm.toUpperCase())
      })
    )

    console.log("partners: ", partners);

  }
 
  return (
        <View style={styles.searchBar}>
          <Icon name="search" size={20} color="#797979" style={styles.icon} />
          
            <TextInput 
              value={''}
              onChangeText={(newText) => {
                console.log(newText); // newText contains the updated text
                handleFilter(newText) // Optionally, you can update your state with the new text
              }}
              placeholder='Search Restaurants' 
              style={styles.input}
              multiline
            />

        </View>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    width: '100%',
    height: 40,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'white',
    borderWidth: 0.3,
    borderRadius: 5,
    borderColor: '#DADADA',
    paddingHorizontal: 10,
  },
  icon: {
    paddingRight: 10,
  },
  input: {
    width: '90%',
    fontSize: 16,
  },
});

export default SearchBar;