import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import IconMat from 'react-native-vector-icons/MaterialIcons';
import { theme } from '../styles/theme';
theme;
const QueueHistoryList = ({ partner, dateTime, button, onPress }) => {
  const parseTime = (seconds) => {
    const dateObject = new Date(seconds * 1000);
    const options = { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    const formattedDate = dateObject.toLocaleDateString('en-US', options).replace('at', '');

    return formattedDate;
  };

  return (
    <View style={styles.queueItemContainer}>
      <View style={styles.iconContainer}>
        <IconMat name="list-alt" size={40} color={theme.color.blackAlt} style={styles.icon} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.txtRestaurant}>{partner}</Text>
        <Text style={styles.txtDateTime}>{parseTime(dateTime)}</Text>
      </View>
      <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
        <Text style={styles.buttonText}>Leave</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  queueItemContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  iconContainer: {
    padding: 5,
    backgroundColor: theme.color.white,
    borderWidth: 1,
    borderColor: theme.color.lightgray,
    borderRadius: 5,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  txtRestaurant: {
    fontFamily: theme.font.secondary,
    fontSize: theme.fontsize.lg,
    lineHeight: theme.fontsize.xl,
    color: theme.color.blackAlt,
  },
  txtDateTime: {
    fontFamily: theme.font.secondary,
    fontSize: theme.fontsize.sm,
    lineHeight: theme.fontsize.md,
    color: theme.color.gray,
  },
  buttonContainer: {
    backgroundColor: theme.color.red,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: 'flex-end',
  },
  buttonText: {
    fontFamily: theme.font.secondary,
    fontSize: theme.fontsize.sm,
    lineHeight: theme.fontsize.md,
    color: theme.color.white,
  },
});

export default QueueHistoryList;
