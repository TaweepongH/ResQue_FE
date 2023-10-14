

const RegisterAPI = (registrationData, socialToken) => {

    if (
        registrationData.hasOwnProperty('email') &&
        registrationData.hasOwnProperty('password') ||
        registrationData.hasOwnProperty('email') &&
        socialToken
    ) {
        console.log(`valid user: ${registrationData.email} ${registrationData.firstName} ${registrationData.lastName}`)
    } else {
        console.log('invalid user.');
        return;
    }

    let registrationBody = {};
    if (socialToken) {

        registrationBody = {
            email: `${userData.email}`,
            firstName: `${userData.givenName}`,
            lastName: `${userData.familyName}`, 
            active: true,
            socialMediaToken: `${userData.id}`
        }
        
    } else {

        registrationBody = {
            email: `${registrationData.email}`,
            password: `${registrationData.password}`,
            firstName: `${registrationData.firstName}`,
            lastName: `${registrationData.lastName}`, 
            active: true
        }

    }

    console.log('User Email:', registrationData.email);
    console.log('User Password:', registrationData.password);
    console.log('user first name: ', registrationData.firstName);
    console.log('user last name: ', registrationData.lastName);

    if (password !== confirmPassword) {
      Alert.alert('Passwords do not match.');
      return;
    } else {
      fetch(`https://app-57vwexmexq-uc.a.run.app/api/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(registrationBody),
      }).then((response) => response.text())
        .then((data) => {

          console.log("registration data: ", data);

          // if the email entered is already registered
          if (JSON.parse(data).message === "User is already registered!") {
            
            console.log("testing... ");
            // Alert.alert(JSON.parse(data).message);

          }

          // if the data returns an object with an ID key, the user has successfully registered
          if (JSON.parse(data).id) {

            Alert.alert("Success! Thank you. Redirecting you to the Login page");
            // navigate to the login component only after successfully registering
            navigation.navigate('LoginEmail');

          }

        }).catch((error) => {
          console.error('Error:', error);
        });
    }

  }

  export default RegisterAPI;