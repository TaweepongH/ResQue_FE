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
                // console.log(data['businesses'][i]);
                addData(data['businesses'][i])
            }
            
            makePostRequests(data['businesses']);
            
          })
          .catch(error => {
            // Handle error
            console.error(error);
          });
      }, []);

      useEffect(() => {
        console.log(`data test: 
          firstName: "N/A",
          lastName: "N/A",
          companyName: ${restaurantData.length > 0 ? restaurantData[0].name : 'N/A'},
          email: ${restaurantData.length > 0 ? restaurantData[0].url : 'N/A'},
          password: "12345678",
          phone: ${restaurantData.length > 0 ? restaurantData[0].phone : 'N/A'},
          address: [${restaurantData.length > 0 ? restaurantData[0].location['address1'] : 'N/A'}, ${restaurantData.length > 0 ? restaurantData[0].location['city'] : 'N/A'}, ${restaurantData.length > 0 ? restaurantData[0].location['state'] : 'N/A'}, ${restaurantData.length > 0 ? restaurantData[0].location['country'] : 'N/A'}],
          genre: ${restaurantData.length > 0 ? restaurantData[0].categories[0].title : 'N/A'},`
        );
      }, [makePostRequests]);

      const makePostRequests = (businesses) => {

        businesses.forEach(restaurant => {

            const { name, url, phone, location, categories } = restaurant;

            const address = [
            location.address1,
            location.city,
            location.state,
            location.country
            ];

            const payload = {
            firstName: 'John',
            lastName: 'Johnson',
            companyName: name,
            email: url,
            password: '12345678',
            phone: phone,
            address: address,
            operationDate: "Mon,Tue,Wed,Thur,Fri",
            operationTime: ["10.00-11.30"],
            genre: categories[0].title
            };

          fetch('https://app-57vwexmexq-uc.a.run.app/api/partners/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkF2MGE3ZlBTWjVpcE9aNE9jMGQzIiwicm9sZSI6InVzZXIiLCJpYXQiOjE2ODkzODQ2NjYsImV4cCI6MTY4OTM4ODI2Nn0.CRd0C_QxMaKGQsZ6QK7FjHcQiTGWwrPCy0ZhU6_8yjQ',
            },
            body: JSON.stringify(payload),
          })
            .then(response => response.json())
            .then(result => {
              console.log('post request result: ', result);
            })
            .catch(error => {
              console.error('post request error: ', error);
            });
        });
      };
    

  return (
    <>
        {restaurantData.map((restaurant, index) => (
      
      <>
        <Text style={styles.container} key={index}> 

                Name: {restaurant.name}, location: {restaurant.location['address1']}, rating: {restaurant.rating}
        </Text>

        <Text>
                genre: {restaurant['categories'][0].title}, price: {restaurant.price}, phone: {restaurant.phone}
        </Text>
      </>

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

