import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

import { getFirestore, doc, getDoc } from "firebase/firestore";

const db = getFirestore();

const handleLogin = async () => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // ✅ Fetch user data from Firestore
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("User Data:", docSnap.data());
    }

  } catch (error) {
    console.log(error.message);
  }
};