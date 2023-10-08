import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import IconAnt from 'react-native-vector-icons/AntDesign';
import { theme } from '../styles/theme';

const CustomButton = ({ title, onPress, style, icon }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <View style={styles.container}>
        {icon ? <IconAnt name={icon} size={22} style={styles.icon} /> : <></>}
        <Text style={styles.buttonText}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.color.red,
    borderRadius: 5,
    marginTop: 16,
    width: '80%',
    paddingVertical: 3,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10, 
  },
  buttonText: {
    width: '100%',
    textAlign: 'center',
    fontFamily: theme.font.secondary,    
    fontWeight: '500',
    color: theme.color.lightpink ,
    fontSize: theme.fontsize.lg,
    paddingBottom: 5,
  },
  icon: {
    color:'white',
    position: 'absolute',
    left: 10,
  },
});

export default CustomButton;
