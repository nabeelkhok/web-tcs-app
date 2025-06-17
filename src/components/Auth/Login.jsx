import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  signInWithEmailAndPassword,
  sendEmailVerification,
  fetchSignInMethodsForEmail,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../../config/firebaseconfig';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);
  const googleProvider = new GoogleAuthProvider();

  const getFriendlyErrorMessage = (errorCode) => {
    const errorMap = {
      'auth/invalid-email': 'Please enter a valid email address',
      'auth/user-disabled': 'This account has been disabled',
      'auth/user-not-found': 'No account found with this email',
      'auth/wrong-password': 'Incorrect password',
      'auth/too-many-requests': 'Too many attempts. Please try again later',
      'auth/network-request-failed': 'Network error. Please check your connection',
      'auth/popup-closed-by-user': 'Sign in cancelled',
      'auth/cancelled-popup-request': 'Sign in cancelled',
    };
    return errorMap[errorCode] || 'An error occurred during login';
  };

  const handleRoleRedirect = async (user) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      const role = userDoc.data()?.role || 'user';
      
      localStorage.setItem('user_idToken', await user.getIdToken());
      localStorage.setItem('user_role', role);

      switch (role) {
        case 'admin':
          navigate('/admin-dashboard');
          break;
        case 'student':
          navigate('/student-dashboard');
          break;
        default:
          navigate('/dashboard');
      }
    } catch (error) {
      setError('Failed to fetch user role. Please try again.');
      console.error('Role fetch error:', error);
    }
  };

  const signInWithGoogle = async () => {
    setGoogleLoading(true);
    setError('');

    try {
      const result = await signInWithPopup(auth, googleProvider);
      await handleRoleRedirect(result.user);
    } catch (error) {
      setError(getFriendlyErrorMessage(error.code));
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    // Rate limiting
    if (attemptCount >= 3) {
      setError('Too many attempts. Please wait a moment or use Google Sign-In.');
      return;
    }
    
    setLoading(true);
    setError('');

    try {
      const methods = await fetchSignInMethodsForEmail(auth, email);
      if (methods.length === 0) {
        setError('No account found. Please sign up.');
        setLoading(false);
        return;
      }

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (!user.emailVerified) {
        await sendEmailVerification(user);
        setError('Email not verified. A new verification link has been sent.');
        return;
      }

      await handleRoleRedirect(user);
      setAttemptCount(0); // Reset attempt count on successful login
    } catch (error) {
      setAttemptCount(prev => prev + 1);
      setError(getFriendlyErrorMessage(error.code));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>Welcome Back</h2>
          <p>Please enter your credentials to login</p>
        </div>
        
        {error && (
          <div className="alert error" role="alert">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
            </svg>
            <span>{error}</span>
          </div>
        )}
        
        <form onSubmit={handleSignIn} className="login-form" noValidate>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              aria-describedby="email-error"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-input-container">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength="6"
                required
                autoComplete="current-password"
                aria-describedby="password-error"
              />
              <button 
                type="button" 
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M12 5C5.636 5 2 12 2 12s3.636 7 10 7 10-7 10-7-3.636-7-10-7z" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M2 12s3.636-7 10-7 10 7 10 7-3.636 7-10 7-10-7-10-7z" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                )}
              </button>
            </div>
          </div>
          
          <button 
            type="submit" 
            className="login-button"
            disabled={loading || attemptCount >= 3}
            aria-busy={loading}
          >
            {loading ? (
              <>
                <span className="spinner" aria-hidden="true"></span>
                Signing In...
              </>
            ) : 'Sign In'}
          </button>
        </form>
        
        <div className="divider">
          <span>OR</span>
        </div>
        
        <button 
          className="google-button"
          onClick={signInWithGoogle}
          disabled={googleLoading}
          aria-busy={googleLoading}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path d="M17.5781 9.20578C17.5781 8.56641 17.5273 7.95234 17.4305 7.36328H9.14062V10.845H13.9219C13.7383 11.97 13.125 12.9234 12.1523 13.5598V15.8195H14.918C16.5117 14.3523 17.5781 12.0234 17.5781 9.20578Z" fill="#4285F4"/>
            <path d="M9.14062 18C11.5312 18 13.5703 17.1945 15.0586 15.8195L12.293 13.5598C11.4961 14.1094 10.4531 14.4246 9.14062 14.4246C6.84375 14.4246 4.88672 12.8309 4.21875 10.7426H1.37109V13.0617C2.84766 15.9858 5.76562 18 9.14062 18Z" fill="#34A853"/>
            <path d="M4.21875 10.7426C4.00781 10.0922 3.89062 9.39844 3.89062 8.68359C3.89062 7.96875 4.00781 7.275 4.21875 6.62461V4.30547H1.37109C0.632812 5.77031 0.203125 7.42461 0.203125 9.20578C0.203125 10.987 0.632812 12.6413 1.37109 14.1062L4.21875 11.767V10.7426Z" fill="#FBBC05"/>
            <path d="M9.14062 3.98672C10.5 3.98672 11.707 4.46578 12.6445 5.39906L15.1055 2.93813C13.5703 1.49297 11.5312 0.633594 9.14062 0.633594C5.76562 0.633594 2.84766 2.64797 1.37109 5.57203L4.21875 7.89117C4.88672 5.80285 6.84375 4.20938 9.14062 4.20938V3.98672Z" fill="#EA4335"/>
          </svg>
          {googleLoading ? (
            <>
              <span className="spinner" aria-hidden="true"></span>
              Signing In...
            </>
          ) : 'Continue with Google'}
        </button>
        
        <div className="login-footer">
          <p>
            Don't have an account? 
            <button 
              onClick={() => navigate('/auth/signup')}
              className="link-button"
              aria-label="Navigate to sign up page"
            >
              Sign up
            </button>
          </p>
          <button 
            onClick={() => navigate('/auth/forgot-password')}
            className="link-button"
            aria-label="Navigate to forgot password page"
          >
            Forgot password?
          </button>
        </div>
      </div>

      <style jsx>{`
        .login-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background-color: #f5f5f5;
          padding: 20px;
        }

        .login-card {
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 400px;
          padding: 32px;
        }

        .login-header {
          text-align: center;
          margin-bottom: 24px;
        }

        .login-header h2 {
          color: #333;
          font-size: 24px;
          margin-bottom: 8px;
        }

        .login-header p {
          color: #666;
          font-size: 14px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          margin-bottom: 8px;
          color: #555;
          font-size: 14px;
          font-weight: 500;
        }

        .form-group input {
          width: 100%;
          padding: 12px;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 14px;
          transition: border-color 0.3s;
        }

        .form-group input:focus {
          outline: none;
          border-color: #4a90e2;
        }

        .password-input-container {
          position: relative;
        }

        .toggle-password {
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          color: #666;
          padding: 5px;
        }

        .login-button {
          width: 100%;
          padding: 12px;
          background-color: #4a90e2;
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .login-button:hover {
          background-color: #3a7bc8;
        }

        .login-button:disabled {
          background-color: #cccccc;
          cursor: not-allowed;
        }

        .google-button {
          width: 100%;
          padding: 12px;
          background-color: white;
          color: #555;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 16px;
        }

        .google-button:hover {
          background-color: #f5f5f5;
        }

        .divider {
          display: flex;
          align-items: center;
          margin: 20px 0;
          color: #999;
          font-size: 14px;
        }

        .divider::before,
        .divider::after {
          content: "";
          flex: 1;
          border-bottom: 1px solid #ddd;
        }

        .divider::before {
          margin-right: 10px;
        }

        .divider::after {
          margin-left: 10px;
        }

        .spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 1s ease-in-out infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .login-footer {
          margin-top: 24px;
          text-align: center;
          font-size: 14px;
          color: #666;
        }

        .link-button {
          background: none;
          border: none;
          color: #4a90e2;
          cursor: pointer;
          padding: 0;
          margin-left: 4px;
          font-size: inherit;
        }

        .link-button:hover {
          text-decoration: underline;
        }

        .alert {
          padding: 12px;
          border-radius: 6px;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
        }

        .alert.error {
          background-color: #ffebee;
          color: #d32f2f;
        }

        .alert svg {
          width: 18px;
          height: 18px;
        }
      `}</style>
    </div>
  );
};

export default Login;