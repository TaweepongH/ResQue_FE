import React, {useEffect, useState} from 'react';
import { View, Modal, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { theme } from '../styles/theme';

// this is our loading/spinning animation

const CustomModal = ({ visible, message, marginTop }) => {

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => {}} 
    >
      <View style={styles.modalContainer}>
      <View style={[styles.modalContent, { marginTop: marginTop }]}>
          <ActivityIndicator size="large" color={theme.color.red} />
          <Text style={styles.loadingText}>{message}</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: theme.color.white,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: theme.fontsize.md,
    color: theme.color.blackAlt,
    fontFamily: theme.font.secondary,
  },
});

export default CustomModal;