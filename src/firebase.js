// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage} from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB6bMt96bulkPt4y6-liQPVSU3IsJDMveM",
    authDomain: "kwik-e4784.firebaseapp.com",
    projectId: "kwik-e4784",
    storageBucket: "kwik-e4784.appspot.com",
    messagingSenderId: "750508784231",
    appId: "1:750508784231:web:a8770a1e84a305d21bb2c2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(); // Pass the 'app' instance to getAuth
export const storage = getStorage();
export const db = getFirestore(app);