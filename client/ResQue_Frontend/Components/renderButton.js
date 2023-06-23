import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const renderButton = (name) => {
  return (
    <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText}>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 48,
    backgroundColor: '#F7C5CC',
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 15,
    color: 'black',
    textAlign: 'center',
  },
});

export default renderButton;