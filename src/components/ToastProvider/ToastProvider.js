import React from 'react';

import useKeydown from '../../hooks/useKeydown';

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

  const value = {
    slices,
    createSlice,
    dismissToast,
  };

  const useEscape = React.useCallback(() => {
    setSlices([]);
  }, []);

  useKeydown('Escape', useEscape);

  return (
    <ToastContext.Provider value={value}>
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
