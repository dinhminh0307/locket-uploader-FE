import React from 'react';
import styles from './Loading.module.css';

interface Loading {
  size?: 'small' | 'medium' | 'large';
  message?: string;
  fullScreen?: boolean;
  overlay?: boolean;
}

const Loading: React.FC<Loading> = ({
  size = 'medium',
  message = 'Loading...',
  fullScreen = false,
  overlay = false
}) => {
  const containerClassName = [
    styles.loadingContainer,
    fullScreen ? styles.fullScreen : '',
    overlay ? styles.overlay : ''
  ].filter(Boolean).join(' ');

  const spinnerClassName = [
    styles.spinner,
    styles[size]
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClassName} role="status" aria-live="polite">
      <div className={spinnerClassName}></div>
      {message && <p className={styles.loadingText}>{message}</p>}
    </div>
  );
};

export default Loading;