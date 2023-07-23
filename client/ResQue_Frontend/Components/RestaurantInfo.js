import React from 'react';
import { View, Text, Image, TouchableOpacity, TouchableHighlight, StyleSheet, ScrollView, Linking } from 'react-native';

const RestaurantInfo = ({ route }) => {
  const restaurant = {
    id: 1,
    name: 'Tacofino Taco Bar (Gastown)',
    address: '15 W Cordova St, Vancouver, BC V6B 1C8',
    type: 'Mexican',
    businessHours: '11:00 AM - 9:00 PM',
    phoneNumber: '(604) 899 - 7907',
    website: 'http://tacofino.com',
    thumbnailImage: 'https://cdn.pixabay.com/photo/2017/01/22/19/12/pizza-2000602_1280.jpg',
  };

  const handleJoinQueue = () => {
    console.log('Join a Queue button pressed');
    // TODO: Implement the logic for joining the queue.
  };

  const handleOpenWebsite = () => {
    Linking.openURL(restaurant.website);
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: restaurant.thumbnailImage }} style={styles.restaurantImage} />
      <ScrollView style={styles.contentContainer}>
        <Text style={styles.restaurantName}>{restaurant.name}</Text>
        <Text style={styles.addressInfo}>{restaurant.address}</Text>
        <View style={styles.separator} />
        <Text style={styles.infoTitle}>Cuisine</Text>
        <Text style={styles.infoText}>{restaurant.type}</Text>
        <Text style={styles.infoTitle}>Business Hours</Text>
        <Text style={styles.infoText}>{restaurant.businessHours}</Text>
        <Text style={styles.infoTitle}>Call</Text>
        <Text style={styles.infoText}>{restaurant.phoneNumber}</Text>
        <Text style={styles.infoTitle}>Website</Text>
        <TouchableHighlight underlayColor="transparent" onPress={handleOpenWebsite}>
          <Text style={styles.websiteLink}>{restaurant.website}</Text>
        </TouchableHighlight>
        <View style={styles.horizontalSeparator} />
        <TouchableOpacity style={styles.joinQueueButton} onPress={handleJoinQueue}>
          <Text style={styles.joinQueueButtonText}>Join a Queue!</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  restaurantImage: {
    height: '40%',
    width: '100%',
    position: 'absolute',
    top: 0,
  },
  contentContainer: {
    flex: 2,
    padding: 20,
    marginTop: '50%',
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  restaurantName: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  addressInfo: {
    fontSize: 13,
    color: '#797979',
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 5,
  },
  infoText: {
    fontSize: 15,
  },
  separator: {
    width:450,
    borderBottomWidth: 6,
    borderBottomColor: '#D9D9D9',
    marginStart: -30,
  },
  websiteLink: {
    fontSize: 16,
    textDecorationLine: 'underline',
    marginBottom: 15,
  },
  joinQueueButton: {
    backgroundColor: '#CC313D',
    padding: 12,
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 30,
    marginBottom: 110,
  },
  joinQueueButtonText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  horizontalSeparator: {
    position: 'absolute',
    borderBottomWidth: 6,
    borderBottomColor: '#D9D9D9',
    width: '100%',
    bottom: -3,
  },
});

export default RestaurantInfo;
