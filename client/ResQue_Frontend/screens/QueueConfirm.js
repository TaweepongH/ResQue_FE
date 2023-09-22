import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const QueueConfirm = () => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <Text style={styles.currentQueue}>
          Currently <Text style={styles.queueNumber}>7</Text>th in queue!
        </Text>
        <QueueInfoItem label="Restaurant Name" answer="answer" />
        <QueueInfoItem label="Party size" answer="answer" />
        <QueueInfoItem label="Estimated wait time" answer="answer" />
        <QueueInfoItem label="Request" answer="This is an answer for the request" />
      </View>
      <View style={styles.buttons}>
        <QueueButton text="Cancel Queue" style={styles.btnCancel} />
        <QueueButton text="Confirm" style={styles.btnConfirm} />
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

const QueueButton = ({ text, style }) => {
  return (
    <TouchableOpacity style={[styles.button, style]}>
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
