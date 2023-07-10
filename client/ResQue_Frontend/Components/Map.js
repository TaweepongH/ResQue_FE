
import React, { Component, useEffect, useState } from 'react';
import { View, PermissionsAndroid } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

const Map = () => {

    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);

    const vancouver = {
        latitude: 49.2004,
        longitude: -122.8582748,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.90421
    };
    
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
  }, []);

  const getCurrentLocation = () => {
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
  };
  
    return (
      <View style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1 }}
          region={deviceLocation}
          showsUserLocation={true}
        />
        {/* <Marker coordinate={tokyoRegion}/> */}
      </View>
    );
  
}

export default Map;

