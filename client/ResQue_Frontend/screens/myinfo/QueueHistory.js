import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import QueueHistoryList from '../../Components/QueueHistoryList';
import { useAuth } from '../../contexts/AuthContext.js'
import CustomModal from '../../Components/CustomModal';

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
                      text={
                        <View style={{ flexDirection: 'row', alignItems: 'center',justifyContent:'space-between', }}>
                          <View style={styles.listContainer}>
                            <Text style={styles.queueData}>{queueData.partnerName}</Text>
                            <Text style={styles.queueTime}>
                              {parseTime(queueData.updatedAt._seconds)}
                            </Text>
                          </View>
                        </View>
                      }
                      button={        
                        <TouchableOpacity onPress={() => handleLeave(queueData.partnerId)}>
                          <View style={styles.waitList}>
                            <Text style={styles.waitListText}>Leave</Text>
                          </View>
                        </TouchableOpacity>     
                      }
                    />
                </View>

          }) : <></>
        }
        </View> 
      );
};
    
const styles = StyleSheet.create({
      container: {
        width:'100%',
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 24,
      },
      user: {
        alignItems: 'center',
        marginBottom: 20,
      },
      userProfile: {
        width: 90,
        aspectRatio: 1,
        backgroundColor: "#CC313D",
        borderRadius: 45,
        marginBottom: 10,
      },
      queueData:{
        fontSize:15,
        marginRight:10,

      },
      queueTime:{
        fontSize: 12, 
        marginLeft: 5
      },
      profileText: {
        fontSize: 48,
        fontWeight: 'bold',
        color: "#FEEEEF",
      },
      userName: {
        fontSize: 24,
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
        marginBottom: 16, 
      },
});
    
export default QueueHistory;
