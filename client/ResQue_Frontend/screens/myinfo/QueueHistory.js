import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import QueueHistoryList from '../../Components/QueueHistoryList';
import { useAuth } from '../../contexts/AuthContext.js'

const QueueHistory = () => {

  const { bearerToken } = useAuth();

  const [userQueueData, setUserQueueData] = useState([]);

  const fetchQueData = async () => {

    const url = 'https://app-57vwexmexq-uc.a.run.app/api/queues/user/currentqueue';

    try {

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: `Bearer ${bearerToken}`,
        }

      });

      if (response.ok) {

        const data = await response.json();

        console.log("response status code: ", response.status);
        console.log("response from the current queue api", data);

        setUserQueueData(data);

      } else {

        if (response.status === 401) {
          console.log("missing auth token");
        } else if (response.status === 404) {
          console.log("This user doesn't have any ques!!!")
        } else {
          console.log("error, response status: ", response.status);
        }

      }

    } catch (error) {
      console.log("error: ", error);
    }

  }

  const convertToMonth = (string) => {

    const parsedNum = parseInt(string) - 1;

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 
    'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    if (parsedNum >= 0 && parsedNum <= 11) {
      return months[parsedNum]
    } else {
      return 'invalid month'
    }

  }

  const convertTo12Hr = (string) => {

    const strToArray = string.split('');

    const temp1 = strToArray[0];
    const temp2 = strToArray[1];

    const anteMeridiem = 'AM';
    const postMeridiem = 'PM';

    const hour = [temp1, temp2].join('');
    const parsedHour = parseInt(hour);

    const remainingTime = (array) => {
      const minAndSec = [];
      for (let i = 2; i < array.length; i++) {
        minAndSec.push(array[i]);
      }

      return minAndSec.join('');

    }

    if (parsedHour < 12) {
      return parsedHour.toString() + remainingTime(strToArray) + " " + anteMeridiem;
    } else {
      return (parsedHour - 12).toString() + remainingTime(strToArray) + " " + postMeridiem;
    }

  }

  useEffect(() => {

    fetchQueData();

  }, [])

    return (
        <View style={styles.container}>
          
          
          {userQueueData.map((queueData) => {

            // return <Text>{queueData.partnerName}</Text>
          return   <QueueHistoryList 
            key={Math.random() * 1000}
            icon="cloud" 
            text={
              
              <Text style={{ fontSize: 16 }}>
                {queueData.partnerName} { }
                <Text style={{ fontSize: 12}}>
                   {convertToMonth(new Date(queueData.updatedAt._seconds * 1000).toISOString().slice(5 , 7)) } {new Date(queueData.updatedAt._seconds * 1000).toISOString().slice(8 , 10)} {convertTo12Hr(new Date(queueData.updatedAt._seconds * 1000).toISOString().slice(11 , 16))}
                </Text>
                
              </Text>
              
            }
          />
          })}
          
          
        </View>
      );
};
    
const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 24,
      },
      user: {
        alignItems: 'center',
        marginBottom: 20,
      },
      userProfile: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 90,
        aspectRatio: 1,
        backgroundColor: "#CC313D",
        borderRadius: 45,
        marginBottom: 10,
      },
      profileText: {
        fontSize: 48,
        fontWeight: 'bold',
        color: "#FEEEEF",
      },
      userName: {
        fontSize: 24,
      },
      infoContainer: {
        flex: 1,
        alignItems: 'center',
      },
});
    
export default QueueHistory;
    
