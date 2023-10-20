import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useAuth } from '../contexts/AuthContext.js';
import { useRoute, useNavigation } from '@react-navigation/native';
import CustomModal from './CustomModal.js';
import { theme } from '../styles/theme';
import RestaurantItem from './RestaurantItem.js';

const RestaurantList = () => {
  const { bearerToken, setRstrntDataContext } = useAuth();

  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  const route = useRoute(); // Use useRoute() hook to access the route object

  const names = route.params?.names || 'Vancouver';

  useEffect(() => {
    fetchRestaurantData(names);
  }, [names]);

  const fetchRestaurantData = async (selectedArea) => {
    setLoading(true);

    if (!selectedArea) {
      return; // Don't fetch data if no area is selected
    }

    let url;

    if (selectedArea === 'All') {
      url = 'https://app-57vwexmexq-uc.a.run.app/api/partners/all';
    } else {
      url = `https://app-57vwexmexq-uc.a.run.app/api/partners/area/${selectedArea}`;
    }

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
        setRestaurants(data);
        setLoading(false);
      } else {
        console.log('Failed to fetch restaurant data, ', response);
      }
    } catch (error) {
      console.log('Error:', error);
    }
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

  return (
    <ScrollView>
      <View style={styles.container}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <CustomModal visible={loading} message={`Loading...`} marginTop={250} />
          </View>
        ) : (
          // Render restaurant data
          restaurants.map((restaurant) => (
            <RestaurantItem
              key={restaurant.id}
              restaurant={restaurant}
              onPress={() => {
                handleQuePress(restaurant);
              }}
            />
          ))
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  restaurantItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: theme.color.lightgray,
  },
  textContainer: {
    marginLeft: 10,
    flex: 1,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});

export default RestaurantList;
