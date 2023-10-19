import React, { useState, useEffect, Fragment } from 'react';
import { StyleSheet,ScrollView } from 'react-native';
import { useAuth } from '../contexts/AuthContext.js';
import CustomModal from '../Components/CustomModal.js';
import { useNavigation } from '@react-navigation/native';
import RestaurantItem from '../Components/RestaurantItem.js';

const Search = () => {
  // use context seems to log data more accurately than useNavigation();
  const { bearerToken, query, setRstrntDataContext } = useAuth();

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
        console.log('data exists. data sample: ', dataSet[Math.floor(Math.random() * dataSet.length)]);
      } else {
        console.log('Failed to fetch restaurant data, ', response);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const handleFilter = (text) => {
    const filteredResults = dataSet.filter((restaurant) =>
      restaurant.companyName.toUpperCase().includes(text.toUpperCase())
    );

    setSearchResults(filteredResults);
  };

  const handleQuePress = (restaurantData) => {
    console.log('restaurant data: ', restaurantData);

    const parseBusinessHours = (array) => {
      const parsedArray = [];

      array.forEach((business) => {
        parsedArray.push([business.start, business.end]);
      });

      return parsedArray;
    };

    setRstrntDataContext({
      id: restaurantData.id,
      name: restaurantData.companyName,
      address: restaurantData.address[0],
      thumbnailImage: restaurantData.images[0],
      type: restaurantData.genre,
      businessHours: parseBusinessHours(restaurantData.operationTime),
      phoneNumber: restaurantData.phone,
      website: restaurantData.email,
    });

    navigation.navigate('QueueRegistration');
  };

  useEffect(() => {
    // get our data set
    fetchData();

  }, []) 
  useEffect(() => {
    console.log('query value: ', query);
    handleFilter(query);
  }, [query]);

  useEffect(() => {
    // we have to check for both the searchResults and the query state because even if there is a query and no searchresults we shouldn't be displaying the dataset, that should only be displayed when nothing is in the input
    if (searchResults.length > 0 || query.length > 0) {
      setTyped(true);
    } else {
      setTyped(false);
    }
  }, [searchResults, query]);

  return (
    <>
      <ScrollView style={styles.container}>
        <CustomModal visible={loading} message={`Loading...`} marginTop={0} />
        {typed
          ? searchResults.map((restaurant) => <RestaurantItem restaurant={restaurant} onPress={handleQuePress} />)
          : dataSet.map((restaurant) => <RestaurantItem restaurant={restaurant} onPress={handleQuePress} />)}

      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
  },
});

export default Search;
