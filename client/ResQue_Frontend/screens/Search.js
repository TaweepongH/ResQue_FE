import { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const Search = () => {
  const [content, setContent ] = useState('');
  
  return (
    <View style={styles.container}>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10
    
  },
  searchBar: {
    width: '100%',
    height: 40,
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
  }
    
  
});


export default Search;