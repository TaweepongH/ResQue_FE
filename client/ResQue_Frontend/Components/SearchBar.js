import { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const SearchBar = () => {
  const [content, setContent ] = useState('');
  
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