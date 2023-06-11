import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import renderButtons from './Components/renderButtons';

const Main = () => {
  // FIX ME: test data(to be received from the backend later)
  const data = [
    { id: 1, name: 'All' },
    { id: 2, name: 'Vancouver' },
    { id: 3, name: 'Richmond' },
    { id: 4, name: 'Burnaby' },
    { id: 5, name: 'North Vancouver' },
    { id: 6, name: 'West Vancouver' },
    { id: 7, name: 'Coquitlam' },
    { id: 8, name: 'Surrey' },
    { id: 9, name: 'Delta' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Reservation BEST Restaurant</Text>
      <Text style={styles.title}>Vancouver</Text>
      {renderButtons(data)}
      <View style={styles.mapContainer}>
        <View>
          <Text style={styles.mapText}>
            If you use the location information right, you can see the restaurants around you.
          </Text>
          <TouchableOpacity style={styles.allowButton}>
            <Text style={styles.buttonText}>Allow</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 80,
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
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 20,
    paddingVertical: 70,
    marginVertical: 20,
  },
  mapText: {
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  allowButton: {
    height: 45,
    width: 90,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    alignSelf: 'center',
    marginTop: 30,
  },
});

export default Main;
