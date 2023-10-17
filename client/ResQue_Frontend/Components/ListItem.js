import { View, Text, TouchableOpacity, StyleSheet,Linking } from 'react-native';
import IconAnt from 'react-native-vector-icons/AntDesign';
import IconMat from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../styles/theme';
theme;

const ListItem = ({ text, icon, screen, onPress }) => {
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
          <TouchableOpacity style={styles.row} onPress={handlePress}>
            <IconMat name={icon} size={35} color={theme.color.blackAlt} style={styles.icon} />
            <Text style={styles.buttonText}>{text}</Text>

            {!(screen == "version") ?
            <IconAnt name="right" size={30} style={styles.arrow} />
            : <View style={{width:30}}></View>}
          </TouchableOpacity>
        </View>
      );
}

const styles = StyleSheet.create({
    button: {
      justifyContent: 'center',
      backgroundColor: theme.color.lightpink,
      width: '90%',
      height: 55,
      marginBottom: 20,
      borderWidth: 0.5,
      borderRadius: 5,
      borderColor: theme.color.lightgray,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 15,
    },
    icon: {
        marginRight: 10,
    },
    buttonText: {
      fontFamily: theme.font.secondary,
      fontSize: theme.fontsize.xl,
      lineHeight: theme.fontsize.xxl,
      color: theme.color.blackAlt,
    },
    arrow: {
      color: theme.color.blackAlt,
      marginLeft: 'auto',
    },
  });


  export default ListItem;