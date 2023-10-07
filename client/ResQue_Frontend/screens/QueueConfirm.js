import React, {useEffect, useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import {useAuth } from '../contexts/AuthContext.js'
import { useNavigation } from '@react-navigation/native';

const QueueConfirm = () => {

  const {queData, bearerToken, rstrntData} = useAuth();

  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    console.log("que data: ", queData);
  }, [])

  const suffixParse = (num) => {
    num = num.toString(); // Convert to string and assign back to num
    const numArray = num.split(''); // Split the string into an array of characters
  
    if (numArray[0] === '1' && !numArray[1] || numArray[numArray.length - 1] === '1') {
      return 'st in line';
    } else if (numArray[0] === '2' || numArray[numArray.length -1] === '2') {
      return 'nd in line';
    } else if (numArray[0] === '3' || numArray[numArray.length -1] === '3') {
      return 'rd in line';
    } else {
      return 'th in line';
    }
  };

  const cancelQue = async () => {

    const url = "https://app-57vwexmexq-uc.a.run.app/api/queues/user/cancelqueue"

    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: `Bearer ${bearerToken}`,
        },
        body: JSON.stringify({
          partnerId: rstrntData.id,
        })
      });

      if (response.ok) {
        const data = await response.json();
        console.log("response from backend: ", data);
      } else {
        console.log("error: ", response.status);
      }
    } catch (error) {
      console.error("Network error: ", error);
    }


  }

  const handleCancel = () => {
    // we need to use the cancelQue api here

    Alert.alert(
      'Confirm Changes',
      'Are you sure you want to exit the que?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: async () => {

              try {
          
                cancelQue();
                      
                  
              } catch (error) {
                  Alert.alert(error);
                  console.error('Error editing user data:', error);
              }

              navigation.navigate('Home');

          },
          style: 'destructive',
        },
      ],
      { cancelable: false }
  );

    

    console.log('cancel');
  }

  const handleConfirm = () => {
    
    console.log("confirm");
    navigation.navigate('RestaurantInfo')
    
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <Text style={styles.currentQueue}>
          Currently <Text style={styles.queueNumber}>{`${queData.queueNo}`}</Text>{suffixParse(queData.queueNo)}
        </Text>
        <View style={styles.queueInfo}>
          <QueueInfoItem label="Restaurant Name" answer={`${queData.partner[0].companyName}`} />
          <QueueInfoItem label="Party size" answer={`${queData.partySize}`} />
          <QueueInfoItem label="Estimated wait time" answer={`${queData.queueNo * Math.floor(Math.random() * 5) + 5}`} />
          <View>
            <Text style={styles.queueInfoTxt}>Request</Text>
            <Text>This is an answer for the request</Text>
          </View>
        </View>
      </View>
      <View style={styles.buttons}>
        <QueueButton text="Cancel Queue" style={styles.btnCancel} onPress={handleCancel} />
        <QueueButton text="Confirm" style={styles.btnConfirm} onPress={handleConfirm} />
      </View>
    </View>
  );
};

const QueueInfoItem = ({ label, answer }) => {
  return (
    <View style={styles.queueInfoItem}>
      <Text style={styles.queueInfoTxt}>{label}</Text>
      <Text style={styles.queueInfoAns}>{answer}</Text>
    </View>
  );
};

const QueueButton = ({ text, style, onPress }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
  },
  container: {
    padding: 20,
    width: '85%',
    height: '50%',
    backgroundColor: '#FEEEEF',
    borderRadius: 5,
    borderColor: '#D3D3D3',
    borderWidth: 1,
  },
  currentQueue: {
    fontWeight: 'bold',
    fontSize: 22,
    paddingBottom:10,
  },
  queueNumber: {
    color: '#CC313D',
  },
  queueInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  queueInfoTxt: {
    color: 'grey',
    marginRight: 10,
  },
  queueInfoAns: {
    color: 'black',
    flex: 1,
    textAlign: 'right',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '85%',
    marginBottom: 100,
  },
  button: {
    padding: 15,
    backgroundColor: '#CC313D',
    borderRadius: 5,
    width: 150,
    height: 50,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 17,
    textAlign: 'center',
  },
  btnCancel: {
    // Additional style for Cancel button
  },
  btnConfirm: {
    // Additional style for Confirm button
  },
});

export default QueueConfirm;
