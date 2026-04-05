import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom'; // ✅ only once
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in:", userCredential.user);
      navigate("/chat"); // ✅ redirects to ChatPage
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-control">
          <input
            id="username"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="username">
            {'Email'.split('').map((char, i) => (
              <span key={i} style={{ transitionDelay: `${i * 50}ms` }}>{char}</span>
            ))}
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
            {'Password'.split('').map((char, i) => (
              <span key={i} style={{ transitionDelay: `${i * 50}ms` }}>{char}</span>
            ))}
          </label>
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Logging in..." : "Log in"}
        </button>

        <Link to="/Signup">
          <button type="button" className="submit-btn">
            Sign up
          </button>
        </Link>
      </form>
    </div>
  );
}

export default Login;