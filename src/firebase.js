// 🔥 Import core Firebase
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// 🔥 Services
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";

// 🔑 Config
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

// ✅ Initialize app
const app = initializeApp(firebaseConfig);

// ✅ Export services (ONLY HERE)
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);