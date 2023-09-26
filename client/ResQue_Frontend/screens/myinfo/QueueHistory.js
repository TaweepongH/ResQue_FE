import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import QueueHistoryList from '../../Components/QueueHistoryList';

const QueueHistory = () => {

  const userData = {
    firstName: 'John',
    lastName: 'Deer',
  }
    return (
        <View style={styles.container}>
          
          <View style={styles.infoContainer}>
            <QueueHistoryList 
              icon="history" 
              text="Edit profile" 
              screen="EditProfile" 
            />
            <QueueHistoryList icon="history" text="Queue History" screen="QueueHistory" />
            <QueueHistoryList icon="history" text="Log out" screen="Login" />
          </View>
          
        </View>
      );
};
    
const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 24,
      },
      user: {
        alignItems: 'center',
        marginBottom: 20,
      },
      userProfile: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 90,
        aspectRatio: 1,
        backgroundColor: "#CC313D",
        borderRadius: 45,
        marginBottom: 10,
      },
      profileText: {
        fontSize: 48,
        fontWeight: 'bold',
        color: "#FEEEEF",
      },
      userName: {
        fontSize: 24,
      },
      infoContainer: {
        flex: 1,
        alignItems: 'center',
      },
});
    
export default QueueHistory;
    
