import { View, Text,StyleSheet , TouchableOpacity } from 'react-native';

const CurrentQueue = ({queueNumber,address,partyNumber,image,navigation}) => {
    const pressDetail=()=>{
        // navigate to 'QueueConfirm' page.
        
        console.log("pressed pressDetail");
    }
    return (
    <View style={styles.container}> 
        <View>
        <Text style={styles.title}>Currently in <Text style={styles.titleNumber}>3rd{queueNumber}</Text> in line!</Text>
        <View style={styles.resInfo}>
            <Text style={styles.resInfoTxt}>Address{address}</Text>
            <Text style={styles.resInfoTxt}>Party of number{partyNumber}</Text>
        </View>
        <TouchableOpacity style={styles.btnDetail}>
            <Text style={styles.fontDetail} onPress={pressDetail}>View Detail</Text>
        </TouchableOpacity>
        </View>
        <View>     
        <Text>image{image}</Text>
        </View>
    </View>
    );
    }

    const styles = StyleSheet.create({
    container: {
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: '#FEEEEF',
        borderRadius: 10,
        paddingHorizontal: 10,
        padding: 20,
        flexDirection: 'row',
        width:'95%',
    },
    resInfo: {
        flexDirection: 'row',
    },
    title: {
        fontWeight: 'bold',
    },
    titleNumber: {
        color: '#CC313D',
    },
    resInfoTxt: {
        color: 'grey',
        paddingRight: 10,
    },
    btnDetail: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 3,
        alignItems: 'center',
        width: 100,
        marginTop:5,
    },
    fontDetail: {
        fontSize: 15,
    },
    restaurantImage: {
        width: 100,
        height: 100,
    },
    });

export default CurrentQueue;