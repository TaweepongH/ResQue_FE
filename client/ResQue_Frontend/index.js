/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import Login from './Components/Login';
import {name as appName} from './app.json';
import Main from './Components/Main';

AppRegistry.registerComponent(appName, () => Login);
AppRegistry.registerComponent(appName, () => Main);
