import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { useAuth } from '../contexts/AuthContext.js';
import { useRoute } from '@react-navigation/native';

const RestaurantList = () => {
  const { bearerToken } = useAuth();
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const route = useRoute(); // Use useRoute() hook to access the route object

  // Check if route.params and route.params.names are defined
  const names = route.params?.names;

  useEffect(() => {
    console.log("RestaurantList2 / selectedArea is ", names);
    // Fetch restaurant data when the component mounts and when 'names' changes
    fetchRestaurantData(names);
  }, [names]); // Add 'names' as a dependency

 const fetchRestaurantData = async (selectedArea) => {
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
      console.log('Failed to fetch restaurant data');
    }
  } catch (error) {
    console.log('Error:', error);
  }
};


  return (
    <ScrollView>
      <View style={styles.container}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <Text>Loading... {names}</Text>
          </View>
        ) : (
          // Render restaurant data
          restaurants.map((restaurant) => (
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

