import { View, Text , TouchableOpacity, StyleSheet, Linking } from 'react-native';
import IconAnt from 'react-native-vector-icons/AntDesign';
import IconMat from 'react-native-vector-icons/MaterialIcons';

const SettingItem = ({ text,icon, isRedirecting }) => {

  return (
    <View style={styles.btn_more}>
      <TouchableOpacity 
        style={styles.row} 
        onPress={() => {
          isRedirecting ? Linking.openURL('app-settings:') : null
        }}
      >
        <IconMat name={icon} size={30}/>
        <Text style={styles.txt_more}>{text}</Text>
        { isRedirecting ? 
          <IconAnt name="right" size={30} style={styles.arrow} /> 
          : <Text></Text> }
      </TouchableOpacity>
    </View>
  );
};

const Settings = () => {
  return (
    <View style={styles.container}>
      <SettingItem icon="location-pin" text="Location Services" isRedirecting={true}/>
      <SettingItem icon="notifications-active" text="Notifications" isRedirecting={true} />
      <SettingItem icon="info-outline" text="Version 1.1" isRedirecting={false}/>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn_more: {
    justifyContent: 'center',
    backgroundColor: '#FEEEEF',
    width: '90%',
    height: 50,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  txt_more: {
    fontSize: 18,
  },
  arrow: {
    marginLeft: 10,
  },
});

export default Settings;

