import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';

export default Splash = () => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, backgroundColor: '#CC313D' }}>
      <LottieView
        source={require('../assets/splash.json')}
        autoPlay
        loop={false}
        resizeMode="cover"
        style={{ flex: 1 }}
        onAnimationFinish={() => {
          navigation.navigate('Login');
        }}
      />
    </View>
  );
};
