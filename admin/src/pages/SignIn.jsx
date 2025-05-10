import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { AdminContext } from '../context/AdminContext';
import { toast } from 'react-toastify';
import '../styles/SignIn.css'; // Import the CSS file

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false); // Add loading state
  const [error, setError] = useState(null);   // Add error state
  const navigate = useNavigate();
  const [backendUrl, setBackendUrl] = useState(''); // Initialize backendUrl state
  const { setAToken } = useContext(AdminContext);

  // **IMPORTANT: Replace with your actual backend API URL if not using VITE_MONGO**
  const FALLBACK_BACKEND_URL = 'http://localhost:3000'; // Example: Change this to your backend URL

  useEffect(() => {
    // Set backendUrl from environment variable or fallback
    setBackendUrl(import.meta.env.VITE_MONGO || FALLBACK_BACKEND_URL || '');
    if (!import.meta.env.VITE_MONGO && !FALLBACK_BACKEND_URL) {
      console.warn("Warning: VITE_MONGO environment variable and fallback URL are not set in the frontend!");
    } else if (!import.meta.env.VITE_MONGO) {
      console.log("Backend URL using fallback:", FALLBACK_BACKEND_URL);
    } else {
      console.log("Backend URL from env:", import.meta.env.VITE_MONGO);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!backendUrl) {
      toast.error("Backend URL is not configured!");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { data } = await axios.post(`${backendUrl}/api/auth/admin-login`, {
        email,
        password,
      });
      setLoading(false);
      if (data.success) {
        toast.success('Welcome Admin!');
        setAToken(data.aToken); // Assuming you are storing an admin token
        navigate('/admin/home'); // This is the redirection
      } else if (data.message) {
        setError(data.message);
      } else {
        setError('Login failed');
      }
    } catch (error) {
      setLoading(false);
      const errorMessage = error.response?.data?.message || 'Something went wrong during login';
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };


  return (
    <div className="signin-container">
      <div className="signin-card">
        <div className="signin-header">
          <h2>Admin Sign In</h2>
          <p>
            Or{' '}
            <Link to="/admin/signup">create an admin account</Link>
          </p>
        </div>
        <form className="signin-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="form-control"
                placeholder="Email address"
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="form-control"
                placeholder="Password"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="remember-forgot">
            <div className="remember-me">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
              />
              <label htmlFor="remember-me">Remember me</label>
            </div>

            <div className="forgot-password">
              <Link to="#">Forgot your password?</Link>
            </div>
          </div>

          <div className="signin-button-container">
            <button
              type="submit"
              className="signin-button"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                {/* Heroicon name: solid/lock-closed */}
                <svg
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2h1a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2h1zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;