import { View, Text, TouchableOpacity, StyleSheet,Linking } from 'react-native';
import IconAnt from 'react-native-vector-icons/AntDesign';
import IconMat from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const QueueHistoryList = ({ text, icon, screen, onPress }) => {
    const navigation = useNavigation();

    const handlePress = () => {
        if(onPress){
            onPress();
        }
        else if(screen == "iosSettings") {
            Linking.openURL('app-settings:');
        } else if(screen == "version"){
            return null;
        } else {
            navigation.navigate(screen);
        }
    };

    return (

      <View>
        <View style={styles.row}>
                    <View style={styles.iconContainer}>
                        <IconMat name={icon} size={35} color="#343434" style={styles.icon} />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.buttonText}>{text}</Text>
                    </View>
                </View>
        
      </View>
      );
}

const styles = StyleSheet.create({
    container: {
      // justifyContent: 'flex-start',
      // alignItems: 'flex-start',
      
      // width: '25%',
      // height: 55,
      
      // borderWidth: 0.5,
      // borderRadius: 5,
      // borderColor: "#D9D9D9",
    },
    textContainer: {
      justifyContent: 'flex-end',
      alignItems: 'center'
    },
    iconContainer: {
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      borderRadius: 5,
      borderColor: "#D9D9D9",
      marginBottom: 0,
      backgroundColor: 'white',
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 15,
    },
    icon: {
        marginRight: 20,
    },
    buttonText: {
      fontSize: 20,
      color: "#343434",
    },
    // arrow: {
    //   color: "#343434",
    //   marginLeft: 'auto',
    // },
  });


  export default QueueHistoryList;