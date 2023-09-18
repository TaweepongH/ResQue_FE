import React, { useState, useEffect, Fragment } from 'react';
import { View, Text, TextInput, StyleSheet, Image, ScrollView } from 'react-native';
import { useAuth } from '../contexts/AuthContext.js';
import Icon from 'react-native-vector-icons/Feather';
import CustomModal from '../Components/CustomModal.js';
import RestaurantList from '../Components/RestaurantList.js';

const Search = () => {
  const { partners } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    console.log("initial partner data: ", partners);
  }, []);

  useEffect(() => {
    console.log("Search Results : ", searchResults);
  }, [searchResults]);

  const handleFilter = (text) => {
    const filteredResults = partners.filter((restaurant) =>
      restaurant.companyName.toUpperCase().includes(text.toUpperCase())
    );

    setSearchTerm(text);
    setSearchResults(filteredResults);
  };

  return (
    <>
      <View style={styles.searchBar}>
        <Icon name="search" size={20} color="#797979" style={styles.icon} />
        <TextInput
          value={searchTerm}
          onChangeText={(newText) => handleFilter(newText)}
          placeholder="Search Restaurants"
          style={styles.input}
        />
      </View>

      <ScrollView>
        <RestaurantList names={searchResults} />
      </ScrollView>
    </>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
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


export default Search;