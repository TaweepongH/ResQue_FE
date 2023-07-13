import { useState, useEffect } from "react";
const { Text } = require("react-native");
const apiKey = 'nEEEhLarJcEvFiV6K2h1Pp_M3fMYx5whC4xkYbXuYrmpmMxsLXH0O1sCdlZ9B30B83v2GBU08y3XRwSMSqHXzFgCLZLs52Pe4_VfersINvhg9X9F7NM4hDTrnYysZHYx';                
const searchTerm = 'restaurants'; // Or any other search term
const location = 'Vancouver';


const RestaurantData = () => {

    const [restaurantData, setRestaurantData] = useState([]);

    useEffect(() => {
        fetch(`https://api.yelp.com/v3/businesses/search?term=${searchTerm}&location=${location}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        })
          .then(response => response.json())
          .then(data => {
            // Handle the response data
            console.log("data ",data);
          })
          .catch(error => {
            // Handle error
            console.error(error);
          });
      }, []);

  return (
    <>
      {}
    </>
  )

}

export default RestaurantData;

