import React, { useState, useEffect, Fragment } from 'react';
import { View, Text, TextInput, StyleSheet, Image, ScrollView } from 'react-native';
import { useAuth } from '../contexts/AuthContext.js';
import Icon from 'react-native-vector-icons/Feather';
import CustomModal from '../Components/CustomModal.js';
import RestaurantList from '../Components/RestaurantList.js';

import { useRoute } from '@react-navigation/native';

// for now i've just mixed the searchbar into the search page to allow for slightly easier filtering

const Search = () => {

  
  // params from searchBar were innacurate when using useNavigation()
  // const route = useRoute();
  // const searchQuery = route.params || {};

  // useEffect(() => {
  //   console.log("search terms in Search: ", searchQuery);
  // }, [searchQuery])

  // use context seems to log data more accurately than useNavigation();
  const {bearerToken, query} = useAuth();

  useEffect(() => {
    console.log("query value: ", query);
    handleFilter(query);
  }, [query]);

  const [dataSet, setDataSet] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => { 

    setSearchResults('');

    const url = 'https://app-57vwexmexq-uc.a.run.app/api/partners/all';

    setLoading(true);

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: `Bearer ${bearerToken}`,
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        setDataSet(data);
        setLoading(false);
        console.log("data exists. data sample: ", dataSet[Math.floor(Math.random() * dataSet.length)])
      } else {
        console.log('Failed to fetch restaurant data, ', response);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  }


  useEffect(() => {
    // get our data set
    fetchData();
  }, [])

  useEffect(() => {
    console.log("Search Results : ", searchResults);
  }, [searchResults]);

  const handleFilter = (text) => {

    console.log("search term: ", text); // Log the current text

    setSearchTerm(text);

    const filteredResults = dataSet.filter((restaurant) =>
      restaurant.companyName.toUpperCase().includes(text.toUpperCase())
    );

    setSearchResults(filteredResults);

  };

  return (
    <>

      <ScrollView>
      
        <CustomModal visible={loading} message={`fetching data...`} marginTop={0} />
      
        { searchResults ? 
            searchResults.map((restaurant) => (
              <View key={restaurant.id} style={styles.restaurantItem}>
                <Image
                  source={{ uri: restaurant.images[0] }}
                  style={{ width: 100, height: 100, borderRadius: 10 }}
                />
                <View style={styles.textContainer}>
                  <Text style={styles.textCompanyName}>{restaurant.companyName}</Text>
                  <Text>
                    {restaurant.address[0]}, {restaurant.address[1]}
                  </Text>
                </View>
                <View style={styles.waitList}>
                  <Text style={styles.waitListText}></Text>
                </View>
              </View>
            ))
          : dataSet.map((restaurant) => (
            <View key={restaurant.id} style={styles.restaurantItem}>
              <Image
                source={{ uri: restaurant.images[0] }}
                style={{ width: 100, height: 100, borderRadius: 10 }}
              />
              <View style={styles.textContainer}>
                <Text style={styles.textCompanyName}>{restaurant.companyName}</Text>
                <Text>
                  {restaurant.address[0]}, {restaurant.address[1]}
                </Text>
              </View>
              <View style={styles.waitList}>
                <Text style={styles.waitListText}></Text>
              </View>
            </View>
          ))
        }
      </ScrollView>
    </>
  );
};


const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    marginTop: 20,
  },
  searchBar: {
    width: '100%',
    height: 40,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F7C5CC',
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
  selectedAreaText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  textCompanyName: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  restaurantItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  textContainer: {
    marginLeft: 10,
    flex: 1,
  },
  waitList: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    backgroundColor: '#CC313D',
    borderRadius: 20,
  },
  waitListText: {
    color: 'white',
    fontSize: 16,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});


export default Search;