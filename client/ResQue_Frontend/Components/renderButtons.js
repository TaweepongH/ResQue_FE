import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import renderButton from './renderButton';

const renderButtons = (data, handleAllButtonPress) => {
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
            {renderButton(item.name, () => handleAllButtonPress())}
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

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  column: {
    flex: 1,
    marginRight: 10,
  },
});

export default renderButtons;
