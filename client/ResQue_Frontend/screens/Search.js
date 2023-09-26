import React, { useState, useEffect, Fragment } from 'react';
import { View, Text, TextInput, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useAuth } from '../contexts/AuthContext.js';
import Icon from 'react-native-vector-icons/Feather';
import CustomModal from '../Components/CustomModal.js';

import { useNavigation } from '@react-navigation/native';

const Search = () => {

  // use context seems to log data more accurately than useNavigation();
  const {bearerToken, query, setRstrntDataContext} = useAuth();

  const navigation = useNavigation();

  const [dataSet, setDataSet] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [typed, setTyped] = useState(false);

  const fetchData = async () => { 

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

  const handleFilter = (text) => {

    const filteredResults = dataSet.filter((restaurant) =>
      restaurant.companyName.toUpperCase().includes(text.toUpperCase())
    );

    setSearchResults(filteredResults);

  };

  const handleQuePress = (restaurantData) => {


    console.log("restaurant data: ", restaurantData);

    const parseBusinessHours = (array) => {

      const parsedArray = [];

      array.forEach((business) => {
        parsedArray.push([business.start, business.end]);
      })

      return parsedArray

    }

    setRstrntDataContext({
      id: restaurantData.id,
      name: restaurantData.companyName,
      address: restaurantData.address[0],
      thumbnailImage: restaurantData.images[0],
      type: restaurantData.genre,
      businessHours: parseBusinessHours(restaurantData.operationTime),
      phoneNumber: restaurantData.phone,
      website: restaurantData.email
    });

    navigation.navigate('QueueRegistration')

  }

  useEffect(() => {
    // get our data set
    fetchData();
  }, [])

  useEffect(() => {
    console.log("query value: ", query);
    handleFilter(query);
  }, [query]);

  useEffect(() => {

    // we have to check for both the searchResults and the query state because even if there is a query and no searchresults we shouldn't be displaying the dataset, that should only be displayed when nothing is in the input 
    if (searchResults.length > 0 || query.length > 0) {
      setTyped(true);
    } else {
      setTyped(false);
    }
  }, [searchResults, query])

  return (
    <>

      <ScrollView>
      
        <CustomModal visible={loading} message={`fetching data...`} marginTop={0} />
      
        { typed ? 
            searchResults.map((restaurant) => (
              <TouchableOpacity key={restaurant.id} onPress={ () => {
                handleQuePress(restaurant);
              }}
              >
                <View style={styles.restaurantItem}>
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
                    <Text style={styles.waitListText}>{restaurant.queueCount}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          : dataSet.map((restaurant) => (
            <TouchableOpacity key={restaurant.id} onPress={ () => {
              handleQuePress(restaurant);
            }}
            >
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
                  <Text style={styles.waitListText}>{restaurant.queueCount}</Text>
                </View>
              </View>
            </TouchableOpacity>
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