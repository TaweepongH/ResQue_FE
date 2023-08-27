import {createContext, useContext, useState} from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

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

    return (
        <AuthContext.Provider
            value={{
                bearerToken,
                password,
                email,
                setBearerTokenContext,
                setPasswordContext,
                setEmailContext
            }}
        >

            {children}

        </AuthContext.Provider>
    )

}

export const useAuth = () => {
    return useContext(AuthContext);
};