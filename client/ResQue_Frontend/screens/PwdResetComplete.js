import { View, Text, TouchableOpacity , StyleSheet } from 'react-native';
import IconAnt from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../styles/theme';
import CustomButton from '../Components/CustomButton';
import { SvgXml } from 'react-native-svg';

const xml = `
<svg xmlns="http://www.w3.org/2000/svg" width="390" height="780" viewBox="0 0 390 780" fill="none">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M353.347 265.003C382.219 266.614 411.98 273.996 432.846 294.019C452.471 312.851 449.026 344.07 461.129 368.429C476.518 399.399 512.92 420.752 513 455.335C513.086 492.876 492.537 531.217 461.553 552.407C430.843 573.411 388.159 577.653 353.347 564.526C322.013 552.71 315.891 511.482 291.676 488.348C272.459 469.988 233.028 470.343 227.545 444.335C221.931 417.708 261.373 402.107 267.926 375.695C275.407 345.541 248.153 309.369 267.133 284.774C285.599 260.845 323.17 263.32 353.347 265.003Z" fill="#FEEEEF"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M23.0706 520.435C59.8736 508.257 92.3724 475.097 130.266 483.284C172.46 492.401 225.877 521.379 226.985 564.495C228.194 611.528 155.351 624.597 134.99 667.021C119.228 699.861 155.411 750.757 126.773 773.291C98.5084 795.531 59.0468 755.379 23.0706 755.084C-12.3962 754.794 -47.2541 786.568 -79.404 771.603C-112.038 756.413 -121.93 715.551 -134.373 681.799C-147.322 646.677 -172.75 605.137 -152.351 573.744C-131.002 540.887 -80.0531 551.867 -42.54 540.468C-20.1122 533.652 0.817089 527.799 23.0706 520.435Z" fill="#FEEEEF"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M143.605 41.1328C179.475 39.8661 217.589 -19.1604 242.729 6.42145C270.082 34.2542 212.154 79.7745 219.265 118.12C224.754 147.72 274.66 155.542 275.958 185.617C277.221 214.895 249.845 238.924 225.162 254.772C201.283 270.104 171.604 265.918 143.605 270.597C108.139 276.523 62.2956 313.552 39.4752 285.8C13.8353 254.619 53.9187 209.411 60.5685 169.614C63.5024 152.056 68.7793 135.738 67.5164 117.981C64.9399 81.758 23.8791 39.0698 49.4465 13.2471C73.0416 -10.5837 110.068 42.3172 143.605 41.1328Z" fill="#FEEEEF"/>
</svg>
`;

const PwdResetComplete = () => {

  const navigation = useNavigation()

  const handleReturn = () => {
    navigation.navigate('Login');
  }

  return (
    <View style={styles.container}>
    <SvgXml xml={xml} style={styles.bgImage}/>
      <View style={styles.items}>
          <IconAnt name="checkcircleo" size={50} color={theme.color.red}/>
          <Text style={styles.txt_complete}>Reset Complete!</Text>

          <CustomButton title="Return to Login" onPress={handleReturn} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: theme.color.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bgImage: {
    position:'absolute', 
  },
  items: {
    width: '100%',
    alignItems: 'center'
  },
  txt_complete:{
    fontFamily: theme.font.primary,
    fontSize: theme.fontsize.xxl,
    fontWeight: '100',
    marginTop:15,
    marginBottom: 20,
  },
});



export default PwdResetComplete;