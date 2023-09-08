import {createContext, useContext, useState} from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    
    // User Authentication contexts
    const [bearerToken, setBearerToken] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const setBearerTokenContext = (value) => {
        setBearerToken(value);
    }

    const setPasswordContext = (value) => {
        setPassword(value);
    }

    const setEmailContext = (value) => {
        setEmail(value);
    }

    // Location contexts
    const [latLong, setLatLong] = useState({});

    const setLatLongContext = (lat, long) => {
        setLatLong({latitude: lat, longitude: long});
    }

    return (
        <AuthContext.Provider
            value={{
                // user auth
                bearerToken,
                password,
                email,
                setBearerTokenContext,
                setPasswordContext,
                setEmailContext, 
                // location
                latLong, 
                setLatLongContext
            }}
        >

            {children}

        </AuthContext.Provider>
    )

}

export const useAuth = () => {
    return useContext(AuthContext);
};