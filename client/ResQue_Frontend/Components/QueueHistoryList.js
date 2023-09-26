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
        <View style={styles.button}>
          
            <IconMat name={icon} size={35} color="#343434" style={styles.icon} />
            <Text style={styles.buttonText}>{text}</Text>

            {/* {!(screen == "version") ?
            <IconAnt name="right" size={30} style={styles.arrow} />
            : <View style={{width:30}}></View>}
           */}
        </View>
      );
}

const styles = StyleSheet.create({
    button: {
      justifyContent: 'center',
      backgroundColor: '#FEEEEF',
      width: '90%',
      height: 55,
      marginBottom: 20,
      borderWidth: 0.5,
      borderRadius: 5,
      borderColor: "#D9D9D9",
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