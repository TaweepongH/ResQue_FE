import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import QueueHistoryList from '../../Components/QueueHistoryList';
import { useAuth } from '../../contexts/AuthContext.js'
import CustomModal from '../../Components/CustomModal';

// use the moment.js library

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
               
              return <View key={Math.random() * 1000} style={styles.queueItemContainer}>

                  <QueueHistoryList 
                  key={Math.random() * 1000}
                  icon="cloud" 
                  text=
                    {
                    
                      <Text style={{ fontSize: 16 }}>
                        {queueData.partnerName} { }
                        <Text style={{ fontSize: 12}}>
                          {parseTime(queueData.updatedAt._seconds)}
                        </Text>


                      <TouchableOpacity onPress={ () => {handleLeave(queueData.partnerId)}}>
                        <View style={styles.waitList}>
                        <Text style={styles.waitListText}>Leave</Text>
                        </View>
                      </TouchableOpacity>
                        
                      </Text>
                    }
                />
              </View>

          }) : loading ? <></> :

          <Text> You aren't queue'd up for anything! </Text>      
        }
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
      waitList: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,
        height: 40,
        backgroundColor: '#CC313D',
        borderRadius: 20,
        
      },
      waitListText: {
        color: 'white',
        fontSize: 12,
      },
      queueItemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16, // Add padding to separate items
        marginBottom: 16, // Add margin to separate items
      },
});
    
export default QueueHistory;
    
