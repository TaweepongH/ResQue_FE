import { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useAuth } from '../contexts/AuthContext.js';
import CustomModal from './CustomModal.js';


// first off, fetch all the data to perform a client side search, maybe we can do a server side search later


const SearchBar = () => {

  

  const [content, setContent ] = useState('');

  const { bearerToken } = useAuth();

  const [loading, setLoading] = useState(false);

  const fetchAllPartners = async () => {

    setLoading(true);
    try {
      const response = await fetch('https://app-57vwexmexq-uc.a.run.app/api/partners/all', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: `Bearer ${bearerToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("all the partner data: ", data);
        setLoading(false);
        
      } else {
        console.log("api fetch error: ", response);
      }

    } catch (error) {
      console.log("Error: ", error);
    }

  }

  useEffect(() => {
    fetchAllPartners();
  }, [])

  
  
  return (
        <View style={styles.searchBar}>
          <Icon name="search" size={20} color="#797979" style={styles.icon} />
          
            <TextInput 
              value={content}
              onChangeText={setContent}
              placeholder='Search Restaurants' 
              style={styles.input}
              multiline
            />

          <CustomModal visible={loading} message={`fetching data...`} />
        </View>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    width: '100%',
    height: 40,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'white',
    borderWidth: 0.3,
    borderRadius: 5,
    borderColor: '#DADADA',
    paddingHorizontal: 10,
  },
  icon: {
    paddingRight: 10,
  },
  input: {
    width: '90%',
    fontSize: 16,
  },
});

export default SearchBar;