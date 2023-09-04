import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Settings from '../screens/Settings';
import TermsPolicies from '../screens/more/TermsPolicies';
import Feedback from '../Components/Feedback';
import ListItem from '../Components/ListItem';

const Stack = createStackNavigator();

const MoreStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen 
        name="More" 
        component={More} 
        options={{
          title: 'More'
        }}
      />
      <Stack.Screen name="Settings" component={Settings}/>

      <Stack.Screen name="Feedback" component={Feedback} />
      <Stack.Screen name="TermsPolicies" component={TermsPolicies} />
    </Stack.Navigator>
  );
};

const More = () => {
  return (
    <View style={styles.container}>
      <ListItem icon="warning" text="Notice" screen="Notice" />
      <ListItem icon="settings" text="Settings" screen="Settings" />
      <ListItem icon="insert-comment" text="Feedback" screen="Feedback" />
      <ListItem icon="policy" text="Terms and Policies" screen="TermsPolicies" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 24,
    alignItems: 'center',
  },
});

export default MoreStack;
