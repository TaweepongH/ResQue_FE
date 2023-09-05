import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import IconMat from 'react-native-vector-icons/MaterialIcons';
import { createStackNavigator } from '@react-navigation/stack';
import EditProfile from '../myinfo/EditProfile';
import { useAuth } from '../../contexts/AuthContext.js';
import ListItem from '../../Components/ListItem';

const Stack = createStackNavigator();

const MyinfoStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="MyInfo" component={MyInfo} options={{ headerShown: false }} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
    </Stack.Navigator>
  );
};

const MyInfo = () => {

  const { bearerToken, setBearerTokenContext } = useAuth();

  const [userData, setUserData] = useState({});

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
      retrieveCurrentUserData()
  }, []);

  const handleLogout = () => {

    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: () => {
            // The bearerToken will be set to a blank string, changing the user state to false in the app.tsx file. When the user state is false the Login Page is shown
            setBearerTokenContext('');
          },
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.user}>
        <View style={styles.userProfile}>
          {/* TODO: change the initial to uppercase */}
          <Text style={styles.profileText}>{userData.firstName}{userData.lastName}</Text> 
        </View>
        <Text style={styles.userName}>{userData.firstName} {userData.lastName}</Text>
      </View>
      <View style={styles.infoContainer}>
        <ListItem icon="person-outline" text="Edit profile" screen="EditProfile" />
        <ListItem icon="history" text="Queue History" screen="QueueHistory" />
        <ListItem icon="logout" text="Log out" screen="Login" onPress={() => handleLogout()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 24,
  },
  user: {
    alignItems: 'center',
    marginBottom: 20,
  },
  userProfile: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 90,
    aspectRatio: 1,
    backgroundColor: "#CC313D",
    borderRadius: 45,
    marginBottom: 10,
  },
  profileText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: "#FEEEEF",
  },
  userName: {
    fontSize: 24,
  },
  infoContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default MyinfoStack;

