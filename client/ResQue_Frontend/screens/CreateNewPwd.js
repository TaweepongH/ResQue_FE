import { View, Text, TextInput,TouchableOpacity , StyleSheet, Alert } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native'; 
import { useAuth } from '../contexts/AuthContext'

const CreateNewPwd = () => {

  const { email, confirmationCode } = useAuth();

  const [pwd, setPwd] = useState('');
  const [pwdConfirm, setPwdConfirm] = useState('');

  const navigation = useNavigation();

  const handlePwrdReset = () => {

    if (pwd === pwdConfirm) {
        console.log("email :", email);
        console.log("confirmationCode :", confirmationCode);

        fetch(`https://app-57vwexmexq-uc.a.run.app/api/password/resetpassword`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify({
        email: email,
        confirmationCode: confirmationCode,
        password: pwd
        }),
        }).then((response) => response.text())
        .then((data) => {

        console.log("data: ", data); 

        if (JSON.parse(data).message === "Password reset successful") {

            Alert.alert("Success! ", JSON.parse(data).message);
            navigation.navigate('PwdResetComplete');

        } else {
            Alert.alert("Error: ", JSON.parse(data).message);
        }
        
        }).catch((error) => {
        console.error('Error:', error);
        });

    } else {
        Alert.alert("Passwords do not match");
    }
    
  }

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

