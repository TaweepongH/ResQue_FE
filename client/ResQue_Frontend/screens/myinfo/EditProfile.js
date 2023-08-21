import React from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import IconMat from 'react-native-vector-icons/MaterialIcons';


const EditProfile = () => {
    return (
        <View style={styles.container}>
            <View style={styles.user}>
                <IconMat name="circle" size={90} color="#CC313D" />
            </View>
            <TextInput>?</TextInput>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
    }
});

export default EditProfile;

