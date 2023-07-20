import { View, Text, TouchableOpacity , StyleSheet } from 'react-native';
import IconAnt from 'react-native-vector-icons/AntDesign';

const PwdResetComplete = () => {
  return (
    <View style={styles.container}>
    <View style={styles.items}>
        <IconAnt name="checkcircleo" size={50} color="#CC313D"/>
        <Text style={styles.txt_complete}>Reset Complete!</Text>
    </View>
       <TouchableOpacity style={styles.button}>
        <Text style={styles.text}>Return to Login</Text>
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
    width:'80%',
    alignItems:'center',
    marginTop:100,
    marginBottom:30,
  },
  txt_complete:{
    fontSize:25,
    marginTop:10,
  },
  button: {
    backgroundColor: '#CC313D',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:3,
    width:'90%',
    height:35,
  },
  text:{
    fontWeight:'bold',
    color:'white',
    textAlign:'center',
    fontSize:18,
  },
});



export default PwdResetComplete;