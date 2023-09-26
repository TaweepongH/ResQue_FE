import React, { useRef } from 'react';
import { View, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';

const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

export default Splash = () => {
    const fadeAnim = useRef(new Animated.Value(1)).current;
    const navigation = useNavigation();

    

    const fadeOut = () => {
        // Will change fadeAnim value to 0 in 3 seconds
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }).start(()=> {
            navigation.navigate('Login')
        });

        return true;
      };

    return (
        <View style={{ flex:1 }}>
            <AnimatedLottieView 
                source={require('../assets/splash.json')}
                autoPlay
                loop={false}
                resizeMode="cover"
                style={{flex: 1}}
                onAnimationFinish={() => {
                    navigation.navigate('Login')
                }}
            />
        </View>
        
    )
}