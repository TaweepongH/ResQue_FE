import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const LoginEmail = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (text) => {
    setEmail(text);
  };
  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleSubmit = () => {
    // Perform the necessary logic when the form is submitted
    console.log('Email:', email);
     console.log('Password:', password);
  };

  return (
    <View>
      <Text>Log in with Email</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={handleEmailChange}
      />


      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        value={password}
        onChangeText={handlePasswordChange}
      />

      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = {
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
};

export default LoginEmail;
