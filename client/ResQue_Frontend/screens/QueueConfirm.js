import React, {useEffect, useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import {useAuth } from '../contexts/AuthContext.js'
import { useNavigation } from '@react-navigation/native';
import { theme } from '../styles/theme.js';
theme

const QueueConfirm = () => {

  const {queData, bearerToken, rstrntData} = useAuth();

  const navigation = useNavigation();

  const suffixParse = (num) => {
    num = num.toString();
    const lastDigit = num.slice(-1);
  
    if (num.length >= 2 && num.slice(-2) === '11' || num.slice(-2) === '12' || num.slice(-2) === '13') {
      return 'th in line';
    }
  
    switch (lastDigit) {
      case '1':
        return 'st in line';
      case '2':
        return 'nd in line';
      case '3':
        return 'rd in line';
      default:
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
    navigation.navigate('Home');

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
          <QueueInfoItem label="Request" answer={`${queData.request}`} />
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
    paddingTop: 30,
    backgroundColor: theme.color.white,
  },
  container: {
    padding: 20,
    width: '85%',
    height: '60%',
    backgroundColor: theme.color.lightpink,
    borderRadius: 5,
    borderColor: theme.color.lightgray,
    borderWidth: 1,
  },
  currentQueue: {
    fontFamily: theme.font.secondary,
    lineHeight: 26,
    fontWeight: 'bold',
    fontSize: theme.fontsize.xxl,
    paddingBottom: 20,
  },
  queueNumber: {
    color: theme.color.red,
  },
  queueInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  queueInfoTxt: {
    color: theme.color.gray,
    marginRight: 10,
    fontSize: theme.fontsize.md,
    fontFamily: theme.font.secondary,
  },
  queueInfoAns: {
    color: theme.color.blackAlt,
    flex: 1,
    textAlign: 'right',
    fontSize: theme.fontsize.md,
    fontFamily: theme.font.secondary,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginBottom: 100,
    position: 'absolute',
    bottom: '0.5%',
  },
  button: {
    padding: 12,
    backgroundColor: theme.color.red,
    borderRadius: 10,
    width: '48%',
  },
  buttonText: {
    color: theme.color.white,
    fontSize: theme.fontsize.xl,
    textAlign: 'center',
    fontFamily: theme.font.primary,
  },
  btnCancel: {
    // Additional style for Cancel button
  },
  btnConfirm: {
    // Additional style for Confirm button
  },
});

export default QueueConfirm;
