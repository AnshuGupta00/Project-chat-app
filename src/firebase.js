// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { data } from "autoprefixer";
import { getAuth } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";



const firebaseConfig = {
  apiKey: "AIzaSyBTwODVR5AoJTthhu1tlvzEtmBnEiI_soA",
  authDomain: "chatapp-react-668d7.firebaseapp.com",
  databaseURL: "https://chatapp-react-668d7-default-rtdb.firebaseio.com",
  projectId: "chatapp-react-668d7",
  storageBucket: "chatapp-react-668d7.firebasestorage.app",
  messagingSenderId: "76572846824",
  appId: "1:76572846824:web:8399230a47e27a18e1775d",
  measurementId: "G-P7RECC1TSV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);