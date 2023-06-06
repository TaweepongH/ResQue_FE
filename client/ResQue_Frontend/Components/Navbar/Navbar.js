import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const Navbar = () => {
  // const navigation = useNavigation();

  // const navigateToScreen = (screenName) => {
  //   navigation.navigate(screenName);
  // };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconContainer}>
        <Icon name="home-outline" size={24} color="#000" />
        <Text style={styles.iconText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer}>
        <Icon name="search-outline" size={24} color="#000" />
        <Text style={styles.iconText}>Search</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer}>
        <Icon name="person-outline" size={24} color="#000" />
        <Text style={styles.iconText}>My Info</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer}>
        <Icon name="ellipsis-horizontal-outline" size={24} color="#000" />
        <Text style={styles.iconText}>More</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#D9D9D9',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
  },
  iconContainer: {
    alignItems: 'center',
  },
  iconText: {
    fontSize: 12,
    marginTop: 4,
  },
});

export default Navbar;