import { View, StyleSheet } from 'react-native';
import ListItem from '../Components/ListItem';

const Settings = () => {
  return (
    <View style={styles.container}>
      <ListItem text="Location Services" icon="location-pin" screen="iosSettings" />
      <ListItem text="Notifications" icon="notifications-active" screen="iosSettings" />
      <ListItem text="Version 1.1" icon="info-outline" screen="version" />
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

export default Settings;

