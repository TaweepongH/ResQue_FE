import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import QueueHistoryList from '../../Components/QueueHistoryList';
import { useAuth } from '../../contexts/AuthContext.js'
import CustomModal from '../../Components/CustomModal';
import { theme } from '../../styles/theme';
theme;

const QueueHistory = () => {

  const { bearerToken } = useAuth();

  const [userQueueData, setUserQueueData] = useState([]);
  const [hasQueues, setHasQueues] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchQueData = async () => {

    setLoading(true);

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

        setLoading(false);

        setHasQueues(true);

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

        setLoading(false);

      }

    } catch (error) {
      console.log("error: ", error);
    }

  }

  const parseTime = (seconds) => {

    const dateObject = new Date(seconds * 1000);
    const options = { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    const formattedDate = dateObject.toLocaleDateString('en-US', options).replace('at', '');

    return formattedDate;

  }

  const cancelQue = async (restaurantID) => {

    const url = "https://app-57vwexmexq-uc.a.run.app/api/queues/user/cancelqueue"

    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: `Bearer ${bearerToken}`,
        },
        body: JSON.stringify({
          partnerId: `${restaurantID}`,
        })
      });

      if (response.ok) {
        const data = await response.json();
        console.log("response from backend: ", data);
      } else {
        console.log("error: ", response.status, response);
      }
    } catch (error) {
      console.error("Network error: ", error);
    }


  }

  const handleLeave = (restaurantID) => {

    console.log("Leave pressed");

    cancelQue(restaurantID);

    setUserQueueData(prevData => prevData.filter(item => item.partnerId !== restaurantID));

  }

  useEffect(() => {

    fetchQueData();

  }, [])

    return ( 
      <View style={styles.container}>
        <CustomModal visible={loading}></CustomModal>

        { hasQueues ?
          userQueueData.map((queueData) => {
            return <QueueHistoryList 
                key={Math.random() * 1000}
                dateTime={queueData.updatedAt._seconds}
                partner={queueData.partnerName}
                onPress={() => handleLeave(queueData.partnerId)}
              />
              }) : loading ? <></> :
              <Text> You aren't queue'd up for anything! </Text>
            }
            </View> 

          );
};
    
const styles = StyleSheet.create({
      container: {
        width:'100%',
        flex: 1,
        backgroundColor: theme.color.white,
        paddingTop: 15,
      },
});
    
export default QueueHistory;
