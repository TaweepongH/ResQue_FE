import React, { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const RestaurantList = ({route}) => {

  // const { location } = route.params;

  const restaurants = [
    {
      id: 1,
      name: 'Restaurant A',
      address: '123 Main St',
      distance: '200',
      waitlist: 3,
      thumbnailImage: 'https://example.com/restaurant-a-thumbnail.jpg',
    },
    {
      id: 2,
      name: 'Restaurant B',
      address: '456 Elm St',
      distance: '500',
      waitlist: 5,
      thumbnailImage: 'https://example.com/restaurant-b-thumbnail.jpg',
    },
    {
      id: 3,
      name: 'Restaurant C',
      address: '789 Oak St',
      distance: '1000',
      waitlist: 2,
      thumbnailImage: 'https://example.com/restaurant-c-thumbnail.jpg',
    },
    {
      id: 4,
      name: 'Restaurant D',
      address: '567 Maple St',
      distance: '800',
      waitlist: 7,
      thumbnailImage: 'https://example.com/restaurant-d-thumbnail.jpg',
    },
    {
      id: 5,
      name: 'Restaurant E',
      address: '321 Pine St',
      distance: '350',
      waitlist: 4,
      thumbnailImage: 'https://example.com/restaurant-e-thumbnail.jpg',
    },
  ];

  return (
    <View style={styles.container}>
        <View style={styles.restaurantlist}>
        <Text>{location}</Text>
          {restaurants.map((restaurant) => (
            <View style={styles.restaurantContainer} key={restaurant.id}>
              <Image source={{ uri: restaurant.thumbnailImage }} style={styles.thumbnailImage} />
              <View>
                <Text style={styles.restaurantName}>{restaurant.name}</Text>
                <Text style={styles.restaurantInfo}>{restaurant.address}</Text>
                <Text style={styles.restaurantInfo}>{restaurant.distance}m from me</Text>
              </View>
              <View style={styles.waitlistContainer}>
                <View style={styles.waitlistBadge}>
                  <Text style={styles.waitlistText}>{restaurant.waitlist}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    marginTop: 50,
  },
  restaurantlist: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  restaurantContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  thumbnailImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  restaurantInfo: {
    fontSize: 12,
    color: '#777',
  },
  waitlistContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#CC313D',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 120,
  },
  waitlistText: {
    fontSize: 12,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default RestaurantList;
