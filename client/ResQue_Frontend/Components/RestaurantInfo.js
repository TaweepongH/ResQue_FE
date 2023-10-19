import React, { useEffect } from 'react';

import { View, Text, Image, TouchableOpacity, TouchableHighlight, StyleSheet, ScrollView, Linking, Dimensions } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useAuth } from '../contexts/AuthContext.js';

import { theme } from '../styles/theme.js';
theme;
import { useNavigation } from '@react-navigation/native';

const RestaurantInfo = ({ route }) => {
  const {rstrntData } = useAuth();
  const navigation = useNavigation();

  useEffect(() => {
    console.log('r data', rstrntData);
  });

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
    navigation.navigate('QueueRegistration')
  };

  const handleOpenWebsite = () => {
    Linking.openURL(restaurant.website);
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: restaurant.thumbnailImage }} style={styles.restaurantImage} />
      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <Text style={styles.restaurantName}>{restaurant.name}</Text>
          <View style={styles.addressContainer}>
            <EvilIcons name="location" size={20} color={theme.color.gray} style={{ marginBottom: 10 }}/>
            <Text style={styles.addressInfo}>{restaurant.address}</Text>
          </View>
        </View>
        <View style={styles.separator} />
        <View style={styles.infoContainer}>
          <FontAwesome name="cutlery" size={20} style={styles.icons}/>
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoTitle}>Cuisine</Text>
            <Text style={styles.infoText}>{restaurant.type}</Text>
          </View>
        </View>
        <View style={styles.infoContainer}>
          <MaterialCommunityIcons name="clock-time-four-outline" size={20} style={styles.icons}/>
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoTitle}>Business Hours</Text>
            <Text style={styles.infoText}>{restaurant.businessHours}</Text>
          </View>
        </View>
        <View style={styles.infoContainer}>
          <Ionicons name="call" size={20}style={styles.icons} />
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoTitle}>Call</Text>
            <Text style={styles.infoText}>{restaurant.phoneNumber}</Text>
          </View>
        </View>
        <View style={styles.infoContainer}>
          <MaterialCommunityIcons name="web" size={20} style={styles.icons}/>
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoTitle}>Website</Text>
            <TouchableHighlight underlayColor="transparent" onPress={handleOpenWebsite}>
              <Text style={styles.websiteLink}>{restaurant.website}</Text>
            </TouchableHighlight>
          </View>
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.joinQueueButton} onPress={handleJoinQueue}>
            <Text style={styles.joinQueueButtonText}>Join a Queue!</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    flex: 1,
    padding: 12,
    marginTop: '60%',
    backgroundColor: theme.color.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  header: {
    paddingHorizontal: 8,
  },
  restaurantName: {
    fontFamily: theme.font.primary,
    fontSize: theme.fontsize.xxl,
    marginVertical: 10,
  },
  addressInfo: {
    fontFamily: theme.font.secondary,
    fontSize: theme.fontsize.sm,
    lineHeight: theme.fontsize.md,
    color: theme.color.gray,
    marginBottom: 10,
  },
  icons: {
    color:theme.color.blackAlt,
    marginTop: -2,
  },
  infoTitle: {
    fontFamily: theme.font.secondary,
    lineHeight: theme.fontsize.xl,
    fontSize: theme.fontsize.lg,
    fontWeight: 'bold',
    color: theme.color.blackAlt,
    marginBottom: 5,
  },
  infoText: {
    fontFamily: theme.font.secondary,
    lineHeight: theme.fontsize.lg,
    fontSize: theme.fontsize.md,
    color:theme.color.blackAlt,
  },
  separator: {
    borderBottomWidth: 5,
    borderBottomColor: theme.color.lightgray,
    position: 'relative', 
    width: Dimensions.get('window').width,
    left: -12,
    marginVertical:5,
  },
  websiteLink: {
    textDecorationLine: 'underline',
    fontSize: theme.fontsize.md,
    color:theme.color.blackAlt,
  },
  btnContainer: {
    alignItems: 'center',
  },
  joinQueueButton: {
    backgroundColor: theme.color.red,
    padding: 12,
    alignItems: 'center',
    borderRadius: 10,
    width: '100%',
    position: 'absolute', 
    bottom: -70,
  },
  joinQueueButtonText: {
    color: theme.color.white,
    fontSize: theme.fontsize.xl,
    fontFamily: theme.font.primary,
  },
  addressContainer: {
    flexDirection: 'row',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 5,
    marginTop: 16,
    paddingLeft: 8,
  },
  infoTextContainer: {
    marginLeft: 5,
  },
});

export default RestaurantInfo;
