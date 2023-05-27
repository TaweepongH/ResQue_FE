import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Main = () => {
  // FIX ME: test data(to be received from the backend later)
  const data = [
    { id: 1, name: 'All' },
    { id: 2, name: 'Vancouver' },
    { id: 3, name: 'Richmond' },
    { id: 4, name: 'Burnaby' },
    { id: 5, name: 'North Vancouver' },
    { id: 6, name: 'West Vancouver' },
    { id: 7, name: 'Coquitlam' },
    { id: 8, name: 'Surrey' },
    { id: 9, name: 'Delta' },
  ];

  const renderButton = (name) => {
    return (
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>{name}</Text>
      </TouchableOpacity>
    );
  };

  const renderButtons = () => {
    const rows = [];
    const columns = 3;
    const totalButtons = data.length;

    let startIndex = 0;
    let endIndex = columns + 1;

    while (startIndex < totalButtons) {
      const rowData = data.slice(startIndex, endIndex);
      const rowButtons = [];

      for (let i = 0; i < columns; i++) {
        const item = rowData[i];

        if (item) {
          rowButtons.push(
            <View style={styles.column} key={item.id}>
              {renderButton(item.name)}
            </View>
          );
        } else {
          rowButtons.push(<View style={styles.column} key={i} />);
        }
      }

      rows.push(
        <View style={styles.row} key={startIndex}>
          {rowButtons}
        </View>
      );

      startIndex += columns;
      endIndex += columns;
    }

    return rows;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Reservation BEST Restaurant</Text>
      <Text style={styles.title}>Vancouver</Text>
      {renderButtons()}
      <View style={styles.mapContainer}>
        <View>
          <Text style={styles.mapText}>
            If you use the location information right, you can see the restaurants around you.
          </Text>
          <TouchableOpacity style={styles.allowButton}>
            <Text style={styles.buttonText}>Allow</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 80,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  column: {
    flex: 1,
    marginRight: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  button: {
    height: 48,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: 'black',
  },
  mapContainer: {
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 20,
    paddingVertical: 70,
    marginVertical: 20,
  },
  mapText: {
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  allowButton: {
    height: 45,
    width: 90,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    alignSelf: 'center',
    marginTop: 30,
  },


});

export default Main;
