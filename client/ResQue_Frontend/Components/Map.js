
import React, { useCallback, useEffect, useState } from 'react';
import { View, PermissionsAndroid, Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

const vancouver = {
    latitude: 49.2004,
    longitude: -122.8582748,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.90421
};

const Map = () => {

    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    
    const deviceLocation = {
        latitude: latitude, 
        longitude: longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 1.90421
    }

    useEffect(() => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ).then((granted) => {
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getCurrentLocation();
        } else {
          console.log('Location permission denied');
        }
      });
    } else {
      getCurrentLocation();
    }
  }, [getCurrentLocation]);

  // chat GPT suggested that I "memoize" this function by assinging it to the useCallback hook. I guess that's to cache output for common inputs rather than having to compute the same inputs each time
  const getCurrentLocation = useCallback(() => {

    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);
        console.log('Device Location: Latitude: ' + latitude + ', Longitude: ' + longitude);
      },
      (error) => {
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );

  }, []);

  
    return (
      <View style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1 }}
          region={deviceLocation}
          showsUserLocation={true}
        />
        {/* <Marker coordinate={Vancouver}/> */}
      </View>
    );
  
}

export default Map;

