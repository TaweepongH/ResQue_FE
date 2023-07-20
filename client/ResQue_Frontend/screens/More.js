import { View, Text , TouchableOpacity, StyleSheet } from 'react-native';
import IconAnt from 'react-native-vector-icons/AntDesign';
import IconMat from 'react-native-vector-icons/MaterialIcons';

const MoreItem = ({ text,icon }) => {
  return (
    <View style={styles.btn_more}>
      <TouchableOpacity style={styles.row}>
        <IconMat name={icon} size={30}/>
        <Text style={styles.txt_more}>{text}</Text>
        <IconAnt name="right" size={30} style={styles.arrow} />
      </TouchableOpacity>
    </View>
  );
};

const More = () => {
  return (
    <View style={styles.container}>
      <MoreItem icon="warning" text="Notice" />
      <MoreItem icon="settings" text="Settings" />
      <MoreItem icon="insert-comment" text="Feedback" />
      <MoreItem icon="policy" text="Terms and Policies" />
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

export default More;

