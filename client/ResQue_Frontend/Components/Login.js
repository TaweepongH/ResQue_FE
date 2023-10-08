import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomButton from './CustomButton';
import { SvgXml } from 'react-native-svg';
import { theme } from '../styles/theme';

//Logo svg 
const xml = `
<svg xmlns="http://www.w3.org/2000/svg" width="294" height="66" viewBox="0 0 294 66" fill="none">
  <path d="M14.8884 64.9585H0V0H28.8285C42.5266 0 50.3541 7.32095 50.3541 19.3167C50.3541 29.7248 44.1002 36.5386 34.3562 36.8914C39.0365 37.2442 42.6679 40.596 45.2299 46.8364L30.4935 51.2696L28.5461 46.8584C26.4278 41.7867 25.0358 40.5518 21.2431 40.5518H14.8884V64.9585ZM14.8884 27.9828H27.1945C32.4599 27.9828 35.4456 25.2264 35.4456 20.3752C35.4456 15.568 32.5204 12.944 27.1743 12.944H14.8884V27.9828Z" fill="#343434"/>
  <path d="M48.1387 58.9653C48.1387 62.2524 45.4542 64.917 42.1427 64.917C38.8313 64.917 36.1468 62.2524 36.1468 58.9653C36.1468 55.6783 38.8313 53.0136 42.1427 53.0136C45.4542 53.0136 48.1387 55.6783 48.1387 58.9653Z" fill="#343434"/>
  <path d="M81.2927 49.8859H94.0264C91.5669 59.2696 83.3951 65 72.5656 65C59.2171 65 50.1726 56.2839 50.1726 43.4137C50.1726 30.5621 59.1179 21.883 72.3276 21.883C85.4777 21.883 94.2247 30.4508 94.2247 43.3766C94.2247 44.378 94.1652 45.4351 94.0462 46.4551H63.2831C63.9575 51.8887 67.4682 55.0599 72.9623 55.0599C77.0085 55.0599 79.7456 53.3352 81.2927 49.8859ZM63.3823 39.408H81.253C80.301 34.2154 77.3258 31.6006 72.4069 31.6006C67.3888 31.6006 64.2352 34.3638 63.3823 39.408Z" fill="#343434"/>
  <path d="M117.341 21.883C130.69 21.883 138.465 27.3909 138.465 36.4964H124.799C124.799 32.8802 122.339 30.8217 117.698 30.8217C113.731 30.8217 110.994 32.3238 110.994 34.5678C110.994 37.4608 114.723 38.0542 119.463 38.8331L122.379 39.3153C129.301 40.4465 139.655 42.1712 139.655 51.8887C139.655 60.2154 131.999 65 118.472 65C104.211 65 96.5348 59.659 96.5348 50.0713H110.201C110.201 53.8916 112.878 55.9501 118.353 55.9501C123.053 55.9501 125.989 54.4665 125.989 52.0556C125.989 49.0513 122.577 48.4579 116.984 47.5307L114.068 47.0485C107.721 45.9914 97.348 44.2668 97.348 34.8088C97.348 26.7603 104.826 21.883 117.341 21.883Z" fill="#343434"/>
  <path d="M232.585 44.1184V22.9957H246.39V63.8873H232.585V51.3695C230.88 60.3267 225.743 65 217.65 65C208.487 65 203.826 58.9914 203.826 47.1969V22.9957H217.63V44.4151C217.63 50.776 219.971 53.8916 224.771 53.8916C229.809 53.8916 232.585 50.5164 232.585 44.1184Z" fill="#343434"/>
  <path d="M281.068 49.8859H293.802C291.342 59.2696 283.17 65 272.341 65C258.992 65 249.948 56.2839 249.948 43.4137C249.948 30.5621 258.893 21.883 272.103 21.883C285.253 21.883 294 30.4508 294 43.3766C294 44.378 293.941 45.4351 293.822 46.4551H263.058C263.733 51.8887 267.243 55.0599 272.738 55.0599C276.784 55.0599 279.521 53.3352 281.068 49.8859ZM263.158 39.408H281.028C280.076 34.2154 277.101 31.6006 272.182 31.6006C267.164 31.6006 264.01 34.3638 263.158 39.408Z" fill="#343434"/>
  <path d="M79.2927 49.8859H92.0264C89.5669 59.2696 81.3951 65 70.5656 65C57.2171 65 48.1726 56.2839 48.1726 43.4137C48.1726 30.5621 57.1179 21.883 70.3276 21.883C83.4777 21.883 92.2247 30.4508 92.2247 43.3766C92.2247 44.378 92.1652 45.4351 92.0462 46.4551H61.2831C61.9575 51.8887 65.4682 55.0599 70.9623 55.0599C75.0085 55.0599 77.7456 53.3352 79.2927 49.8859ZM61.3823 39.408H79.253C78.301 34.2154 75.3258 31.6006 70.4069 31.6006C65.3888 31.6006 62.2352 34.3638 61.3823 39.408Z" fill="#343434"/>
  <path d="M115.341 21.883C128.69 21.883 136.465 27.3909 136.465 36.4964H122.799C122.799 32.8802 120.339 30.8217 115.698 30.8217C111.731 30.8217 108.994 32.3238 108.994 34.5678C108.994 37.4608 112.723 38.0542 117.463 38.8331L120.379 39.3153C127.301 40.4465 137.655 42.1712 137.655 51.8887C137.655 60.2154 129.999 65 116.472 65C102.211 65 94.5348 59.659 94.5348 50.0713H108.201C108.201 53.8916 110.878 55.9501 116.353 55.9501C121.053 55.9501 123.989 54.4665 123.989 52.0556C123.989 49.0513 120.577 48.4579 114.984 47.5307L112.068 47.0485C105.721 45.9914 95.348 44.2668 95.348 34.8088C95.348 26.7603 102.826 21.883 115.341 21.883Z" fill="#343434"/>
  <path d="M230.585 44.1184V22.9957H244.39V63.8873H230.585V51.3695C228.88 60.3267 223.743 65 215.65 65C206.487 65 201.826 58.9914 201.826 47.1969V22.9957H215.63V44.4151C215.63 50.776 217.971 53.8916 222.771 53.8916C227.809 53.8916 230.585 50.5164 230.585 44.1184Z" fill="#343434"/>
  <path d="M279.068 49.8859H291.802C289.342 59.2696 281.17 65 270.341 65C256.992 65 247.948 56.2839 247.948 43.4137C247.948 30.5621 256.893 21.883 270.103 21.883C283.253 21.883 292 30.4508 292 43.3766C292 44.378 291.941 45.4351 291.822 46.4551H261.058C261.733 51.8887 265.243 55.0599 270.738 55.0599C274.784 55.0599 277.521 53.3352 279.068 49.8859ZM261.158 39.408H279.028C278.076 34.2154 275.101 31.6006 270.182 31.6006C265.164 31.6006 262.01 34.3638 261.158 39.408Z" fill="#343434"/>
  <path d="M141.807 27.8489C141.807 10.9527 153.518 0 169.937 0C186.337 0 198.067 10.9527 198.067 27.8489C198.067 44.7452 186.337 55.6979 169.937 55.6979C153.518 55.6979 141.807 44.7452 141.807 27.8489ZM156.65 27.8489C156.65 38.5399 161.359 44.1471 169.937 44.1471C178.496 44.1471 183.224 38.5399 183.224 27.8489C183.224 17.1392 178.496 11.5508 169.937 11.5508C161.359 11.5508 156.65 17.1392 156.65 27.8489Z" fill="#343434"/>
  <path d="M198.031 58.9602C198.031 62.2447 195.189 64.9072 191.683 64.9072C188.177 64.9072 185.335 62.2447 185.335 58.9602C185.335 55.6758 188.177 53.0132 191.683 53.0132C195.189 53.0132 198.031 55.6758 198.031 58.9602Z" fill="#343434"/>
  <path d="M198.031 58.9602C198.031 62.2447 195.189 64.9072 191.683 64.9072C188.177 64.9072 185.335 62.2447 185.335 58.9602C185.335 55.6758 188.177 53.0132 191.683 53.0132C195.189 53.0132 198.031 55.6758 198.031 58.9602Z" fill="#343434"/>
  <path d="M198.031 59.3632C198.031 62.8702 195.189 65.7132 191.683 65.7132C188.177 65.7132 185.335 62.8702 185.335 59.3632C185.335 55.8562 188.177 53.0132 191.683 53.0132C195.189 53.0132 198.031 55.8562 198.031 59.3632Z" fill="#343434"/>
</svg>
`;


const Login = () => {
  const navigation = useNavigation();

  const handleSignUp = () => {
    navigation.navigate('Register');
  };
  const handleLoginEmail = () => {
    navigation.navigate('LoginEmail');
  };

  const handleGoogleAuth = () => {
    navigation.navigate('GoogleAuth')
  }

  return (
    <View style={styles.container}>
      {/* Logo */}
      <SvgXml xml={xml} style={styles.logo}/>

      {/* Login Buttons */}
      <View style={styles.btnContianer}>
        {/* <CustomButton icon="facebook-square" title="Log in with FaceBook" onPress={() => console.log("Facebook btn pressed")} /> */}
        <CustomButton icon="google" title="Log in with Google" onPress={handleGoogleAuth} />
        <CustomButton icon="mail" title="Log in with E-mail" onPress={handleLoginEmail} />
        <View style={styles.signupContainer}>
          <Text style={styles.noAccountText}>Don't have an account? </Text>
          <TouchableOpacity onPress={handleSignUp}>
            <Text style={styles.signupText}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: theme.color.lightpink,
  },
  logo: {
    position: 'absolute',
    top: '35%',
  },
  btnContianer: {
    position: 'absolute',
    bottom: '10%',
    width: '100%',
    alignItems: 'center',
  },
  signupContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  noAccountText: {
    color: theme.color.gray,
    fontFamily: theme.font.secondary,
  },
  signupText: {
    color: theme.color.red,
    fontFamily: theme.font.secondary,
    textDecorationLine: 'underline',
    fontWeight: '500',
    marginLeft: 5,
  },
});

export default Login;

