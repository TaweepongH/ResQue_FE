import { View, Text, TextInput,TouchableOpacity , StyleSheet, Alert } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native'; 
import { useAuth } from '../contexts/AuthContext'

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
          Alert.alert("Success!", data.message);
          navigation.navigate('PwdResetComplete');
        } else {
          Alert.alert("Error", data.message || "Password reset failed.");
        }
      } catch (error) {
        console.error("Error:", error);
        Alert.alert("Error", "An error occurred while resetting the password.");
      }
    } else {
      Alert.alert("Passwords do not match");
    }
  };
        
  const setPwdValue = (value) => {
    console.log("value: ", value);
    setPwd(value);
  }

  const setPwdConfirmValue = (value) => {
    console.log("value: ", value);
    setPwdConfirm(value);
  }

  return (
    <View style={styles.container}>
    <View style={styles.items}>
    <Text style={styles.inputEmail_txt}>Password</Text>
    <TextInput 
          style={styles.infoInput}placeholder='Please enter 8 - 16 characters'
          onChangeText={setPwdValue}
    />
    </View>
    <View style={styles.items}>
    <Text style={styles.inputEmail_txt}>Confirm Password</Text>
    <TextInput 
          style={styles.infoInput}placeholder='Please enter 8 - 16 characters'
          onChangeText={setPwdConfirmValue}
    />
    </View>
    <TouchableOpacity style={styles.button} onPress={handlePwrdReset}>
        <Text style={styles.text}>Submit</Text>
    </TouchableOpacity>
    
    </View>
  );
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#FEEEEF',
    alignItems: 'center',
  },
  items:{
    width:'90%',
    alignItems:'center',
    marginTop:15,
    marginBottom:10,
  },
  inputEmail_txt:{
    width:'88%',
  },
  button: {
    backgroundColor: '#CC313D',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:3,
    width:'90%',
    marginTop:20,
    height:35,
  },
  text:{
    fontWeight:'bold',
    color:'white',
    textAlign:'center',
    fontSize:18,
  },
  infoInput: {
    backgroundColor: 'white',
    borderRadius: 5,
    marginTop:10,
    padding: 10,
    width: '90%',
  },
});



export default CreateNewPwd;

