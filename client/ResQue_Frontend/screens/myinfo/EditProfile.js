import React, { useEffect, useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../../contexts/AuthContext.js';
import CustomModal from '../../Components/CustomModal.js';
import { theme } from '../../styles/theme.js';


const EditProfile = ({ navigation, route }) => {

    const [modalVisible, setModalVisible] = useState(false);

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
                "firstName": editedData.firstName ? editedData.firstName : route.params.firstName,
                "lastName": editedData.lastName ? editedData.lastName : route.params.lastName,
                "phone": editedData.phone ? editedData.phone : route.params.phone,
                "email": editedData.email ? editedData.email : route.params.email, 
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

    const handleEditButtonPress = async () => {
        
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
                onPress: async () => {

                    try {
                
                        // we need to edit the userData well in advance of navigating to the myInfo screen, so we will show a loading screen in that time
                        editUserData();

                        //make the loading spinner visible now
                        setModalVisible(true);

                        setTimeout(() => {    
                            navigation.navigate('MyInfo');
                            setModalVisible(false);
                        }, 2000);
                        
                    } catch (error) {
                        Alert.alert(error);
                        console.error('Error editing user data:', error);
                    }

                },
                style: 'destructive',
              },
            ],
            { cancelable: false }
        );
        
    };

    return (
        
        <View style={styles.container}>
            <View styles={styles.userInputContainer} >
            <CustomModal visible={modalVisible} message="Editing Info..." />
            </View>
            <View style={styles.userProfile}>
                <Text style={styles.profileText}>
                    {route.params.firstName ? route.params.firstName[0].toUpperCase() : " "}
                    {route.params.lastName ? route.params.lastName[0].toUpperCase() : " "}
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
                placeholderText={route.params.phone} 
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

const ProfileInput = ({ label, placeholderText, onChangeText}) => (
    <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>{label}</Text>
        <TextInput 
            defaultValue={placeholderText}
            placeholder= {placeholderText}
            style={styles.infoInput}
            onChangeText={onChangeText}
            autoCapitalize="none"
        />
    </View> 
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.color.lightpink,
        alignItems: 'center',
        padding: 20,
        position: 'relative',
    },
    userProfile: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 90,
        aspectRatio: 1,
        backgroundColor: theme.color.red,
        borderRadius: 45,
        marginTop: 20,
        marginBottom: 30,
    },
    profileText: {
        fontSize: 48,
        fontWeight: 'bold',
        color: theme.color.lightpink,
    },
    user: {
        marginBottom: 20,
        marginTop: 40,
    },
    infoContainer: {
        backgroundColor: theme.color.white,
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
        fontFamily: theme.font.secondary,
        fontSize: theme.fontsize.lg,
        lineHeight: theme.fontsize.xl,
        color: theme.color.blackAlt,
    },
    infoInput: {
        marginTop: 8,
        width: '50%',
        fontFamily: theme.font.secondary,
        fontSize: theme.fontsize.lg,
        textAlign: 'right',
        marginBottom: 10,
    },
    editButton: {
        backgroundColor: theme.color.red,
        borderRadius: 5,
        padding: 10,
        marginTop: 20,
        width: '90%',
    },
    editText: {
        color: theme.color.white,
        textAlign: 'center',
        fontFamily: theme.font.primary,
        fontSize: theme.fontsize.xl,
        lineHeight: theme.fontsize.xxl,
    },
});

export default EditProfile;
