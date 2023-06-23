import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import IconAnt from 'react-native-vector-icons/AntDesign';

const CustomButton = ({ title, onPress, style, icon }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <View style={styles.container}>
        <IconAnt name={icon} size={30} style={styles.icon} />
        <Text style={styles.buttonText}>{title}</Text>
      </View>
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
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  buttonText: {
    color: '#FEEEEF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  icon: {
    marginRight: 10,
    color:'white',
  },
});

export default CustomButton;


