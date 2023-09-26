import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';

const QueueHistory = () => {

  const userData = {
    firstName: 'John',
    lastName: 'Deer',
  }
    return (
        <View style={styles.container}>
          <View style={styles.user}>
            <View style={styles.userProfile}>
              <Text style={styles.profileText}>
                {userData.firstName ? userData.firstName[0].toUpperCase() : ''}
                {userData.lastName ? userData.lastName[0].toUpperCase()  : ''}
              </Text> 
            </View>
            <Text style={styles.userName}>{userData.firstName} {userData.lastName}</Text>
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
    
