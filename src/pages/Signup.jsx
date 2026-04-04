import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      // ✅ Step 1: Create Auth user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;
      // ✅ Fixed (camelCase)
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        firstName: firstName,  // lowercase f
        lastName: lastName,    // lowercase l
        email: email,
        createdAt: new Date(),
      });

      console.log("User saved in Firestore");
      alert("Signup successful!");

    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-amber-700 p-6 sm:p-8 rounded-lg shadow-md w-full max-w-sm"
      >
        <div className="flex flex-col gap-y-4">
          <h1 className="text-white text-xl font-bold text-center">
            Create Account
          </h1>

          <input
            type="text"
            placeholder="First Name"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white"
          />

          <input
            type="text"
            placeholder="Last Name"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white"
          />

          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white"
          />

          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white"
          />

          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}

export default Signup;