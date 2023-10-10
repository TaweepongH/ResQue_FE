import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext';
import { theme } from '../styles/theme';
import CustomButton from '../Components/CustomButton';

const ResetPwd = () => {
  const { setEmailContext } = useAuth();

  const [email, setEmail] = useState('');

  const navigation = useNavigation();

  const handlePwrdReset = async () => {
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

      if (response.ok) {
        const data = await response.json();
        console.log('data: ', data);
        setEmailContext(email);
        Alert.alert('Account Found', `An email has been sent to ${email}`);
        navigation.navigate('OtpVerify');
      } else {
        // Handle non-OK responses here, e.g., show an appropriate error message
        const errorData = await response.json(); // Parse error response as JSON
        console.error('Error response:', errorData);
        Alert.alert('Error', `An error occurred: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An error occurred while resetting the password.');
    }
  };

  const setEmailValue = (value) => {
    console.log('value: ', value);
    setEmail(value);
  };

  return (
    <View style={styles.container}>
      <View style={styles.items}>
        <Text style={styles.inputEmail_txt}>Please enter your email</Text>
        <TextInput
          style={styles.infoInput}
          placeholder="helloitsme@example.com"
          onChangeText={setEmailValue}
          autoCapitalize="none"
        />
      </View>
      <CustomButton title="Send One-Time Password" onPress={handlePwrdReset} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.color.lightpink,
    alignItems: 'center',
  },
  items: {
    width: '80%',
    marginTop: 20,
  },
  inputEmail_txt: {
    marginBottom: 5,
    fontSize: theme.fontsize.md,
    fontFamily: theme.font.secondary,
  },
  infoInput: {
    backgroundColor: theme.color.white,
    borderColor: theme.color.gray,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingTop: 5,
    paddingBottom: 10,
    marginBottom: 12,
    width: '100%',
    fontFamily: theme.font.secondary,
    fontSize: theme.fontsize.md,
  },
});

export default ResetPwd;
