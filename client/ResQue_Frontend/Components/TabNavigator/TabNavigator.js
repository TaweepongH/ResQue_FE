import React from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import More from '../../screens/More';
import MyInfo from '../../screens/MyInfo';
import Search from '../../screens/Search';
import ResetPwd from '../../screens/ResetPwd';


// This is a placeholder for Main.js page. Should be deleted after merging Ari's task
const Main = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

const TabNavigator = () => {

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: '#CC313D',
        tabBarInactiveTintColor: '#1E1E1E',
        // Attention: You also might need to add a bottom margin to your content if you have a absolutely positioned tab bar.  src: https://reactnavigation.org/docs/bottom-tab-navigator
        tabBarStyle: { position: 'absolute', height: 80},
        tabBarLabelStyle: { marginBottom: 20, marginTop: -15 },
        headerStyle: {
          backgroundColor: '#F7C5CC',
        },
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerTitleAlign: 'center',
      }}
      
    >
      <Tab.Screen
        name="Home"
        component={Main}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="magnify" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="My Info"
        component={MyInfo}
        options={{
          tabBarLabel: 'My Info',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="More"
        component={More}
        options={{
          tabBarLabel: 'More',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="dots-horizontal" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  ); 
};

export default TabNavigator;