import React, { useEffect } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import IconMat from 'react-native-vector-icons/MaterialIcons';

const bearerToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkF2MGE3ZlBTWjVpcE9aNE9jMGQzIiwicm9sZSI6InVzZXIiLCJpYXQiOjE2OTI2NzQwMjIsImV4cCI6MTY5MjY3NzYyMn0.jH_sfFp-S2khkiRPik2e2JT_ktmt4EF20ZOasD0wQ4c'

const EditProfile = () => {

    const retrieveCurrentUserData = () => {
        fetch('https://app-57vwexmexq-uc.a.run.app/api/users/current', {
            method: 'GET', 

            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                Authorization: `Bearer ${bearerToken}`
            }
        })
        .then((response) => response.text())
        .then((data) => {
            if (data) {
                console.log("there is data! it is: ", data);
            }
        })
        .catch((error) => {
            console.log("error is: ", error);
        })
    }

    useEffect( () => {
        retrieveCurrentUserData();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.user}>
                <IconMat name="circle" size={90} color="#CC313D" />
            </View>
            <View style={styles.infoContainer}>
                <ProfileInput label="Name" />
                <ProfileInput label="Phone Number" />
                <ProfileInput label="Email" />
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
