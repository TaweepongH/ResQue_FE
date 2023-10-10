import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useAuth } from '../contexts/AuthContext.js';
import { useRoute, useNavigation } from '@react-navigation/native';
import CustomModal from './CustomModal.js';

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
            <CustomModal visible={loading} message={`fetching data...`} marginTop={250} />
          </View>
        ) : (
          // Render restaurant data
          restaurants.map((restaurant) => (
            <TouchableOpacity
              key={restaurant.id}
              onPress={() => {
                handleQuePress(restaurant);
              }}
            >
              <View style={styles.restaurantItem}>
                <Image source={{ uri: restaurant.images[0] }} style={{ width: 100, height: 100, borderRadius: 10 }} />
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
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    marginTop: 20,
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

export default RestaurantList;
