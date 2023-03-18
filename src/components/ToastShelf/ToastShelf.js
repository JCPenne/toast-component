import React from 'react';

import { ToastContext } from '../ToastProvider/ToastProvider';

import Toast from '../Toast';
import styles from './ToastShelf.module.css';

function ToastShelf() {
  const { slices } = React.useContext(ToastContext);
  return (
    <ol
      className={styles.wrapper}
      role='region'
      aria-live='polite'
      aria-label='Notification'
    >
      {slices.map(slice => (
        <li
          className={styles.toastWrapper}
          key={slice.id}
        >
          <Toast
            variant={slice.variant}
            id={slice.id}
          >
            {slice.message}
          </Toast>
        </li>
      ))}
    </ol>
  );
}

export default ToastShelf;
