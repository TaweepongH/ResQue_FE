import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import renderButtons from './renderButtons';

const Main = () => {
  // FIX ME: test data(to be received from the backend later)
  const data = [
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

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Join waitlist for the best restaurants in</Text>
      <Text style={styles.title}>Vancouver</Text>
      {renderButtons(data)}
      <View style={styles.mapContainer}>
        <View style={styles.borderTop} />
        <View style={styles.locationContainer}>
          <Image
            source={require('../src/img/maps-and-flags.png')}
            style={styles.locationIcon}
          />
          <Text style={styles.mapText}>
            Please allow location access to discover the best restaurants near me!
          </Text>
        </View>
        <TouchableOpacity style={styles.allowButton}>
          <Text style={styles.buttonText}>Allow</Text>
        </TouchableOpacity>
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
    paddingHorizontal: 20,
    paddingVertical: 70,
    marginVertical: 20,
  },
  borderTop: {
    borderTopWidth: 5,
    borderTopColor: '#D9D9D9',
    position: 'absolute',
    top: 0,
    left: -10,
    right: -10,
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
    marginTop: 20,
  },
  buttonText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: 'white',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  mapText: {
    fontSize: 16,
    marginTop: 40,
    alignSelf: 'center',
    textAlign: 'center',
  },
  locationIcon: {
    width: 37,
    height: 37,
    marginRight: 5,
    position: 'absolute',
    left: '50%',
    top: '-20%',
    marginLeft: -18.5,
  },
});

export default Main;
