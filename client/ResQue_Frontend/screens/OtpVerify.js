import OTPInputView from '@twotalltotems/react-native-otp-input';
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

const OtpVerify = () => {
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.informText}>Please enter the 5-digit code sent to your email</Text>
        <OTPInputView
          style={styles.otpInput}
          pinCount={5}
          autoFocusOnLoad={true}
          codeInputFieldStyle={styles.inputFieldStyle}
        />
        <TouchableOpacity style={styles.button} onPress={handleVerify}>
          <Text style={styles.buttonText}>Verify</Text>
        </TouchableOpacity>

        <View style={styles.resendContainer}>
          <Text style={styles.noCodeText}>Didn't get the code? </Text>
          <TouchableOpacity onPress={handleResend}>
            <Text style={styles.resendText}>Resend OTP</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const handleVerify = () => {
  // Implement your verification logic here
};

const handleResend = () => {
  // Implement your resend OTP logic here
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEEEEF',
  },
  contentContainer: {
    alignItems: 'center',
    marginTop:80,
  },
  informText: {
    fontSize: 16,
    marginBottom: 20,
  },
  otpInput: {
    width: '70%',
    height: 50,
  },
  inputFieldStyle: {
    width: 30,
    height: 30,
    backgroundColor: 'white',
    borderColor:'grey',
  },
  button: {
    backgroundColor: '#CC313D',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    width: '80%',
    height: 40,
    marginTop: 20,
  },
  buttonText: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 18,
  },
  resendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  noCodeText: {
    color: 'grey',
  },
  resendText: {
    color: '#CC313D',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    marginLeft: 5,
  },
});

export default OtpVerify;

