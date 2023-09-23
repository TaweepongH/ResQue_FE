import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext';
import CustomModal from './CustomModal.js';

const QueueRegistration = () => {

  const { rstrntData, bearerToken } = useAuth();

  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [adultCount, setAdultCount] = useState(0);
  const [childCount, setChildCount] = useState(0);
  const [request, setRequest] = useState('');
  const [loading, setLoading] = useState(false);

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

    createQue(bearerToken, rstrntData.id);

  };

  const navigation = useNavigation();

  const handleRestaurantDetail = () => {
    // When the "arrow-right" icon is pressed, it navigates to the 'restaurant info' page.
    navigation.navigate('RestaurantInfo');
  };

  const createQue = async (authToken, restuarantID) => {

    setLoading(true);

    const url = 'https://app-57vwexmexq-uc.a.run.app/api/queues/user/createqueue';

    try {

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: `Bearer ${authToken}`,
        }, 
        body: {
          "partnerId": `${restuarantID}`
        }
      });

      if (response.ok) {
        const data = await response.json();

        console.log("response msg from backend: ", data);

        // then we've got to navigate to the next page. 

      } else {
        console.log("response is not ok: ", response);
      }

    
    } catch (error) {
      console.log("error: ", error);
    }




  }


  useEffect(() => {
    console.log("partner data: ", rstrntData);
  }, [])

  // test data
  const restaurant = {
    id: rstrntData.id,
    name: rstrntData.name,
    address: rstrntData.address,
    distance: '200',
    waitlist: 3,
    thumbnailImage: rstrntData.thumbnailImage
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
