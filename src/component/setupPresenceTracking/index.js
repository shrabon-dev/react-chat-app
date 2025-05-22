// presence.js
import { getDatabase, ref, onDisconnect, set, serverTimestamp } from 'firebase/database';

export const trackUserPresence = (userId) => {
  const db = getDatabase();
  const statusRef = ref(db, `/status/${userId}`);

  // Function to update status in Firebase
  const updateStatus = (state) => {
    set(statusRef, {
      state,
      lastChanged: serverTimestamp(),
    });
  };

  // When the user disconnects (closes tab, loses connection)
  onDisconnect(statusRef).set({
    state: 'offline',
    lastChanged: serverTimestamp(),
  });

  // Initially mark user as online when this function runs
  updateStatus('online');

  // Return update function to manually update later (online, away, etc)
  return updateStatus;
};
