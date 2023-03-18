import React from 'react';

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [slices, setSlices] = React.useState([]);

  const createSlice = React.useCallback(
    (message, variant) => {
      setSlices([
        ...slices,
        {
          id: crypto.randomUUID(),
          message,
          variant,
        },
      ]);
    },
    [slices]
  );

  const dismissToast = React.useCallback(
    sliceID => {
      const newSlices = slices.filter(slice => slice.id !== sliceID);
      setSlices(newSlices);
    },
    [slices]
  );

  React.useEffect(() => {
    window.addEventListener('keydown', event => {
      event.code === 'Escape' && setSlices([]);
    });

    return () => {
      window.removeEventListener('keydown', () => {});
    };
  }, []);

  const value = {
    slices,
    createSlice,
    dismissToast,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
