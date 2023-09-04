import { useState, useEffect } from "react";
const { Text, StyleSheet } = require("react-native");
const apiKey = 'nEEEhLarJcEvFiV6K2h1Pp_M3fMYx5whC4xkYbXuYrmpmMxsLXH0O1sCdlZ9B30B83v2GBU08y3XRwSMSqHXzFgCLZLs52Pe4_VfersINvhg9X9F7NM4hDTrnYysZHYx';                
const searchTerm = 'restaurants'; // Or any other search term
const location = 'White Rock'; 
let operationalDays = [];


// this component is used to retreive and send data from yelp to our database

// this process is not as automated as it should be, I ended up having to make two seperate api calls to get all the necessary data for one partner document, i will try to make it more efficient in the future


const GenerateRestaurantData = () => {

    const [restaurantData, setRestaurantData] = useState([]);

    const addData = (newData) => {
        setRestaurantData(prevData => [...prevData, newData]);
    };

    useEffect(() => {
        setRestaurantData([]);
        fetch(`https://api.yelp.com/v3/businesses/search?term=${searchTerm}&location=${location}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        })
          .then(response => response.json())
          .then(data => {

            // making sure the days array is empty before calling getHoursOfOperation, because that function requires an empty array to accuratlely record the days
            operationalDays = [];

            let num = 0;

            addData(data['businesses'][num]);

            getHoursOfOperation(data['businesses'][num])
    
            makePostRequests(restaurantData)
        
          })
          .catch(error => {
            // Handle error
            console.error(error);
          });
      }, []);

      const getHoursOfOperation = (restaurant) => {

        // businesses.forEach(restaurant => {

                fetch(`https://api.yelp.com/v3/businesses/${restaurant.id}`, {
                    method: 'GET',
                    headers: {
                    Authorization: `Bearer ${apiKey}`,
                    },
                })
                .then(response => response.json())
                .then(data => {
                    
                    data.hours[0]['open'].forEach((day, index) => {
                        
                        if (index > 0) {
                            const previousDay = data.hours[0]['open'][index - 1].day;
                            const currentDay = day.day;
                    
                            if (currentDay === previousDay) {
                                console.log("Current day is the same as the previous day.");
                            } else {
                               operationalDays.push(currentDay);
                            }
                        } else {
                            operationalDays.push(day.day);
                        }

                    })

                    console.log("operational days for this restaurant: ", operationalDays);

                    
                const updatedRestaurant = {
                    ...restaurant,
                    daysOfOperation: operationalDays,
                    hoursOfOperation: data.hours[0]['open']
                };

                // Update the restaurant data in state with the hours of operation
                setRestaurantData(prevData => prevData.map(prevRestaurant => prevRestaurant.id === restaurant.id ? updatedRestaurant : prevRestaurant));

                console.log("restaurant Data from the getHoursOfOperation function: ", restaurantData);

                })
                .catch(error => {
                    // Handle error
                    console.error(error);
                });
            
      };

      const makePostRequests = (businesses) => {

            businesses.forEach(restaurant => {

                const { name, url, phone, location, categories, image_url, daysOfOperation, hoursOfOperation } = restaurant;
    
                const address = [
                location.address1,
                location.city,
                location.state,
                location.country
                ];
    
                const payload = {
                firstName: 'N/A',
                lastName: 'N/A',
                companyName: name,
                email: url,
                password: '12345678',
                phone: phone,
                address: address,
                operationDate: daysOfOperation,
                operationTime: hoursOfOperation,
                genre: categories[0].title, 
                images: [image_url]
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
    <Text>
        test
    </Text>
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

export default GenerateRestaurantData;

