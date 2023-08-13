import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Button } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  const handleStarClick = (starCount) => {
    setRating(starCount);
  };

  const handleSubmit = () => {
    // Here, using the rating and feedback content, we send the data to the server.
    console.log(`Rating: ${rating}, Feedback: ${feedback}`);
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ marginTop: 20 }}>
        Are you satisfied with our Service?
      </Text>
      <View style={styles.starContainer}>
        {[1, 2, 3, 4, 5].map((starCount, index) => (
          <TouchableOpacity
            key={starCount}
            onPress={() => handleStarClick(starCount)}
            style={[styles.starIcon, index == 0 && { marginLeft: 25 }]}
          >
            {starCount <= rating ? (
              <FontAwesome name="star" size={40} color="#CC313D" />
            ) : (
              <FontAwesome name="star-o" size={40} color="#CC313D" />
            )}
          </TouchableOpacity>
        ))}
      </View>
      <Text style={{ marginBottom: 20 }}>Tell us what can be improved.</Text>
      <TextInput
        style={styles.textInput}
        multiline
        numberOfLines={4}
        value={feedback}
        placeholder="Your opinion is important to us."
        onChangeText={(text) => setFeedback(text)}
      />
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Apply</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  starContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 25,
  },
  starIcon: {
    marginRight: 25,
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    height: 200,
    marginBottom: 30,
  },
  submitButton: {
    backgroundColor: '#CC313D',
    padding: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  submitButtonText: {
    color: "white",
    fontSize: 20,
    fontWeight: 'bold',
  },
};

export default Feedback;
