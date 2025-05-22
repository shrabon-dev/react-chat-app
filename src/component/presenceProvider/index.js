// PresenceManager.jsx
import { useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { trackUserPresence } from '../setupPresenceTracking';

const PresenceManager = () => {
  useEffect(() => {
    const auth = getAuth();
    let updateStatus;

    // Mark user online (also updates last activity time)
    const setOnline = () => {
      updateStatus?.('online');
    };

    // Handle browser tab visibility changes
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        updateStatus?.('away'); // User switched tab or minimized
      } else {
        setOnline(); // User returned to tab
      }
    };

    // Events that indicate user is active
    const activityEvents = ['mousemove', 'keydown', 'click', 'touchstart'];

    // Start tracking presence for logged-in user
    const startTracking = (user) => {
      updateStatus = trackUserPresence(user.uid);

      document.addEventListener('visibilitychange', handleVisibilityChange);
      activityEvents.forEach((event) =>
        window.addEventListener(event, setOnline)
      );
    };

    // Stop tracking presence (cleanup)
    const stopTracking = () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      activityEvents.forEach((event) =>
        window.removeEventListener(event, setOnline)
      );
    };

    // Listen for auth changes to start/stop presence tracking
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        startTracking(user);
      } else {
        stopTracking();
      }
    });

    return () => {
      stopTracking();
      unsub();
    };
  }, []);

  return null;
};

export default PresenceManager;
