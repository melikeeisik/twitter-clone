// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore} from '@firebase/firestore';
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCWXet00VhGZUD3QAyUlpYv_bNmutISnZU",
  authDomain: "clone-twitter-ce95b.firebaseapp.com",
  projectId: "clone-twitter-ce95b",
  storageBucket: "clone-twitter-ce95b.appspot.com",
  messagingSenderId: "639190313426",
  appId: "1:639190313426:web:8d6ab93282b9e50e19c00b",
  measurementId: "G-4P30DSRZH2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app)
export const db = getFirestore(app)