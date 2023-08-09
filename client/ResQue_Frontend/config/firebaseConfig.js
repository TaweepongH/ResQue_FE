import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA-gJpr4X_9Lk4Fsaj0VIUN1lnJa97tIks",
    authDomain: "resqproject-8d5ae.firebaseapp.com",
    projectId: "resqproject-8d5ae",
    storageBucket: "resqproject-8d5ae.appspot.com",
    messagingSenderId: "350964133055",
    appId: "1:350964133055:web:b7d24ca75d2b4a4f772a0a",
    measurementId: "G-D55NCLTSW3"
  };

// Initialize Firebase app
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;