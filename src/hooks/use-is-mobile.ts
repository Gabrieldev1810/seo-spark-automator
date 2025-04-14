
import { useEffect, useState } from 'react';

export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Function to check if the screen is mobile sized
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Check on initial load
    checkMobile();

    // Add event listener for window resize
    window.addEventListener('resize', checkMobile);

    // Clean up event listener on component unmount
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
}
