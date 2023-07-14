import { useState, useEffect } from "react";
const { Text, StyleSheet } = require("react-native");
const apiKey = 'nEEEhLarJcEvFiV6K2h1Pp_M3fMYx5whC4xkYbXuYrmpmMxsLXH0O1sCdlZ9B30B83v2GBU08y3XRwSMSqHXzFgCLZLs52Pe4_VfersINvhg9X9F7NM4hDTrnYysZHYx';                
const searchTerm = 'restaurants'; // Or any other search term
const location = 'Vancouver';


const RestaurantData = () => {

    const [restaurantData, setRestaurantData] = useState([]);

    const addData = (newData) => {
        setRestaurantData(prevData => [...prevData, newData]);
    };

    useEffect(() => {
        fetch(`https://api.yelp.com/v3/businesses/search?term=${searchTerm}&location=${location}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        })
          .then(response => response.json())
          .then(data => {

            for (let i = 0; i < 20; i++) {
                console.log(data['businesses'][i]);
                addData(data['businesses'][i])
            }
            
          })
          .catch(error => {
            // Handle error
            console.error(error);
          });
      }, []);

  return (
    <>
        {restaurantData.map((restaurant, index) => (
      <Text style={styles.container} key={index}>Name: {restaurant.name}</Text>
    ))}
    </>
  )

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#FEEEEF',
      paddingBottom: 20,
    },

  });

export default RestaurantData;

