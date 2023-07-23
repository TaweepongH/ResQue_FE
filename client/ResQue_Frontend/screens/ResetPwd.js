import { View, Text, TextInput,TouchableOpacity , StyleSheet } from 'react-native';

const ResetPwd = () => {
  return (
    <View style={styles.container}>
    <View style={styles.items}>
    <Text style={styles.inputEmail_txt}>Please enter your email</Text>
        <TextInput style={styles.infoInput}placeholder='hellowitsme@example.com'/>
       <TouchableOpacity style={styles.button}>
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

