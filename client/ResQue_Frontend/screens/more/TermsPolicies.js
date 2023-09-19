import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const TermsPolicies = () => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.header}>Terms and Policies</Text>
            <Text style={styles.intro}>
                Welcome to ResQue! By accessing or using our platform ("ResQue"), you agree to abide by the following terms:
            </Text>

            {/* Terms and Policies Sections */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>1. General:</Text>
                <View style={styles.subSection}>
                    <Text>"ResQue" is a service that facilitates virtual queuing for various events and appointments.</Text>
                    <Text>You must be at least 13 years old to use "ResQue" or have parental consent.</Text>
                    <Text>You are responsible for the accuracy of the information you provide during registration and use.</Text>
                </View>
                <Text style={styles.sectionTitle}>2.Queuing Process:</Text>
                <View style={styles.subSection}>
                    <Text>"ResQue" enables users to join and manage virtual queues for events and appointments.</Text>
                    <Text>Users can join queues remotely, and their positions will be maintained until they check-in or cancel their queue reservation.</Text>
                </View>
                <Text style={styles.sectionTitle}>3.Cancellation Policy:</Text>
                <View style={styles.subSection}>
                    <Text>Users can cancel their queue reservations at any time through the app.</Text>
                    <Text>Once a queue reservation is canceled, the user's position will be released to other participants.</Text>
                </View>
                <Text style={styles.sectionTitle}>4.Queue Notifications:</Text>
                <View style={styles.subSection}>
                    <Text>"ResQue" may send notifications and updates related to your queued events and appointments.</Text>
                    <Text>Users can customize notification preferences within the app settings.</Text>
                </View>
                <Text style={styles.sectionTitle}>5.User Conduct:</Text>
                <View style={styles.subSection}>
                    <Text>Users must not engage in any activities that may disrupt the "ResQue" service or violate our policies.</Text>
                    <Text>Harassment, spam, or abusive behavior towards other users is strictly prohibited.</Text>
                </View>
                <Text style={styles.sectionTitle}>6.Limitation of Liability:</Text>
                <View style={styles.subSection}>
                    <Text>"ResQue" is not liable for any disruptions, technical issues, or losses resulting from the use of our service.</Text>
                    <Text>Users join queues at their own risk and discretion.</Text>
                </View>
                <Text style={styles.sectionTitle}>7.Privacy:</Text>
                <View style={styles.subSection}>
                    <Text>"ResQue" respects user privacy and complies with applicable data protection laws.</Text>
                    <Text>For more details, please refer to our Privacy Policy.</Text>
                </View>
                <Text style={styles.sectionTitle}>8.Intellectual Property:</Text>
                <View style={styles.subSection}>
                    <Text>All intellectual property rights related to "ResQue" remain with the company.</Text>
                    <Text>Users may not use, copy, or distribute our content without permission.</Text>
                </View>
                <Text style={styles.sectionTitle}>9.Modifications:</Text>
                <View style={styles.subSection}>
                    <Text>"ResQue" reserves the right to update or modify these terms at any time.</Text>
                    <Text>Users will be notified of any significant changes.</Text>
                </View>
                <Text style={styles.sectionTitle}>10.Termination:</Text>
                <View style={styles.subSection}>
                    <Text>"ResQue" may terminate user access in case of policy violations or misuse.</Text>
                    <Text>Remember to review and familiarize yourself with our Terms of Service. If you have any questions or concerns, feel free to reach out to our support team.</Text>
                    <Text>Thank you for using "ResQue"! Enjoy your queueing experience.</Text>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        paddingHorizontal: 20,
        backgroundColor:'white',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    intro: {
        marginBottom: 20,
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 2,
    },
    subSection: {
        marginLeft: 10,
        marginBottom:10,
    },
});

export default TermsPolicies;
