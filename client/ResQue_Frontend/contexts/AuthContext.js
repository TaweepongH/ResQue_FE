import {createContext, useContext, useState} from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    
    // User Authentication contexts
    // the password context may have to be removed becuase storing password data on the client side can be dangerous
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

    // pwrd reset contexts
    const [confirmationCode, setConfirmationCode] = useState('');

    const setConfirmationCodeContext = (value) => {
        setConfirmationCode(value);
    }

    // queries for Search function

    const [query, setQuery] = useState([]);

    const setQueryContext = (value) => {
        setQuery(value);
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
                setLatLongContext,
                // pwrd reset
                confirmationCode,
                setConfirmationCodeContext, 
                // restaurants/search
                query,
                setQueryContext
            }}
        >

            {children}

        </AuthContext.Provider>
    )

}

export const useAuth = () => {
    return useContext(AuthContext);
};