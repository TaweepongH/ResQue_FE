import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import renderButtons from './renderButtons';

const Main = () => {
  const [showMap, setShowMap] = useState(true);

  const location = [
    { id: 1, name: 'All' },
    { id: 2, name: 'Downtown' },
    { id: 3, name: 'Burnaby' },
    { id: 4, name: 'Richmond' },
    { id: 5, name: 'North Vancouver' },
    { id: 6, name: 'New Westminster' },
    { id: 7, name: 'Surrey' },
    { id: 8, name: 'Coquitlam' },
    { id: 9, name: 'More>' },
  ];

  const nearbyRestaurants = [
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
      address: '789 Oak St',
      distance: '1000',
      waitlist: 2,
      thumbnailImage: 'https://example.com/restaurant-c-thumbnail.jpg',
    },
    {
      id: 5,
      name: 'Restaurant E',
      address: '789 Oak St',
      distance: '1000',
      waitlist: 2,
      thumbnailImage: 'https://example.com/restaurant-c-thumbnail.jpg',
    },
    {
      id: 6,
      name: 'Restaurant F',
      address: '789 Oak St',
      distance: '1000',
      waitlist: 2,
      thumbnailImage: 'https://example.com/restaurant-c-thumbnail.jpg',
    },

  ];

  const handleAllowButtonPress = () => {
    setShowMap(false);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.locations}>
          <Text style={styles.subtitle}>Join waitlist for the best restaurants in</Text>
          <Text style={styles.title}>Vancouver</Text>
          {renderButtons(location)}
        </View>
        {showMap ? (
          <View style={styles.mapContainer}>
            <View>
              {/* FIXME: React Native icon insertion area. */}
              <Text style={styles.mapText}>
                Please allow location access to discover the best restaurants near me!
              </Text>
              <TouchableOpacity style={styles.allowButton} onPress={handleAllowButtonPress}>
                <Text style={styles.buttonText}>Allow</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.nearbyRestaurants}>
            <Text style={styles.sectionTitle}>Explore restaurants near me</Text>
            {nearbyRestaurants.map((restaurant) => (
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
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    marginTop: 50,
  },
  locations: {
    borderBottomColor: '#D9D9D9',
    borderBottomWidth: 5,
    paddingBottom: 15,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  mapContainer: {
    paddingHorizontal: 20,
    paddingVertical: 70,
    marginVertical: 20,
  },
  allowButton: {
    height: 35,
    width: 100,
    backgroundColor: '#CC313D',
    borderColor: '#797979',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 25,
  },
  buttonText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: 'white',
  },
  mapText: {
    fontSize: 16,
    marginTop: 40,
    alignSelf: 'center',
    textAlign: 'center',
  },
  nearbyRestaurants: {
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

export default Main;
