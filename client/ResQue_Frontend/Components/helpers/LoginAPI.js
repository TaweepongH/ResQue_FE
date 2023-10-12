import { Alert } from "react-native";
// this api Login helper function is for our default login api, without the socialMediaToken field

const LoginAPI = async (userEmail, userPassword, setBearerTokenContext, setEmailContext, socialToken) => {

    let loginFields = {};
    if (socialToken) {
        loginFields = {
            email: userEmail,
            socialMediaToken: socialToken,
        }
    } else {
        loginFields = {
            email: userEmail,
            password: userPassword
        }
    }

    try {

        const response = await fetch(`https://app-57vwexmexq-uc.a.run.app/api/users/login`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json; charset=utf-8',
        },

        body: JSON.stringify(loginFields),
        })
  
        const data = await response.json();
  
        console.log("data: ", data); // Success message from the server
    
        // this is where we will define the bearerToken for the rest of our app to use
        // if there is an accessToken key in the data message, then we will set the bearerTokenContext to it
        if (response.ok && data.accessToken) {
      
          setBearerTokenContext(data.accessToken)
          setEmailContext(userEmail);
          
        } else {
          //error messages etc.
          
          Alert.alert(data.title, data.message);
        }
        
      } catch (error) {
    
        console.error("Error:", error);
    
      }
    
}


export default LoginAPI;
