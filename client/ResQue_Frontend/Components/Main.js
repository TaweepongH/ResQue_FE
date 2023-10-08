import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, Dimensions } from 'react-native';
import renderButtons from './renderButtons';
import RestaurantList from './RestaurantList';
import { theme } from '../styles/theme';

const Main = () => {

  const [selectedArea, setSelectedArea] = useState('');  

  const location = [
    { id: 1, name: 'All' },
    { id: 2, name: 'Vancouver' },
    { id: 3, name: 'Burnaby' },
    { id: 4, name: 'Richmond' },
    { id: 5, name: 'North Vancouver' },
    { id: 6, name: 'New Westminster' },
    { id: 7, name: 'Surrey' },
    { id: 8, name: 'White Rock' },
    { id: 9, name: 'Delta' },
  ];


  return (
    <>
    
      <ScrollView style={styles.container}>
        <View style={styles.locations}>
          <Text style={styles.subtitle}>Join waitlist for the best restaurants in</Text>
          <Text style={styles.title}>Vancouver</Text>
          {renderButtons(location)}
        </View>
        <View style={styles.line}/>
       <Text style={styles.explore}>Explore restaurants near me</Text>
        <RestaurantList names={selectedArea} />  
      </ScrollView>
      
    </>   
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    marginTop: 50,
    width: '100%',
  },
  locations: {
    marginVertical: 10,
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
    fontFamily: theme.font.primary,
  },
  subtitle: {
    fontSize: theme.fontsize.md,
    marginTop: 14,
    marginBottom: 8,
    fontFamily: theme.font.primary,
  },
  line: {
    borderBottomColor: theme.color.lightgray,
    borderBottomWidth: 5,
    width: Dimensions.get('window').width, 
    position: 'relative', 
    left: -10, 
    marginBottom: 10,
  },
  explore: {
    fontSize: theme.fontsize.xl,
    marginVertical: 10,
    fontFamily: theme.font.primary,
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
  // mapText: {
  //   fontSize: 16,
  //   marginTop: 40,
  //   alignSelf: 'center',
  //   textAlign: 'center',
  // },
  // nearbyRestaurants: {
  //   marginTop: 20,
  // },
  // sectionTitle: {
  //   fontSize: 20,
  //   fontWeight: 'bold',
  //   marginBottom: 10,
  // },
  // restaurantContainer: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   marginBottom: 20,
  // },
  // thumbnailImage: {
  //   width: 60,
  //   height: 60,
  //   borderRadius: 30,
  //   marginRight: 10,
  // },
  // restaurantName: {
  //   fontSize: 16,
  //   fontWeight: 'bold',
  // },
  // restaurantInfo: {
  //   fontSize: 12,
  //   color: '#777',
  // },
  // waitlistContainer: {
  //   width: 30,
  //   height: 30,
  //   borderRadius: 15,
  //   backgroundColor: '#CC313D',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   marginLeft: 120,
  // },
  // waitlistText: {
  //   fontSize: 12,
  //   color: 'white',
  //   fontWeight: 'bold',
  // },
});

export default Main;
