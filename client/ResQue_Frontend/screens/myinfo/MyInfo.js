import React, { useEffect, useState } from 'react';
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

  const [bearerToken, setBearerToken] = useState();
  const [userData, setUserData] = useState({});

  const obtainBearerToken = () => {
    fetch('https://app-57vwexmexq-uc.a.run.app/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        }, 
        // Use the 'body' property to send data as JSON
        body: JSON.stringify({
            "email": "hello@hii.com",
            "password": "999999999"
        })
    })
    .then((response) => response.text())
    .then((data) => {
        if (data) {
            console.log("there is data from the login API! it is: ", data);
            setBearerToken(JSON.parse(data).accessToken);
        } else {
            console.log("there is no data from the login API...");
        }
    })
    .catch((error) => {
        console.log("error from the login API is: ", error);
    })
  }

  const retrieveCurrentUserData = () => {

      if (bearerToken) {
          fetch('https://app-57vwexmexq-uc.a.run.app/api/users/current', {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json; charset=utf-8',
                  Authorization: `Bearer ${bearerToken}`,
              },
          })
          .then((response) => response.json())
          .then((data) => {
              if (data) {
                  console.log("there is data from the current user API! it is: ", data);
                  setUserData(data);
              } else {
                  console.log("there is no data from the current user API...");
              }
          })
          .catch((error) => {
              console.log("error from the current user API fetch is: ", error);
          });
      }
  }

  useEffect( () => {
    obtainBearerToken();
  }, []);

  useEffect( () => {
      retrieveCurrentUserData()
  }, [bearerToken]);


  return (
    <View style={styles.container}>
      <View style={styles.user}>
        <IconMat name="circle" size={90} color="#CC313D" />
        <Text style={styles.userName}>{userData.firstName} {userData.lastName}</Text>
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

