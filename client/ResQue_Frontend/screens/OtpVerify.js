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
  const handleSubmit = async () => {
    const enteredOTP = otp.join('');
    console.log('Entered OTP:', enteredOTP);
  
    try {
      const response = await fetch(`https://app-57vwexmexq-uc.a.run.app/api/password/verifycode`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify({
          email: email,
          confirmationCode: enteredOTP
        }),
      });
  
      if (response.ok) {
        const data = await response.text();
        console.log("data: ", data);
        
        setConfirmationCodeContext(enteredOTP);
        Alert.alert("Success! ", JSON.parse(data).message);
        navigation.navigate('CreateNewPwd');
      } else {
        const data = await response.text();
        console.error("Error response data:", data);
        Alert.alert("Error", JSON.parse(data).message);
      }
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error", "An error occurred while resetting the password.");
    }
  };

  const OTPResend = async () => {
    try {
      const response = await fetch(`https://app-57vwexmexq-uc.a.run.app/api/password/forgotpassword`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify({
          email: email,
        }),
      });
  
      const data = await response.text();
      console.log("data: ", data);
  
      if (response.ok) {
        Alert.alert("Code Resent to: ", `${email}`);
      } else {
        Alert.alert("Error", JSON.parse(data).message);
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert("Error", "An error occurred while resending the code.");
    }
  };
  
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
    aspectRatio: 1,
    marginLeft: 20,
    borderWidth: 1, // Border width
    borderRadius: 5,
    borderColor:'grey',
    backgroundColor: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500'
  },
  // inputFieldStyle: {
  //   width: 30,
  //   height: 30,
  //   backgroundColor: 'white',
  //   borderColor:'grey',
  // },
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

