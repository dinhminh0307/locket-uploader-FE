import { useEffect } from 'react';
import styles from './Navbar.module.css';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { checkAuthState, logout } from '../../store/slices/authSlice';

function Navbar() {
  const dispatch = useAppDispatch();

  // useAppSelector allow to get needed piece of data from auth slice
  // In this case is auth slice
  const { isAuthenticated, user } = useAppSelector(state => state.auth);
  
  // Check auth state when component mounts
  useEffect(() => {
    dispatch(checkAuthState());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContent}>
        <div className={styles.navLeft}>
          {/* Logo Section */}
          <div className={styles.logo}>
            <a href="/" className={styles.logoLink}>
              Logo
            </a>
          </div>

          {/* Navigation Links Section */}
          <ul className={styles.navLinks}>
            <li>
              <a href="/" className={styles.link}>
                Home
              </a>
            </li>
            {!isAuthenticated && (
              <li>
                <a href="/login" className={styles.link}>
                  Login
                </a>
              </li>
            )}
          </ul>
        </div>
        
        {/* User display section - only visible when logged in */}
        {isAuthenticated && user && (
          <div className={styles.userSection}>
            <span className={styles.username}>Welcome, {user.name}</span>
            <button 
              onClick={handleLogout}
              className={styles.link}
              style={{ background: 'none', border: 'none', cursor: 'pointer', marginLeft: '10px' }}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;