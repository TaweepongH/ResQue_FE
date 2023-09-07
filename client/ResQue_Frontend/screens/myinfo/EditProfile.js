import React, { useEffect, useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import IconMat from 'react-native-vector-icons/MaterialIcons';
import { useAuth } from '../../contexts/AuthContext.js';


const EditProfile = () => {

    const { bearerToken, password, setBearerTokenContext } = useAuth();
    const [editedData, setEditedData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
    });

    const navigation = useNavigation();

    const editUserData = () => {
        fetch('https://app-57vwexmexq-uc.a.run.app/api/users/current', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                Authorization: `Bearer ${bearerToken}`,
            }, 
            // email and password are required to update user data
            body: JSON.stringify({
                "firstName": editedData.firstName,
                "lastName": editedData.lastName,
                "phone": editedData.phone,
                "email": editedData.email, 
                "password": password
            })
        })
        .then((response) => response.json())
        .then((data) => {
            if (data) {
                console.log("there is data from the edit user data API! it is: ", data);
                console.log("edited user data: ", editedData);
            } else {
                console.log("there is no data from edit user data API...");
            }
        })
        .catch((error) => {
            console.log("Error, the error from the edit user data API is: ", error);
        })
    }

    // Update the editedData state when the input changes
    const handleInputChange = (value, field) => {
        setEditedData((prevData) => {
            const updatedData = { ...prevData, [field]: value };
            
            return updatedData; // Return the updated state
        });

        console.log("value: ", value);
        
    };

    // to do: create an alert asking if the user is sure they want to edit their data
    const handleEditButtonPress = () => {
        editUserData();
        navigation.navigate('MyInfo');
    };

    return (
        <View style={styles.container}>

            <View style={styles.user}>
                <IconMat name="circle" size={90} color="#CC313D" />
            </View>
            
            <View style={styles.infoContainer}>
                <Text>First Name</Text>
                <ProfileInput 
                    // label= "name" 
                    onChangeText={(text) => handleInputChange(text, 'firstName')}
                />
                <Text>Last Name</Text>
                <ProfileInput 
                    // label= {userData.lastName} 
                    onChangeText={(text) => handleInputChange(text, 'lastName')}
                /> 
                <Text>Phone Number</Text>
                <ProfileInput 
                    // label= {userData.phone} 
                    onChangeText={(text) => handleInputChange(text, 'phone')}
                />
                <Text>Email</Text>
                <ProfileInput 
                    // label= {userData.email} 
                    onChangeText={(text) => handleInputChange(text, 'email')}
                />
            </View>
            <TouchableOpacity style={styles.editButton} onPress={handleEditButtonPress}>
                <Text style={styles.editText}>Edit</Text>
            </TouchableOpacity>
            {/* <EditButton onPress={handleEditButtonPress} /> */}
        </View>
    );
};

const ProfileInput = ({ label, onChangeText }) => (
    <TextInput
    style={styles.input}
    placeholder={label}
    value={label} // Set the value to the label
    onChangeText={onChangeText}
/>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FEEEEF',
        alignItems: 'center',
        padding: 20,
        position: 'relative',
    },
    user: {
        marginBottom: 20,
        marginTop: 40,
    },
    infoContainer: {
        width: '95%',
    },
    input: {
        backgroundColor: 'white',
        borderRadius: 3,
        marginBottom: 15,
        padding: 15,
    },
    editButton: {
        backgroundColor: '#CC313D',
        borderRadius: 3,
        padding: 10,
        marginTop: 20,
        width: '80%',
    },
    editText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 18,
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 1,
    },
});

export default EditProfile;
