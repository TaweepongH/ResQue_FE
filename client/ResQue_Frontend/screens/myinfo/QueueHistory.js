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

  const userData = {
    firstName: 'John',
    lastName: 'Deer',
  }

  useEffect(() => {
    fetchQueData();
    console.log("datatatatata", userQueueData)
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
                {queueData.partnerName}
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
    
