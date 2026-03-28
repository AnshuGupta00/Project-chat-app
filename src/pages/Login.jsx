import React, { useState } from 'react'
import './Login.css'
import { Link } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { getAuth } from "firebase/auth";



async function loglogin(user) {
   await addDoc(collection(db, "loginHistory"), {
    uid: user.uid,
    email: user.email,
    timestamp: new Date()
  });
}


function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    // TODO: handle login (send to server, update auth state, etc.)
    console.log('submit username:', username, 'password:', password)
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,     // ✅ correct value
        password
      )

      console.log("User logged in:", userCredential.user)
      alert("Login successful!")

    } catch (error) {
      console.error(error)
      alert(error.message)
    }
  }

  const login = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(console.log("User logged in:")).catch((error) => {
        alert(error.message);
      });
  }
  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-control">
          <input
            id="username"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onClick={signInWithEmailAndPassword}
            required
          />
          <label htmlFor="username">
            <span style={{ transitionDelay: '0ms' }}>E</span>
            <span style={{ transitionDelay: '50ms' }}>m</span>
            <span style={{ transitionDelay: '100ms' }}>a</span>
            <span style={{ transitionDelay: '150ms' }}>i</span>
            <span style={{ transitionDelay: '200ms' }}>l</span>
          </label>
        </div>

        <div className="form-control">
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onClick={signInWithEmailAndPassword}
            required
          />
          <label htmlFor="password">
            <span style={{ transitionDelay: '0ms' }}>P</span>
            <span style={{ transitionDelay: '50ms' }}>a</span>
            <span style={{ transitionDelay: '100ms' }}>s</span>
            <span style={{ transitionDelay: '150ms' }}>s</span>
            <span style={{ transitionDelay: '200ms' }}>w</span>
            <span style={{ transitionDelay: '250ms' }}>o</span>
            <span style={{ transitionDelay: '300ms' }}>r</span>
            <span style={{ transitionDelay: '350ms' }}>d</span>
          </label>
        </div>

        <button type="submit" className="submit-btn">
          Log in
        </button>

        <Link to="/Signup">
          <button type="submit" className="submit-btn">
            Sign up
          </button>
        </Link>
      </form>
    </div>
  )
}

export default Login