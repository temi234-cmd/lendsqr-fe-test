import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.scss';
import logo from '../../assets/logo.svg';
import illustration from '../../assets/illustration.svg';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};
    if (!email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Enter a valid email';
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
   navigate('/dashboard');
  };

  return (
    <div className="login-page">
 <div className="login-page__left">
  <div className="login-logo">
    <img src={logo} alt="Lendsqr logo" height="30" />
  </div>
     <img
  className="login-illustration"
  src={illustration}
  alt="Login illustration"
/>
      </div>

      <div className="login-page__right">
        <div className="mobile-logo">
          <svg width="30" height="24" viewBox="0 0 30 24" fill="none">
            <rect width="14" height="14" rx="2" fill="#39CDCC"/>
            <rect x="4" y="4" width="14" height="14" rx="2" 
              fill="#213F7D" stroke="white" strokeWidth="1.5"/>
          </svg>
          <span>lendsqr</span>
        </div>
<div className="form-wrapper" style={{ width: '100%' }}>
  <h1 style={{ textAlign: 'left' }}>Welcome!</h1>
  <p style={{ textAlign: 'left' }}>Enter details to login.</p>
          <form className="login-form" onSubmit={handleSubmit} noValidate>
          <div>
            <div className="login-form__input-wrapper">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors(prev => ({ ...prev, email: undefined }));
                }}
              />
            </div>
            {errors.email && (
              <span className="login-form__error">{errors.email}</span>
            )}
          </div>

          <div>
            <div className="login-form__input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors(prev => ({ ...prev, password: undefined }));
                }}
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            {errors.password && (
              <span className="login-form__error">{errors.password}</span>
            )}
          </div>

          <span className="forgot-password">Forgot Password?</span>

          <button
            type="submit"
            className="login-form__submit"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>
</div>
      </div>
    </div>
  );
};

export default Login;