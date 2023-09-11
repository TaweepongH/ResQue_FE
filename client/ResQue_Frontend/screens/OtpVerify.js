// import OTPInputView from '@twotalltotems/react-native-otp-input';
// the above import wasn't able to log or store data, I had to use basic textInputs instead
import { useState, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, TextInput, Alert } from 'react-native';
import { useAuth } from '../contexts/AuthContext'
import { useNavigation } from '@react-navigation/native'; 

const OtpVerify = () => {

  // the user's email is needed for the verification api call
  const { email, setConfirmationCodeContext } = useAuth();

  const [otp, setOTP] = useState(['', '', '', '', '']); // Initialize an array to store OTP values
  const inputRefs = useRef([]);

  const navigation = useNavigation()
  
  // Function to handle OTP input changes
  const handleOTPChange = (text, index) => {
    if (text.length <= 1) {
      const newOTP = [...otp];
      newOTP[index] = text;
      setOTP(newOTP);
      if (text.length === 1 && index < otp.length - 1) {
        // Move focus to the next input field
        inputRefs.current[index + 1].focus();
      }
    }
  };

  // Function to handle OTP submission (you can customize this)
  const handleSubmit = () => {
    const enteredOTP = otp.join('');
    console.log('Entered OTP:', enteredOTP);

    fetch(`https://app-57vwexmexq-uc.a.run.app/api/password/verifycode`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({
      email: email,
      confirmationCode: enteredOTP
    }),
  }).then((response) => 
    
      response.text()
  
    )
    .then((data) => {

      console.log("data: ", data);
      
      if (JSON.parse(data).message === "Confirmation code is valid") {

        setConfirmationCodeContext(enteredOTP)
        Alert.alert("Success! ", JSON.parse(data).message);
        navigation.navigate('CreateNewPwd');

      } else {
        Alert.alert("error: ", JSON.parse(data).message);
      }
      
    }).catch((error) => {
      console.error('Error:', error);
    });

  };

  const OTPResend = () => {
    fetch(`https://app-57vwexmexq-uc.a.run.app/api/password/forgotpassword`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({
      email: email,
    }),
  }).then((response) => response.text())
    .then((data) => {

      console.log("data: ", data); 

      if (JSON.parse(data).message === "Password reset email sent") {

        Alert.alert("Code Resent to: ", `${email}`);

      } else {
        Alert.alert(JSON.parse(data).message);
      }
      
      
    }).catch((error) => {
      console.error('Error:', error);
    });
  }
  
  const handleResend = () => {
    OTPResend();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.informText}>Please enter the 5-digit code sent to your email</Text>
      <View style={styles.contentContainer}>
      
        {otp.map((value, index) => (
        <TextInput
          key={index}
          style={styles.otpInput}
          onChangeText={(text) => handleOTPChange(text, index)}
          value={value}
          maxLength={1}
          keyboardType="numeric"
          ref={(input) => {
            inputRefs.current[index] = input;
          }}
        />
        ))}
      </View>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Verify</Text>
        </TouchableOpacity>

        <View style={styles.resendContainer}>
          <Text style={styles.noCodeText}>Didn't get the code? </Text>
          <TouchableOpacity onPress={handleResend}>
            <Text style={styles.resendText}>Resend OTP</Text>
          </TouchableOpacity>
        </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEEEEF',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  contentContainer: {
    alignItems: 'center',
    marginTop:20,
    flexDirection: 'row',
    borderColor: 'red',
    justifyContent: 'space-around'
  },
  informText: {
    fontSize: 16,
    marginTop: 40,
  },
  otpInput: {
    width: '10%',
    height: 40,
    marginLeft: 20,
    borderWidth: 1, // Border width
    borderRadius: 5,
    borderColor:'grey',
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

