import React, { useEffect, useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import IconMat from 'react-native-vector-icons/MaterialIcons';



const EditProfile = () => {

    const [bearerToken, setBearerToken] = useState();
    const [userData, setUserData] = useState({});
    const [editedData, setEditedData] = useState('');

    const obtainBearerToken = () => {
        fetch('https://app-57vwexmexq-uc.a.run.app/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            }, 
            // Use the 'body' property to send data as JSON
            body: JSON.stringify({
                "email": "hello@hii.com",
                "password": "999999999"
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

    const retrieveCurrentUserData = () => {
        if (bearerToken) {
            fetch('https://app-57vwexmexq-uc.a.run.app/api/users/current', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    Authorization: `Bearer ${bearerToken}`,
                },
            })
            .then((response) => response.json())
            .then((data) => {
                if (data) {
                    console.log("there is data from the current user API! it is: ", data);
                    setUserData(data);
                } else {
                    console.log("there is no data from the current user API...");
                }
            })
            .catch((error) => {
                console.log("error from the current user API fetch is: ", error);
            });
        }
    }

    const editUserData = () => {
        fetch('https://app-57vwexmexq-uc.a.run.app/api/users/current', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                Authorization: `Bearer ${bearerToken}`,
            }, 
            // Use the 'body' property to send data as JSON
            body: JSON.stringify({
                "email": editedData.email,
                "password": "99999999"
            })
            .then((response) => response.json())
            .then((data) => {
                if (data) {
                    console.log("there is data from the edit user data API! it is: ", data);
                    setUserData(data);
                } else {
                    console.log("there is no data from edit user data API...");
                }
            })
            .catch((error) => {
                console.log("Error, the error from the edit user data API is: ", error);
            })

        })
    }

    useEffect( () => {
        obtainBearerToken();
    }, []);

    useEffect( () => {
        retrieveCurrentUserData()
    }, [bearerToken]);

    // Update the editedData state when the input changes
    const handleInputChange = (value, field) => {
        setEditedData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
        console.log("new User data: ", editedData);
    };

    // Call editUserData when the edit button is pressed
    const handleEditButtonPress = () => {
        editUserData();
    };

    return (
        <View style={styles.container}>

            <View style={styles.user}>
                <IconMat name="circle" size={90} color="#CC313D" />
            </View>
            
            <View style={styles.infoContainer}>
                <Text>First Name</Text>
                <ProfileInput 
                    label= {userData.firstName} 
                    onChangeText={(text) => handleInputChange(text, 'firstName')}
                />
                <Text>Last Name</Text>
                <ProfileInput 
                    label= {userData.lastName} 
                    onChangeText={(text) => handleInputChange(text, 'lastName')}
                /> 
                <Text>Phone Number</Text>
                <ProfileInput 
                    label= {userData.phone} 
                    onChangeText={(text) => handleInputChange(text, 'lastName')}
                />
                <Text>Email</Text>
                <ProfileInput 
                    label= {userData.email} 
                    onChangeText={(text) => handleInputChange(text, 'lastName')}
                />
            </View>
            <TouchableOpacity style={styles.editButton} onPress={handleEditButtonPress}>
                <Text style={styles.editText}>Edit</Text>
            </TouchableOpacity>
            {/* <EditButton onPress={handleEditButtonPress} /> */}
        </View>
    );
};

const ProfileInput = ({ label }) => (
    <TextInput style={styles.input} placeholder={label} />
);

// const EditButton = () => (
//     <TouchableOpacity style={styles.editButton} onPress={onPress}>
//         <Text style={styles.editText}>Edit</Text>
//     </TouchableOpacity>
// );

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
