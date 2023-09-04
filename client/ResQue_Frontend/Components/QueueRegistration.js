import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const QueueRegistration = () => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [adultCount, setAdultCount] = useState(0);
  const [childCount, setChildCount] = useState(0);
  const [request, setRequest] = useState('');

  const handleDecreaseAdult = () => {
    if (adultCount > 0) {
      setAdultCount(adultCount - 1);
    }
  };

  const handleIncreaseAdult = () => {
    setAdultCount(adultCount + 1);
  };

  const handleDecreaseChild = () => {
    if (childCount > 0) {
      setChildCount(childCount - 1);
    }
  };

  const handleIncreaseChild = () => {
    setChildCount(childCount + 1);
  };

  const handleSubmit = () => {
    console.log('Form submitted!');
    console.log('Name:', name);
    console.log('Phone Number:', phoneNumber);
    console.log('Adult Count:', adultCount);
    console.log('Child Count:', childCount);
    console.log('Request:', request);
  };

  const navigation = useNavigation();

  const handleRestaurantDetail = () => {
    // When the "arrow-right" icon is pressed, it navigates to the 'restaurant info' page.
    navigation.navigate('RestaurantInfo');
  };

  // test data
  const restaurant = {
    id: 1,
    name: 'Tacofino Taco Bar (Gastown)',
    address: '123 Main St',
    distance: '200',
    waitlist: 3,
    thumbnailImage: 'https://cdn.pixabay.com/photo/2017/01/22/19/12/pizza-2000602_1280.jpg',
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.restaurantContainer} key={restaurant.id}>
          <Image source={{ uri: restaurant.thumbnailImage }} style={styles.thumbnailImage} />
          <View style={styles.restaurantInfoContainer}>
            <View style={styles.restaurantInfoHeader}>
              <Text style={styles.restaurantName}>{restaurant.name}</Text>
              <TouchableOpacity style={styles.detailButton} onPress={handleRestaurantDetail}>
                <SimpleLineIcons name="arrow-right" size={20} style={{ marginTop: 10 }}/>
              </TouchableOpacity>
            </View>
            <View style={styles.restaurantInfoRow}>
              <FontAwesome name="location-arrow" size={11} style={{ marginRight: 5 }} />
              <Text style={styles.restaurantInfo}>{restaurant.distance}m from me</Text>
            </View>
            <Text style={styles.restaurantInfo}>{restaurant.address}</Text>
          </View>
        </View>
        <View style={styles.separator} />
        <Text style={styles.titles}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
        />
        <Text style={styles.titles}>Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your phone number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
        <Text style={styles.titles}>Please select the number of visitors</Text>
        <View style={styles.counterContainer}>
          <Text style={styles.counterLabel}>Adult</Text>
          <TouchableOpacity style={styles.counterButton} onPress={handleDecreaseAdult}>
            <Text style={styles.counterButtonText}>-</Text>
          </TouchableOpacity>
          <View style={styles.counterValueContainer}>
            <Text style={styles.counterValue}>{adultCount}</Text>
          </View>
          <TouchableOpacity style={styles.counterButton} onPress={handleIncreaseAdult}>
            <Text style={styles.counterButtonText}>+</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.counterContainer}>
          <Text style={styles.counterLabel}>Child (under the age of 5)</Text>
          <TouchableOpacity style={styles.counterButton} onPress={handleDecreaseChild}>
            <Text style={styles.counterButtonText}>-</Text>
          </TouchableOpacity>
          <View style={styles.counterValueContainer}>
            <Text style={styles.counterValue}>{childCount}</Text>
          </View>
          <TouchableOpacity style={styles.counterButton} onPress={handleIncreaseChild}>
            <Text style={styles.counterButtonText}>+</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.titles}>Request</Text>
        <TextInput
          style={styles.requestInput}
          placeholder="You can write up to 50 characters maximum."
          multiline
          value={request}
          onChangeText={setRequest}
        />
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Apply</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 50,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  separator: {
    width: 400,
    borderBottomWidth: 6,
    borderBottomColor: '#D9D9D9',
    marginStart: -30,
  },
  titles: {
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },
  counterLabel: {
    flex: 1,
  },
  counterButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  counterButtonText: {
    fontSize: 20,
  },
  counterValueContainer: {
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterValue: {
    fontSize: 20,
    textAlign: 'center',
  },
  requestInput: {
    height: 80,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#CC313D',
    padding: 10,
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 30,
    marginBottom: 100,
  },
  submitButtonText: {
    color: "white",
    fontSize: 20,
    fontWeight: 'bold',
  },
  restaurantContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 15,
  },
  thumbnailImage: {
    width: 60,
    height: 60,
    borderRadius: 5,
    marginRight: 10,
  },
  restaurantInfoContainer: {
    flex: 1,
  },
  restaurantInfoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  restaurantName: {
    marginBottom: 5,
  },
  restaurantInfo: {
    fontSize: 12,
    color: '#777',
  },
  restaurantInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
});

export default QueueRegistration;
