import { View, Text, TextInput,TouchableOpacity , StyleSheet, Alert } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native'; 
import { useAuth } from '../contexts/AuthContext'

const ResetPwd = () => {

  const { setEmailContext } = useAuth();

  const [email, setEmail] = useState('');

  const navigation = useNavigation();

  const handlePwrdReset = () => {
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
      setEmailContext(email);
      Alert.alert(data);
      navigation.navigate('OtpVerify');
      
    }).catch((error) => {
      console.error('Error:', error);
    });
  }

  const setEmailValue = (value) => {
    console.log("value: ", value);
    setEmail(value);
  }

  return (
    <View style={styles.container}>
    <View style={styles.items}>
    <Text style={styles.inputEmail_txt}>Please enter your email</Text>
        <TextInput 
          style={styles.infoInput}placeholder='helloitsme@example.com'
          onChangeText={setEmailValue}
        />
       <TouchableOpacity style={styles.button} onPress={handlePwrdReset}>
        <Text style={styles.text}>Send One-Time Password</Text>
      </TouchableOpacity>
    </View>
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
    marginTop:30,
    marginBottom:30,
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



export default ResetPwd;

