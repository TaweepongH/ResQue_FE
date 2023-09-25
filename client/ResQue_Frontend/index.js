/**
 * @format
 */

import { AppRegistry } from 'react-native';

import App from './App';
import { name as appName } from './app.json';
import Login from './Components/Login';
import { AuthProvider } from './contexts/AuthContext';
import { PartnerProvider } from './contexts/PartnerContext';

// AppRegistry.registerComponent(appName, () =>  App);

const AppWithAuthProvider = () => (
    <AuthProvider>
        
            <App />
        
    </AuthProvider>
  );
  
  AppRegistry.registerComponent(appName, () => AppWithAuthProvider);
