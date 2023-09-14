import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import renderButtons from './renderButtons';
import RestaurantList2 from './RestaurantList2';
import Map from './Map';

const Main = () => {
  const [showMap, setShowMap] = useState(true);
 const [selectedArea, setSelectedArea] = useState(null);
  const [buttonClicked, setButtonClicked] = useState(false); 
  const location = [
    { id: 1, name: 'Vancouver' },
    { id: 2, name: 'Downtown' },
    { id: 3, name: 'Burnaby' },
    { id: 4, name: 'Richmond' },
    { id: 5, name: 'North Vancouver' },
    { id: 6, name: 'New Westminster' },
    { id: 7, name: 'Surrey' },
    { id: 8, name: 'White Rock' },
    { id: 9, name: 'More >' },
  ];
 const handleButtonClick = (areaName) => {
    setSelectedArea(areaName); // Set the selected area
    setButtonClicked(true); // Set buttonClicked to true to display RestaurantList2
    setShowMap(false); // Hide the map when the button is clicked
  };
  return (
    <>

    <View style={styles.container}>
      <View style={styles.locations}>
        <Text style={styles.subtitle}>Join waitlist for the best restaurants in</Text>
        <Text style={styles.title}>{selectedArea}</Text>
        {renderButtons(location, handleButtonClick)} 
      </View>
         </View>
      <ScrollView>
      {showMap ? (
        <View style={styles.mapContainer}>
          <View>
            <Text style={styles.mapText}>
              Please allow location access to discover the best restaurants near me!
            </Text>
            <TouchableOpacity style={styles.allowButton} onPress={() => setShowMap(true)}>
              {/* Use setShowMap to hide the map */}
              <Text style={styles.buttonText}>Allow</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View>
          {/* If showMap is false, display Map */}
          <Map />
        </View>
      )}
      {/* Display RestaurantList2 */}
      <RestaurantList2 names={selectedArea}/>

 
  </ScrollView>
    </>
     
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
