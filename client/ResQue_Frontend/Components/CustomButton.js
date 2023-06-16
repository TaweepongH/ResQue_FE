import React from 'react';
import { Text, StyleSheet, TouchableOpacity, Image } from 'react-native';


const CustomButton = ({ title, onPress, style, icon }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
        <Image source={icon} style={styles.login_logo} />
        <Text style={styles.buttonText}>{title}</Text> 
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#CC313D',
    borderRadius: 4,
    marginTop: 10,
    width: '80%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FEEEEF',
    marginLeft: 10, 
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CustomButton;

