// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "@firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyBJAta7sfTMBPjM9SWJKo6W5KQPu1kKLaU",
  authDomain: "react-app-edc94.firebaseapp.com",
  projectId: "react-app-edc94",
  storageBucket: "react-app-edc94.appspot.com",
  messagingSenderId: "288362416337",
  appId: "1:288362416337:web:9ae7e5d07da41f23b65df0",
  measurementId: "G-58HFCXZTW8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const firestore = getFirestore(app)