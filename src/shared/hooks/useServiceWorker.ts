import { useEffect, useState } from 'react';

export const useServiceWorker = (initialState: boolean) => {
  const [isUpdateAvailable, setIsUpdateAvailable] = useState(initialState);

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development' && 'serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/service-worker.js')
          .then((registration) => {
            console.log('SW registered');

            registration.addEventListener('updatefound', () => {
              const newWorker = registration.installing;
              newWorker?.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  setIsUpdateAvailable(true);
                }
              });
            });
          })
          .catch((registrationError) => {
            console.log('SW registration failed: ', registrationError);
          });
      });
    }
  }, []);

  return isUpdateAvailable;
};
