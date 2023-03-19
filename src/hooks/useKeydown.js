import React from 'react';

function useKeydown(key, callback) {
  React.useEffect(() => {
    console.log('custom hook called');

    window.addEventListener('keydown', event => {
      event.code === key && callback();
    });

    return () => {
      window.removeEventListener('keydown', () => {});
    };
  }, [key, callback]);
}

export default useKeydown;
