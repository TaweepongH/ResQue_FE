import React, { useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, TouchableHighlight, StyleSheet, ScrollView, Linking } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useAuth} from '../contexts/AuthContext.js'

const RestaurantInfo = ({ route }) => {

  const {rstrntData } = useAuth();

  useEffect(() => {
    console.log("r data", rstrntData);
  })

  const restaurant = {
    id: rstrntData.id,
    name: rstrntData.name,
    address: rstrntData.address,
    type: rstrntData.type,
    businessHours: `${rstrntData.businessHours[0][0]} - ${rstrntData.businessHours[0][1]}`,
    phoneNumber: rstrntData.phoneNumber,
    website: rstrntData.website,
    thumbnailImage: rstrntData.thumbnailImage,
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
        <View style={styles.infoContainer}>
          <EvilIcons name="location" size={20} color="#797979" style={{ marginBottom: 10 }}/>
          <Text style={styles.addressInfo}>{restaurant.address}</Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.infoContainer}>
          <FontAwesome name="cutlery" size={15} />
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoTitle}>Cuisine</Text>
            <Text style={styles.infoText}>{restaurant.type}</Text>
          </View>
        </View>
        <View style={styles.infoContainer}>
          <MaterialCommunityIcons name="clock-time-four-outline" size={15} />
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoTitle}>Business Hours</Text>
            <Text style={styles.infoText}>{restaurant.businessHours}</Text>
          </View>
        </View>
        <View style={styles.infoContainer}>
          <Ionicons name="call" size={15} />
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoTitle}>Call</Text>
            <Text style={styles.infoText}>{restaurant.phoneNumber}</Text>
          </View>
        </View>
        <View style={styles.infoContainer}>
          <MaterialCommunityIcons name="web" size={15} style={{ marginTop: -17 }}/>
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoTitle}>Website</Text>
            <TouchableHighlight underlayColor="transparent" onPress={handleOpenWebsite}>
              <Text style={styles.websiteLink}>{restaurant.website}</Text>
            </TouchableHighlight>
          </View>
        </View>
        <View style={styles.horizontalSeparator} />
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
    marginBottom: 10,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  infoText: {
    fontSize: 15,
  },
  separator: {
    width: 450,
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
    padding: 10,
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 30,
    marginBottom: 110,
  },
  joinQueueButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  horizontalSeparator: {
    position: 'absolute',
    borderBottomWidth: 6,
    borderBottomColor: '#D9D9D9',
    width: '100%',
    bottom: -3,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  infoTextContainer: {
    marginLeft: 5,
    marginTop: 20,
  },
});

export default RestaurantInfo;
