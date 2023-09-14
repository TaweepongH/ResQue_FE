import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Octicons from 'react-native-vector-icons/Octicons';
import { useNavigation } from '@react-navigation/native';

const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const navigation = useNavigation();

  const handleStarClick = (starCount) => {
    setRating(starCount);
  };

  const handleSubmit = () => {
    console.log(`Rating: ${rating}, Feedback: ${feedback}`);
    setSubmitted(true);
  };

  const handleBackToHome = () => {
    setSubmitted(false);
    navigation.navigate('Home');
    setFeedback('');
    setRating(0);
  };

  return (
    <View style={submitted ? styles.submittedContainer : styles.container}>
      {submitted ? (
        <View style={styles.submittedContent}>
          <Octicons name="thumbsup" size={70} color="#CC313D" />
          <Text style={styles.thankYouText}>Thank you!</Text>
          <Text style={styles.feedbackSubmittedText}>Your feedback was successfully submitted.</Text>
          <TouchableOpacity style={styles.backToHomeButton} onPress={handleBackToHome}>
            <Text style={styles.backToHomeButtonText}>Back to Home</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.formContainer}>
          <Text style={styles.questionText}>Are you satisfied with our Service?</Text>
          <View style={styles.starContainer}>
            {[1, 2, 3, 4, 5].map((starCount, index) => (
              <TouchableOpacity
                key={starCount}
                onPress={() => handleStarClick(starCount)}
                style={[styles.starIcon, index !== 0 && { marginLeft: 10 }]}
              >
                {starCount <= rating ? (
                  <FontAwesome name="star" size={40} color="#CC313D" />
                ) : (
                  <FontAwesome name="star-o" size={40} color="#CC313D" />
                )}
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.questionText}>Tell us what can be improved.</Text>
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
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  submittedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 0,
  },
  submittedContent: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    width: '100%',
  },
  questionText: {
    marginTop: 20,
    marginBottom: 20,
  },
  starContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  starIcon: {
    marginRight: 15,
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    height: 200,
  },
  submitButton: {
    backgroundColor: '#CC313D',
    padding: 10,
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 30,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  thankYouText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 15,
  },
  feedbackSubmittedText: {
    fontSize: 15,
    marginBottom: 15,
    width: '100%',
    textAlign: 'center',
  },
  backToHomeButton: {
    marginTop: 20,
  },
  backToHomeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#CC313D',
  },
});

export default Feedback;
