import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import IconAnt from 'react-native-vector-icons/AntDesign';
import IconMat from 'react-native-vector-icons/MaterialIcons';

const InfoItem = ({ text, icon }) => {
  return (
    <TouchableOpacity style={styles.infoItem}>
      <IconMat name={icon} size={30} />
      <Text style={styles.infoText}>{text}</Text>
      <IconAnt name="right" size={30} style={styles.arrow} />
    </TouchableOpacity>
  );
};

const MyInfo = ({ userName }) => {
  return (
    <View style={styles.container}>
      <View style={styles.user}>
        <IconMat name="circle" size={90} color="#CC313D" />
        <Text style={styles.userName}>Jane Doe</Text>
      </View>
      <View style={styles.infoContainer}>
        <InfoItem icon="person-outline" text="Edit profile" />
        <InfoItem icon="history" text="Queue History" />
        <InfoItem icon="logout" text="Log out" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  user: {
    alignItems: 'center',
    marginBottom: 20,
  },
  userName: {
    fontSize: 18,
  },
  infoContainer: {
    alignItems: 'center',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FEEEEF',
    width: '90%',
    height: 50,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  infoText: {
    fontSize: 18,
  },
  arrow: {
    marginLeft: 10,
  },
});

export default MyInfo;

