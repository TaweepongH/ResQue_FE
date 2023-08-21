import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import IconAnt from 'react-native-vector-icons/AntDesign';
import IconMat from 'react-native-vector-icons/MaterialIcons';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import EditProfile from '../myinfo/EditProfile';
const Stack = createStackNavigator();
const InfoItem = ({ text, icon, screen }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate(screen);
  };

  return (

    <TouchableOpacity style={styles.infoItem} onPress={handlePress}>
      <IconMat name={icon} size={30} />
      <Text style={styles.txt_more}>{text}</Text>
      <IconAnt name="right" size={30} style={styles.arrow} />
    </TouchableOpacity>

  );
};

const MyinfoStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MyInfo" component={MyInfo} options={{ headerShown: false }} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
    </Stack.Navigator>
  );
};

const MyInfo = () => {
  return (
    <View style={styles.container}>
      <View style={styles.user}>
        <IconMat name="circle" size={90} color="#CC313D" />
        <Text style={styles.userName}>Jane Doe</Text>
      </View>
      <View style={styles.infoContainer}>
        <InfoItem icon="person-outline" text="Edit profile" screen="EditProfile" />
        <InfoItem icon="history" text="Queue History" screen="QueueHistory" />
        <InfoItem icon="logout" text="Log out" screen="Login" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({

  container: {
    marginTop: 20,
  },
  user: {
    alignItems: 'center',
    marginBottom: 20,
  },
  userName: {
    fontSize: 18,
  },
  infoContainer: {
    alignItems: 'center',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FEEEEF',
    width: '80%',
    height: 50,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  infoText: {
    fontSize: 18,
  },
  txt_more: {
    fontSize: 18,
  },
  arrow: {
    marginLeft: 10,
  },
});

export default MyinfoStack;

