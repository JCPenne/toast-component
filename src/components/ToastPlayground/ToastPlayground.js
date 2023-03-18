import React from 'react';

import Button from '../Button';
import ToastShelf from '../ToastShelf/ToastShelf';

import styles from './ToastPlayground.module.css';

const VARIANT_OPTIONS = ['notice', 'warning', 'success', 'error'];

function ToastPlayground() {
  const [slices, setSlices] = React.useState([]);
  const [message, setMessage] = React.useState('');
  const [variant, setVariant] = React.useState(VARIANT_OPTIONS[0]); // notice || warning || success || error

  function handleSubmit(event) {
    event.preventDefault();

    setSlices([
      ...slices,
      {
        id: crypto.randomUUID(),
        message,
        variant,
      },
    ]);
    
    setMessage('');
    setVariant(VARIANT_OPTIONS[0]);
  }

  function handleDismiss(sliceID) {
    const newSlices = slices.filter(slice => slice.id !== sliceID);
    setSlices(newSlices);
  }

  return (
    <div className={styles.wrapper}>
      <header>
        <img
          alt='Cute toast mascot'
          src='/toast.png'
        />
        <h1>Toast Playground</h1>
      </header>

      <ToastShelf
        slices={slices}
        handleDismiss={handleDismiss}
      />

      <form
        className={styles.controlsWrapper}
        onSubmit={handleSubmit}
      >
        <div className={styles.row}>
          <label
            htmlFor='message'
            className={styles.label}
            style={{ alignSelf: 'baseline' }}
          >
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea
              id='message'
              className={styles.messageInput}
              value={message}
              onChange={event => setMessage(event.target.value)}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          <div
            className={`${styles.inputWrapper} ${styles.radioWrapper}`}
          >
            {VARIANT_OPTIONS.map(option => {
              const id = `variant-${option}`;
              return (
                <label
                  key={id}
                  htmlFor={id}
                >
                  <input
                    type='radio'
                    name='variant'
                    id={id}
                    value={option}
                    checked={variant === option}
                    onChange={event => setVariant(event.target.value)}
                  />
                  {option}
                </label>
              );
            })}
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.label} />
          <div
            className={`${styles.inputWrapper} ${styles.radioWrapper}`}
          >
            <Button type='submit'>Pop Toast!</Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ToastPlayground;
