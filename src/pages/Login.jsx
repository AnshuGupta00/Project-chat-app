import React, { useState } from 'react'
import './Login.css'
import { Link } from 'react-router-dom'
import Signup from './Signup.jsx'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const handleSubmit = (event) => {
    event.preventDefault()
    // TODO: handle login (send to server, update auth state, etc.)
    console.log('submit username:', username, 'password:', password)
  }
  
  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-control">
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label htmlFor="username">
            <span style={{ transitionDelay: '0ms' }}>U</span>
            <span style={{ transitionDelay: '50ms' }}>s</span>
            <span style={{ transitionDelay: '100ms' }}>e</span>
            <span style={{ transitionDelay: '150ms' }}>r</span>
            <span style={{ transitionDelay: '200ms' }}>n</span>
            <span style={{ transitionDelay: '250ms' }}>a</span>
            <span style={{ transitionDelay: '300ms' }}>m</span>
            <span style={{ transitionDelay: '350ms' }}>e</span>
          </label>
        </div>

       <div className="form-control">
  <input
    id="password"
    type="password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
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