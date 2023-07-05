import React, { Component } from 'react';
import { View } from 'react-native';
import MapView from 'react-native-maps';
import { Marker } from "react-native-maps";

const Map = () => {

    const van = {
        latitude: 49.2004,
        longitude: -122.8582748,
        latitudeDelta: 3.0922,
        longitudeDelta: 1.0421
      };
  
    return (
      <View style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1 }}
          region={van}
          showsUserLocation={true}
        />
        {/* <Marker coordinate={tokyoRegion}/> */}
      </View>
    );
  
}

export default Map;