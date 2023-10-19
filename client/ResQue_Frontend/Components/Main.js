import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
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

        <View style={styles.separator}/>
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
  separator: {
    borderBottomColor: theme.color.lightgray,
    borderBottomWidth: 5,
    width: Dimensions.get('window').width, 
    position: 'relative', 
    left: -12, 
    marginBottom: 10,
  },
  explore: {
    fontSize: theme.fontsize.xl,
    marginVertical: 10,
    fontFamily: theme.font.primary,
  },
});

export default Main;
