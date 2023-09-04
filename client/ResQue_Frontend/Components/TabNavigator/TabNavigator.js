import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import More from '../../screens/More';
import MyInfo from '../../screens/myinfo/MyInfo';
import Search from '../../screens/Search';
import Main from '../Main.js';
import TermsPolicies from '../../screens/more/TermsPolicies';
// import Settings from '../../screens/Settings';

import SearchBar from '../SearchBar';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: '#CC313D',
        tabBarInactiveTintColor: '#1E1E1E',
        // Attention: You also might need to add a bottom margin to your content if you have a absolutely positioned tab bar.  src: https://reactnavigation.org/docs/bottom-tab-navigator
        tabBarStyle: { position: 'absolute', height: 80, borderTopWidth: 1, },
        tabBarLabelStyle: { marginTop: -5 },
        headerStyle: {
          backgroundColor: '#F7C5CC',
          height: 110,
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 24
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
          headerTitle: (props) => <SearchBar {...props} />,
          headerStyle: {backgroundColor: '#F7C5CC', height: 120}
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