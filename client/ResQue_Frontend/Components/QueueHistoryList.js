import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import IconMat from 'react-native-vector-icons/MaterialIcons';
const QueueHistoryList = ({ icon,text, button }) => {

    return (
      <View>
        <View style={styles.row}>
            <View style={styles.iconContainer}>
                <IconMat name={icon} size={35} color="#343434" style={styles.icon} />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.buttonText}>{text}</Text>
            </View>
            <View>        
            
              <View style={styles.button}>{button}</View>
            
            </View>
        </View>
      </View>
      );
}

const styles = StyleSheet.create({
    textContainer: {
      flex:1,
    },
    iconContainer: {
      justifyContent: 'flex-end',
      borderRadius: 5,
      borderColor: "#D9D9D9",
      marginBottom: 0,
      backgroundColor: 'white',
    },
    row: {
      flexDirection: 'row',
      paddingHorizontal: 15,
      backgroundColor:'white',
    },
    icon: {
        marginRight: 20,
    },
    button:{
      justifyContent:'flex-end',
    },
  });



export default QueueHistoryList;
