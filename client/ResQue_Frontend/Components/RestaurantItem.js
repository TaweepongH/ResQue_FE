import React from 'react';
import { View, Text, Image, StyleSheet,TouchableOpacity } from 'react-native';
import { theme } from '../styles/theme';


const RestaurantItem = ({restaurant, onPress}) => {
    return (
        <TouchableOpacity key={restaurant.id} onPress={onPress}
        >
          <View style={styles.restaurantItem}>
            
            <Image
              source={{ uri: restaurant.images[0] }}
              style={{ width: 65, height: 65, borderRadius: 5 }}
            />
            <View style={styles.textContainer}>
              <Text style={styles.textCompanyName}>{restaurant.companyName}</Text>
              <Text style={styles.textAddress}>
                {restaurant.address[0]}, {restaurant.address[1]}
              </Text>
            </View>
            <View style={styles.waitList}>
              <Text style={styles.waitListText}>{restaurant.queueCount}</Text>
            </View>
            
          </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    restaurantItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: theme.color.lightgray,
    },
    textCompanyName: {
      fontSize: theme.fontsize.xl,
      fontFamily: theme.font.secondary,
      color: theme.color.blackAlt,
      lineHeight: theme.fontsize.xl,
    },
    textAddress: {
      fontFamily: theme.font.secondary,
      fontsize: theme.fontsize.lg,
      color: theme.color.gray,
    },  
    textContainer: {
      marginLeft: 10,
      flex: 1,
    },
    waitList: {
      alignItems: 'center',
      justifyContent: 'center',
      width: 35,
      height: 35,
      backgroundColor: theme.color.red,
      borderRadius: 20,
    },
    waitListText: {
      color: theme.color.lightpink,
      fontSize: theme.fontsize.xl,
      fontWeight: 'bold',
    },
  });

  
export default RestaurantItem; 