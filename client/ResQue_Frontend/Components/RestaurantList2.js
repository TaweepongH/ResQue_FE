import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { useAuth } from '../contexts/AuthContext.js';

const RestaurantList2 = ({ route, navigation }) => {
  const { bearerToken, password, setBearerTokenContext } = useAuth();
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch restaurant data when the component mounts
    fetchRestaurantData();
  }, []);

  const fetchRestaurantData = async () => {
    try {
      const response = await fetch(
        'https://app-57vwexmexq-uc.a.run.app/api/partners/area/Vancouver',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            Authorization: `Bearer ${bearerToken}`,
          },
        }
      );

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

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        {restaurants.map((restaurant) => (
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
              <Text style={styles.waitListText}>{restaurant.waitlist}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    marginTop: 50,
  },
  textCompanyName: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  restaurantItem: {
    flexDirection: 'row', // Align items horizontally
    alignItems: 'center', // Vertically center items
    marginBottom: 10, // Add some margin between restaurant items
  },
  textContainer: {
    marginLeft: 10, // Add spacing between image and text
    flex: 1, // Allow text to take up remaining space
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
});

export default RestaurantList2;
