import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Dimensions,
} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext';
import CustomModal from './CustomModal.js';
import { theme } from '../styles/theme';

const QueueRegistration = () => {
  const { rstrntData, bearerToken, setQueDataContext } = useAuth();

  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [adultCount, setAdultCount] = useState(0);
  const [childCount, setChildCount] = useState(0);
  const [request, setRequest] = useState('');
  const [loading, setLoading] = useState(false);
  const [partySize, setPartySize] = useState(0);

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

  useEffect(() => {
    setPartySize(childCount + adultCount);
    setRequest(request);
  }, [handleDecreaseAdult, handleDecreaseChild, handleIncreaseAdult, handleIncreaseChild]);

  const handleSubmit = () => {
    console.log('Form submitted!');
    console.log('Name:', name);
    console.log('Phone Number:', phoneNumber);
    console.log('Adult Count:', adultCount);
    console.log('Child Count:', childCount);
    console.log('Request:', request);

    createQue();
  };

  const createQue = async () => {
    setLoading(true);

    const url = 'https://app-57vwexmexq-uc.a.run.app/api/queues/user/createqueue';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: `Bearer ${bearerToken}`,
        },
        body: JSON.stringify({
          partnerId: rstrntData.id,
        }),
      });

      if (response.ok) {
        const data = await response.json();

        setLoading(false);

        console.log('response msg from backend: ', data);
        const updatedDataContext = {
          ...data,
          partySize,
          request,
        };

        setQueDataContext(updatedDataContext);
        navigation.navigate('QueueConfirm');

        // then we've got to navigate to the next page.
      } else {
        console.error('API request failed:', response.status, response);

        if (response.status === 400) {
          Alert.alert('You are already in line. Please check your que history in the MyInfo tab.');
        }

        setLoading(false);
      }
    } catch (error) {
      console.error('Network error:', error);
      // Handle network-related errors
      Alert.alert('Network error:', error);
    }
  };

  const handleRestaurantDetail = () => {
    // When the "arrow-right" icon is pressed, it navigates to the 'restaurant info' page.
    navigation.navigate('RestaurantInfo');
  };

  const restaurant = {
    id: rstrntData.id,
    name: rstrntData.name,
    address: rstrntData.address,
    waitlist: 3,
    thumbnailImage: rstrntData.thumbnailImage,
    type: rstrntData.type,
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity key={restaurant.id} onPress={handleRestaurantDetail}>
        <View style={styles.restaurantItem}>
          <Image source={{ uri: restaurant.thumbnailImage }} style={{ width: 65, height: 65, borderRadius: 5 }} />
          <View style={styles.textContainer}>
            <Text style={styles.textCompanyName}>{restaurant.name}</Text>
            <Text style={styles.textAddress}>
              {restaurant.type} &#183; {restaurant.address}
            </Text>
          </View>
          <SimpleLineIcons name="arrow-right" size={20} />
        </View>
      </TouchableOpacity>
      <View style={styles.separator} />
      <Text style={styles.titles}>Name</Text>
      <TextInput style={styles.input} placeholder="Enter your name" value={name} onChangeText={setName} />
      <Text style={styles.titles}>Phone number</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your phone number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />

      <CustomModal visible={loading} message={'Queing you up'}></CustomModal>

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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 12,
    backgroundColor: theme.color.white,
  },
  separator: {
    borderBottomWidth: 5,
    borderBottomColor: theme.color.lightgray,
    position: 'relative',
    width: Dimensions.get('window').width,
    left: -12,
  },
  restaurantItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  textCompanyName: {
    fontSize: theme.fontsize.xl,
    fontFamily: theme.font.secondary,
    color: theme.color.blackAlt,
    lineHeight: theme.fontsize.xl,
  },
  textAddress: {
    fontFamily: theme.font.secondary,
    fontsize: theme.fontsize.lg,
    color: theme.color.gray,
  },
  textContainer: {
    marginLeft: 10,
    flex: 1,
  },
  titles: {
    fontFamily: theme.font.secondary,
    marginTop: 12,
    fontSize: theme.fontsize.md,
  },
  input: {
    height: 40,
    borderColor: theme.color.gray,
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginVertical: 8,
    fontFamily: theme.font.secondary,
    lineHeight: theme.fontsize.lg,
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    paddingTop: 10,
  },
  counterLabel: {
    flex: 1,
    fontFamily: theme.font.secondary,
    lineHeight: theme.fontsize.lg,
    fontSize: theme.fontsize.md,
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
    fontSize: theme.fontsize.lg,
  },
  counterValueContainer: {
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterValue: {
    fontSize: theme.fontsize.xl,
    textAlign: 'center',
  },
  requestInput: {
    height: 80,
    borderColor: theme.color.gray,
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 10,
    paddingHorizontal: 10,
    textAlignVertical: 'top',
    fontFamily: theme.font.secondary,
    lineHeight: theme.fontsize.lg,
  },
  submitButton: {
    backgroundColor: theme.color.red,
    padding: 12,
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 30,
  },
  submitButtonText: {
    color: theme.color.white,
    fontSize: theme.fontsize.xl,
    fontFamily: theme.font.primary,
  },
});

export default QueueRegistration;
