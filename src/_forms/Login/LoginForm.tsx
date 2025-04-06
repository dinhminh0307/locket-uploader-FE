import React, { useState } from 'react';
import styles from './LoginForm.module.css'; // Import CSS Module
import { API_ENDPOINTS } from '../../shared/constanst/api';
import { LoginResponse } from '../../shared/interfaces/responses/LoginResponse';
import { LoginRequest } from '../../shared/interfaces/requests/LoginRequest';
import apiService from '../../services/api.service';

const LoginForm: React.FC = () => {
  // State with TypeScript types
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  // Handle form submission - simplified
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default page reload on submit
    // setError('');
    // setIsLoading(true);

    try {
      // Prepare login request data
      const loginData: LoginRequest = {
        email,
        password
      };

      // Send POST request to login endpoint
      const response = await apiService.post<LoginResponse>(
        API_ENDPOINTS.AUTH.LOGIN, 
        loginData
      );

      console.log('Login successful:', response);
      
      // Here you would typically:
      // 1. Store the token in localStorage or a secure storage
      // if (response.token) {
      //   localStorage.setItem('authToken', response.token);
      // }
      
      // 2. Update global auth state (e.g., with Context API or Redux)
      
      // 3. Redirect to dashboard or home page
      // window.location.href = '/dashboard'; 
      // OR using React Router: history.push('/dashboard');
      
      // Clear fields after successful login
      setEmail('');
      setPassword('');
    } catch (error) {
      // Handle errors
      console.error('Login failed:', error);
    //   setError(error instanceof Error ? error.message : 'Login failed. Please try again.');
    } finally {
    //   setIsLoading(false);
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