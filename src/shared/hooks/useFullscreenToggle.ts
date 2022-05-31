import { useState } from 'react';

export const useFullscreenToggle = (initialState: boolean): [boolean, () => void] => {
  const [state, setIsFullscreen] = useState(initialState);

  function toggleFullScreen(): void {
    if (!document.fullscreenElement) {
      setIsFullscreen(true);
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  }

  return [state, toggleFullScreen];
};
