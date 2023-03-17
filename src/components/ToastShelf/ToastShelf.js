import React from 'react';

import Toast from '../Toast';
import styles from './ToastShelf.module.css';

function ToastShelf({ slices, handleDismiss }) {
  return (
    <ol className={styles.wrapper}>
      {slices.map(slice => (
        <li
          className={styles.toastWrapper}
          key={slice.id}
        >
          <Toast
            variant={slice.variant}
            id={slice.id}
            handleDismiss={handleDismiss}
          >
            {slice.message}
          </Toast>
        </li>
      ))}
    </ol>
  );
}

export default ToastShelf;
