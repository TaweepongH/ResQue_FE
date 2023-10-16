import { Alert } from "react-native";

const RegisterAPI = async (registrationData) => {

    let registrationBody = {
        email: `${registrationData.email}`,
        firstName: `${registrationData.givenName}`,
        lastName: `${registrationData.familyName}`, 
        active: true,
    };
    if (registrationData.hasOwnProperty('socialMediaToken')) {
        registrationBody.socialMediaToken = `${registrationData.socialMediaToken}`;
        
    } else {
        registrationBody.password = `${registrationData.password}`
    }

    try {
        const response = await fetch(`https://app-57vwexmexq-uc.a.run.app/api/users/register`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify(registrationBody),
          })
    
        const data = await response.json();  

        if (response) {
            return response;
        } else {
            Alert.alert(data.title, data.message); 
        }

    } catch (error) {
        console.log("error: ", error);
    }
    
}

  export default RegisterAPI;