import { Alert } from "react-native";

const LoginAPI = async (userData, setBearerTokenContext, setEmailContext) => {

    let loginFields = {
        email: userData.email
    }
    if (userData.hasOwnProperty('socialMediaToken')) {
        loginFields.socialMediaToken = userData.socialMediaToken;
        
    } else {
        loginFields.password = userData.password;
    }

    try {

        const response = await fetch(`https://app-57vwexmexq-uc.a.run.app/api/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify(loginFields),
        })
  
        const data = await response.json();
  
        console.log("data: ", data); 
    
        if (response.ok && data.accessToken) {
      
          setBearerTokenContext(data.accessToken)
          setEmailContext(userData.email);
          
        } else {
          Alert.alert(data.title, data.message);
        }
        
      } catch (error) {
    
        console.error("Error:", error);
    
      }
    
}


export default LoginAPI;
