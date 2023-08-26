import {createContext, useContext, useState} from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [bearerToken, setBearerToken] = useState('');
    const [password, setPassword] = useState('');

    const setBearerTokenContext = (value) => {
        setBearerToken(value);
    }

    const setPasswordContext = (value) => {
        setPassword(value);
    }

    return (
        <AuthContext.Provider
            value={{
                bearerToken,
                password,
                setBearerTokenContext,
                setPasswordContext,
            }}
        >

            {children}

        </AuthContext.Provider>
    )

}

export const useAuth = () => {
    return useContext(AuthContext);
};