import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import EditProfile from '../myinfo/EditProfile';
import { useFocusEffect, useRoute, useNavigation } from '@react-navigation/native';
import { useAuth } from '../../contexts/AuthContext.js';
import ListItem from '../../Components/ListItem';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import QueueHistory from './QueueHistory';
import { theme } from '../../styles/theme';

const Stack = createStackNavigator();

const MyinfoStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="MyInfo" component={MyInfo} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="QueueHistory" component={QueueHistory} />
    </Stack.Navigator>
  );
};

export const getMyInfoTabHeaderTitle = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'My Info';
  switch (routeName) {
    case 'MyInfo':
      return 'My Info';
    case 'EditProfile':
      return 'Edit Profile';
    case 'QueueHistory':
      return 'Queue History';
  }
};

const MyInfo = ({ navigation: { navigate } }) => {
  const { bearerToken, setBearerTokenContext } = useAuth();

  const [userData, setUserData] = useState({});

  const retrieveCurrentUserData = async () => {
    if (bearerToken) {
      try {
        const response = await fetch('https://app-57vwexmexq-uc.a.run.app/api/users/current', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            Authorization: `Bearer ${bearerToken}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          if (data) {
            console.log('there is data from the current user API! it is: ', data);
            setUserData(data);
          } else {
            console.log('there is no data from the current user API...');
          }
        } else {
          console.log('HTTP error from the current user API:', response.status);
        }
      } catch (error) {
        console.error('Error from the current user API fetch:', error);
      }
    }
  };

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          await retrieveCurrentUserData();
        } catch (error) {
          console.log('error calling the fetch current Data function.');
        }
      };

      fetchData();
    }, [])
  );

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
  };

  return (
    <View style={styles.container}>
      <View style={styles.user}>
        <View style={styles.userProfile}>
          <Text style={styles.profileText}>
            {userData.firstName ? userData.firstName[0].toUpperCase() : ''}
            {userData.lastName ? userData.lastName[0].toUpperCase() : ''}
          </Text>
        </View>
        <Text style={styles.userName}>
          {userData.firstName} {userData.lastName}
        </Text>
      </View>
      <View style={styles.infoContainer}>
        <ListItem
          icon="person-outline"
          text="Edit profile"
          screen="EditProfile"
          onPress={() => navigate('EditProfile', userData)}
        />
        <ListItem icon="history" text="Queue History" screen="QueueHistory" />
        <ListItem icon="logout" text="Log out" screen="Login" onPress={() => handleLogout()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.color.white,
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
    backgroundColor: theme.color.red,
    borderRadius: 45,
    marginBottom: 10,
  },
  profileText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: theme.color.lightpink,
  },
  userName: {
    fontSize: theme.fontsize.xxl,
    fontFamily: theme.font.secondary,
    lineHeight: theme.fontsize.xxl,
  },
  infoContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default MyinfoStack;
