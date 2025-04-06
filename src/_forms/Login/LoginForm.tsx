import React, { useState } from 'react';
import styles from './LoginForm.module.css'; // Import CSS Module

// Optional: Define props if you plan to pass any (like onLoginSuccess later)
// interface LoginFormProps {
//   onLoginSuccess?: () => void; // Example prop
// }
// Then use: const LoginForm: React.FC<LoginFormProps> = (props) => { ... }
// For now, we don't need props for the simplified version.

const LoginForm: React.FC = () => {
  // State with TypeScript types
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  // Handle form submission - simplified
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default page reload on submit

    // Just log the credentials for now
    console.log('Login attempt with:', {
       email: email,
       password: password // You can use shorthand: password
    });

    // Clear fields after logging (optional)
    // setEmail('');
    // setPassword('');

    // In the future, API call logic would go here
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