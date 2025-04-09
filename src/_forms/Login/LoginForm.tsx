import React, { useState } from 'react';
import styles from './LoginForm.module.css'; // Import CSS Module
import { API_ENDPOINTS } from '../../shared/constanst/api';
import { LoginResponse } from '../../shared/interfaces/responses/LoginResponse';
import { LoginRequest } from '../../shared/interfaces/requests/LoginRequest';
import apiService from '../../services/api.service';
import { secureStorage } from '../../services/secure-ls.service';
import Loading from '../../shared/ui/loading/Loading.module';
import { useAppDispatch } from '../../store/hooks';
import { loginSuccess } from '../../store/slices/authSlice';

const LoginForm: React.FC = () => {
  // State with TypeScript types
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
  
    try {
      const loginData: LoginRequest = {
        email,
        password
      };
  
      const response = await apiService.post<LoginResponse>(
        API_ENDPOINTS.AUTH.LOGIN, 
        loginData
      );
  
      
      if (response.tokens && response.tokens.access && response.tokens.refresh) {
        // Use the user information from the response
        // If user data isn't complete in response, provide fallbacks
        const userData = {
          id: response.user?.id || 'unknown-id',
          email: response.user?.email || email,
          name: response.user?.name || email.split('@')[0] || 'User'
        };
        
        // Dispatch login action to Redux with complete user data
        dispatch(loginSuccess({
          user: userData,
          tokens: response.tokens
        }));
        
        // Store the complete user data in secure storage
        secureStorage.setItem('user', userData);
        
        // Clear fields after successful login
        setEmail('');
        setPassword('');
      }
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle input changes with correct event types
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value);
  };

  return (
    // This outer div is used for centering the form container
    <div className={styles.pageContainer}>
      <div className={styles.formContainer}>
      {isLoading && <Loading overlay message="Logging in..." />}
        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <h2>Login</h2>

          {/* Email Input Group */}
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              type="email"
              id="email"
              className={styles.input}
              value={email}
              onChange={handleEmailChange} // Use specific handler
              required // HTML5 basic validation
              placeholder="Enter your email"
            />
          </div>

          {/* Password Input Group */}
          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              type="password" // Masks the input
              id="password"
              className={styles.input}
              value={password}
              onChange={handlePasswordChange} // Use specific handler
              required
              placeholder="Enter your password"
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className={styles.submitButton}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;