import React, { useEffect, useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import IconMat from 'react-native-vector-icons/MaterialIcons';



const EditProfile = () => {

    const [bearerToken, setBearerToken] = useState();
    const [userData, setUserData] = useState({});

    const obtainBearerToken = () => {
        fetch('https://app-57vwexmexq-uc.a.run.app/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            }, 
            // Use the 'body' property to send data as JSON
            body: JSON.stringify({
                "email": "hello@hii.com",
                "password": "99999999"
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

    useEffect( () => {
        obtainBearerToken();
        
    }, []);

    useEffect( () => {
        retrieveCurrentUserData()
    }, [bearerToken]);

    return (
        <View style={styles.container}>

            <View style={styles.user}>
                <IconMat name="circle" size={90} color="#CC313D" />
            </View>
            
            <View style={styles.infoContainer}>
                <ProfileInput label= {userData.firstName} /> 
                <ProfileInput label= {userData.phone} />
                <ProfileInput label= {userData.email} />
            </View>
            <EditButton />
        </View>
    );
};

const ProfileInput = ({ label }) => (
    <TextInput style={styles.input} placeholder={label} />
);

const EditButton = () => (
    <TouchableOpacity style={styles.editButton}>
        <Text style={styles.editText}>Edit</Text>
    </TouchableOpacity>
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
