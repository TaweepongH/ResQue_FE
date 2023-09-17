import { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useAuth } from '../contexts/AuthContext.js';
import CustomModal from '../Components/CustomModal.js';

const Search = () => {

  // const { bearerToken } = useAuth();

  // const [loading, setLoading] = useState(false);

  // const fetchAllPartners = async () => {

  //   setLoading(true);
  //   try {
  //     const response = await fetch('https://app-57vwexmexq-uc.a.run.app/api/partners/all', {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json; charset=utf-8',
  //         Authorization: `Bearer ${bearerToken}`,
  //       },
  //     });

  //     if (response.ok) {
  //       const data = await response.json();
  //       console.log("all the partner data: ", data);
  //       setLoading(false);
        
  //     } else {
  //       console.log("api fetch error: ", response);
  //     }

  //   } catch (error) {
  //     console.log("Error: ", error);
  //   }

  // }

  // useEffect(() => {
  //   fetchAllPartners();
  // }, [])
  
  return (
    <View style={styles.container}>
        {/* <CustomModal visible={loading} message={`fetching data...`} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});


export default Search;