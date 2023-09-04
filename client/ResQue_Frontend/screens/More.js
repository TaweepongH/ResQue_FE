import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import IconAnt from 'react-native-vector-icons/AntDesign';
import IconMat from 'react-native-vector-icons/MaterialIcons';
import { createStackNavigator } from '@react-navigation/stack';
import Settings from '../screens/Settings';
import TermsPolicies from '../screens/more/TermsPolicies';
import Feedback from '../Components/Feedback';

const Stack = createStackNavigator();

const MoreItem = ({ text, icon, screen }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate(screen);
  };

  return (
    <View style={styles.btn_more}>
      <TouchableOpacity style={styles.row} onPress={handlePress}>
        <IconMat name={icon} size={30} />
        <Text style={styles.txt_more}>{text}</Text>
        <IconAnt name="right" size={30} style={styles.arrow} />
      </TouchableOpacity>
    </View>
  );
};

const MoreStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="More" component={More} options={{ headerShown: false }} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="Feedback" component={Feedback} />
      <Stack.Screen name="TermsPolicies" component={TermsPolicies} />
    </Stack.Navigator>
  );
};

const More = () => {
  return (
    <View style={styles.container}>
      <MoreItem icon="warning" text="Notice" screen="Notice" />
      <MoreItem icon="settings" text="Settings" screen="Settings" />
      <MoreItem icon="insert-comment" text="Feedback" screen="Feedback" />
      <MoreItem icon="policy" text="Terms and Policies" screen="TermsPolicies" />
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

export default MoreStack;
