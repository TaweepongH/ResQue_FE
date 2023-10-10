import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext';
import { theme } from '../styles/theme';
import CustomButton from '../Components/CustomButton';

const CreateNewPwd = () => {
  const { email, confirmationCode } = useAuth();

  const [pwd, setPwd] = useState('');
  const [pwdConfirm, setPwdConfirm] = useState('');

  const navigation = useNavigation();

  const handlePwrdReset = async () => {
    if (pwd === pwdConfirm) {
      try {
        const response = await fetch(`https://app-57vwexmexq-uc.a.run.app/api/password/resetpassword`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
          body: JSON.stringify({
            email: email,
            confirmationCode: confirmationCode,
            password: pwd,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          Alert.alert('Success!', data.message);
          navigation.navigate('PwdResetComplete');
        } else {
          Alert.alert('Error', data.message || 'Password reset failed.');
        }
      } catch (error) {
        console.error('Error:', error);
        Alert.alert('Error', 'An error occurred while resetting the password.');
      }
    } else {
      Alert.alert('Passwords do not match');
    }
  };

  const setPwdValue = (value) => {
    console.log('value: ', value);
    setPwd(value);
  };

  const setPwdConfirmValue = (value) => {
    console.log('value: ', value);
    setPwdConfirm(value);
  };

  return (
    <View style={styles.container}>
      <View style={styles.items}>
        <Text style={styles.inputPw_txt}>Enter a new password</Text>
        <TextInput
          style={styles.infoInput}
          placeholder="Please enter 8 - 16 characters"
          onChangeText={setPwdValue}
          autoCapitalize="none"
        />
        <Text style={styles.inputPw_txt}>Confirm Password</Text>
        <TextInput
          style={styles.infoInput}
          placeholder="Please enter 8 - 16 characters"
          onChangeText={setPwdConfirmValue}
          autoCapitalize="none"
        />
      </View>
      <CustomButton title="Submit" onPress={handlePwrdReset} />
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
  inputPw_txt: {
    marginBottom: 5,
    fontSize: theme.fontsize.md,
    fontFamily: theme.font.secondary,
  },
  button: {
    backgroundColor: '#CC313D',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    width: '90%',
    marginTop: 20,
    height: 35,
  },
  text: {
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
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

export default CreateNewPwd;
