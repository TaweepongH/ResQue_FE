import React, { useEffect, useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import IconMat from 'react-native-vector-icons/MaterialIcons';
import { useAuth } from '../../contexts/AuthContext.js';


const EditProfile = ({ navigation, route }) => {

    const { bearerToken, password, setBearerTokenContext } = useAuth();
    const [editedData, setEditedData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
    });

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
            console.log("value:", value); // Log the value here
            return updatedData; // Return the updated state
        });
    };

    // to do: create an alert asking if the user is sure they want to edit their data
    const handleEditButtonPress = () => {
        editUserData();
        
        Alert.alert(
            'Confirm Changes',
            'Are you sure you want to edit your information?',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {
                text: 'Confirm',
                onPress: () => {

                  navigation.navigate('MyInfo');

                },
                style: 'destructive',
              },
            ],
            { cancelable: false }
        );
        
    };

    useEffect(() => {
        console.log("route data: ", route.params);
    }, []);

    return (
        <View style={styles.container}>
            <View styles={styles.userInputContainer} >
                        
            </View>
            <View style={styles.userProfile}>
                <Text style={styles.profileText}>
                    {route.params.firstName ? route.params.firstName[0].toUpperCase() : " "}
                    {route.params.lastName ? route.params.lastName[0].toUpperCase() : " "}
                </Text>     
            </View>

            <View style={styles.infoContainer}>
                <Text style={styles.infoLabel}>First Name</Text>
                    <TextInput
                        // label="First Name"
                        placeholder={route.params.firstName} 
                        style={styles.infoInput} 
                        onChangeText={(text) => handleInputChange(text, 'firstName')}
                    />
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.infoLabel}>Last Name</Text>
                    <TextInput
                        placeholder={route.params.lastName}
                        style={styles.infoInput} 
                        onChangeText={(text) => handleInputChange(text, 'lastName')}
                    />
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.infoLabel}>Phone Number</Text>
                    <TextInput 
                        placeholder={route.params.phone}
                        style={styles.infoInput} 
                        onChangeText={(text) => handleInputChange(text, 'phone')}
                    />
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.infoLabel}>Email</Text>
                    <TextInput 
                        placeholder={route.params.email}
                        style={styles.infoInput} 
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

// const ProfileInput = ({ label, placeholderText}) => (
//     <View style={styles.infoContainer}>
//         <Text style={styles.infoLabel}>{label}</Text>
//         <TextInput 
//             placeholder= {placeholderText}
//             style={styles.infoInput}
//         />
//     </View> 
// );

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
        marginTop: 20,
        width: '50%',
        fontSize: 18, 
        textAlign: 'right',
        marginBottom: 10,
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
