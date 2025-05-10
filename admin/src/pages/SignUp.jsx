import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../styles/SignUp.css';

const AdminSignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [backendUrl, setBackendUrl] = useState('');

  useEffect(() => {
    setBackendUrl(import.meta.env.VITE_MONGO || '');
    if (!import.meta.env.VITE_MONGO) {
      console.warn("Warning: VITE_MONGO environment variable is not set in the frontend!");
    } else {
      console.log("Backend URL from env:", import.meta.env.VITE_MONGO);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!backendUrl) {
      toast.error("Backend URL is not configured!");
      return;
    }
    try {
      setLoading(true);
      const res = await fetch(`${backendUrl}/api/auth/admin-register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      toast.success('Admin registered successfully!');
      navigate('/admin/signin');
    } catch (error) {
      setLoading(false);
      setError(error.message || 'Something went wrong during registration');
      toast.error(error.message || 'Something went wrong during registration');
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="signup-header">
          <h2>Admin Sign Up</h2>
        </div>
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <div className="mt-1">
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                className="form-control"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="form-control"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="form-control"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="signup-button-container">
            <button
              type="submit"
              className="signup-button"
              disabled={loading}
            >
              {loading ? 'Signing Up...' : 'Sign Up Admin'}
            </button>
            {error && <p className="error-message">{error}</p>}
          </div>
        </form>
        <p className="signup-footer">
          Already have an account?
          <a href="/admin/signin">Sign in</a>
        </p>
      </div>
    </div>
  );
};

export default AdminSignUp;