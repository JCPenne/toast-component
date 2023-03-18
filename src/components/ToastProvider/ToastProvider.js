import React from 'react';

export const ToastContext = React.createContext();

const VARIANT_OPTIONS = ['notice', 'warning', 'success', 'error'];

function ToastProvider({ children }) {
  const [slices, setSlices] = React.useState([]);
  const [message, setMessage] = React.useState('');
  const [variant, setVariant] = React.useState(VARIANT_OPTIONS[0]); // notice || warning || success || error

  const handleSubmit = React.useCallback(
    event => {
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
    },
    [message, variant, slices]
  );

  const handleDismiss = React.useCallback(
    sliceID => {
      const newSlices = slices.filter(slice => slice.id !== sliceID);
      setSlices(newSlices);
    },
    [slices]
  );

  const value = {
    slices,
    setSlices,
    message,
    setMessage,
    variant,
    setVariant,
    handleSubmit,
    handleDismiss,
    VARIANT_OPTIONS,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
