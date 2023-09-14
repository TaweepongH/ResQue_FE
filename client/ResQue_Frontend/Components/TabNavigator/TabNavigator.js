import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import More, { getMoreTabHeaderTitle }from '../../screens/More';
import MyInfo, { getMyInfoTabHeaderTitle } from '../../screens/myinfo/MyInfo';
import Search from '../../screens/Search';
import Main from '../Main.js';
import SearchBar from '../SearchBar';
import IconAnt from 'react-native-vector-icons/AntDesign';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const navigation = useNavigation();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: '#CC313D',
        tabBarInactiveTintColor: '#1E1E1E',
        // Attention: You also might need to add a bottom margin to your content if you have a absolutely positioned tab bar.  src: https://reactnavigation.org/docs/bottom-tab-navigator
        tabBarStyle: { position: 'absolute', height: '10%', borderTopWidth: 1, },
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
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={30} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="magnify" color={color} size={30} />
          ),
          headerTitle: (props) => <SearchBar {...props} />,
          headerStyle: {backgroundColor: '#F7C5CC', height: 120}
        }}
      />
      <Tab.Screen
        name="My Info"
        component={MyInfo}
        options={({ route }) => ({
            headerTitle: getMyInfoTabHeaderTitle(route),
            headerLeft: () => {
              if (getMyInfoTabHeaderTitle(route) == 'Edit Profile'){
                return (
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <IconAnt name="left" size={30} style={{marginLeft: 10}}/>
                  </TouchableOpacity>
                )
              }
            },
            tabBarLabel: 'My Info',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="account-outline" color={color} size={30} />
            ),
        })}

      />
      <Tab.Screen
        name="More"
        component={More}
        options={({ route }) => ({
            headerTitle: getMoreTabHeaderTitle(route),
            headerLeft: () => {
              if (getMoreTabHeaderTitle(route) != 'More' && getMoreTabHeaderTitle(route) != 'MoreTab' ){
                return (
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <IconAnt name="left" size={30} style={{marginLeft: 10}}/>
                  </TouchableOpacity>
                )
              }
            },
            tabBarLabel: 'More',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="dots-horizontal" color={color} size={30} />
            ),
        })}
      />

    </Tab.Navigator>
  );
};

export default TabNavigator;