import React, { useEffect, useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import IconMat from 'react-native-vector-icons/MaterialIcons';
// import { NavigationContainer } from '@react-navigation/native';
// to do. obtain the bearer token and user password in another file, either the login or register or both. set them as global variables and send them here. will probably do this with react Context

const EditProfile = ({ navigation, route }) => {

    const [bearerToken, setBearerToken] = useState();
    const [editedData, setEditedData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
    });

    console.log(route);

    const obtainBearerToken = () => {
        fetch('https://app-57vwexmexq-uc.a.run.app/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            }, 
            // Use the 'body' property to send data as JSON
            body: JSON.stringify({
                "email": "haha@gmail.com",
                "password": "hehe"
            })
        })
        .then((response) => response.text())
        .then((data) => {
            if (data) {
                console.log("there is data from the login API! it is: ", data);
                setBearerToken(JSON.parse(data).accessToken);
            } else {
                console.log("there is no data from the login API...");
            }
        })
        .catch((error) => {
            console.log("error from the login API is: ", error);
        })
    }

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
                "password": "999999999"
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

    useEffect( () => {
        obtainBearerToken();
    }, []);

    // Update the editedData state when the input changes
    const handleInputChange = (value, field) => {
        setEditedData((prevData) => {
            const updatedData = { ...prevData, [field]: value };
            
            return updatedData; // Return the updated state
        });

        console.log("value: ", value);
        
    };

    // Call editUserData when the edit button is pressed
    const handleEditButtonPress = () => {
        editUserData();
    };

    return (
        <View style={styles.container}>
            <View styles={styles.userInputContainer} >
                        
            </View>
            <View style={styles.userProfile}>
                <Text style={styles.profileText}>
                    {route.params.firstName[0].toUpperCase()}
                    {route.params.lastName[0].toUpperCase()}
                </Text>     
            </View>
            <ProfileInput 
                label="First Name"
                placeholderText={route.params.firstName}
                onChangeText={(text) => handleInputChange(text, 'firstName')}
            />
            <ProfileInput 
                label="Last Name"
                placeholderText={route.params.lastName}
                onChangeText={(text) => handleInputChange(text, 'lastName')}
            />
            <ProfileInput 
                label="Phone Number"
                placeholderText=""
                onChangeText={(text) => handleInputChange(text, 'phone')}
            />
            <ProfileInput 
                label="Email"
                placeholderText={route.params.email}
                onChangeText={(text) => handleInputChange(text, 'email')}
            />
            <TouchableOpacity style={styles.editButton} onPress={handleEditButtonPress}>
                <Text style={styles.editText}>Edit</Text>
            </TouchableOpacity>
            {/* <EditButton onPress={handleEditButtonPress} /> */}
        </View>
    );
};

const ProfileInput = ({ label, placeholderText}) => (
    <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>{label}</Text>
        <TextInput 
            placeholder= {placeholderText}
            style={styles.infoInput}
        />
    </View> 
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FEEEEF',
        alignItems: 'center',
        padding: 20,
        position: 'relative',
    },
    userProfile: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 90,
        aspectRatio: 1,
        backgroundColor: "#CC313D",
        borderRadius: 45,
        marginTop: 20,
        marginBottom: 30,
    },
    profileText: {
        fontSize: 48,
        fontWeight: 'bold',
        color: "#FEEEEF",
    },
    user: {
        marginBottom: 20,
        marginTop: 40,
    },
    infoContainer: {
        backgroundColor: 'white',
        width: '95%', 
        height: 55,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        borderRadius: 5,
    },
    infoLabel: {
        width: '50%',
        fontSize: 18,
        color: '#343434'
    },
    infoInput: {
        width: '50%',
        fontSize: 18, 
        textAlign: 'right',
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
