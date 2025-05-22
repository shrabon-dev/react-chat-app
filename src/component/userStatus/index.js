import { useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';

const UserStatus = ({ userId }) => {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (!userId) return;
    console.log('user status', userId)

    const db = getDatabase();
    const statusRef = ref(db, `/status/${userId}`);

    const unsubscribe = onValue(statusRef, (snapshot) => {
      const data = snapshot.val();

      if (data?.state === 'online') {
        setStatus('Active now');
      } else if (data?.state === 'away') {
        setStatus('Away');
      } else if (data?.lastChanged) {
        // Convert Firebase timestamp (milliseconds)
        const lastSeen = data.lastChanged;
        const diff = Date.now() - lastSeen;
        const minutes = Math.floor(diff / (1000 * 60));

        if (minutes < 1) {
          setStatus('Last seen just now');
        } else if (minutes < 60) {
          setStatus(`Last seen ${minutes} min ago`);
        } else if (minutes < 1440) {
          const hours = Math.floor(minutes / 60);
          setStatus(`Last seen ${hours} hour${hours > 1 ? 's' : ''} ago`);
        } else {
          const days = Math.floor(minutes / 1440);
          setStatus(`Last seen ${days} day${days > 1 ? 's' : ''} ago`);
        }
      } else {
        setStatus('Offline');
      }
    });

    return () => unsubscribe();
  }, [userId]);

  return <span> <span className={`w-3 h-3 border-2 border-white rounded-full ${status ? "bg-primary":"bg-gray-400"} inline-block`}></span> {status || 'Loading...'}</span>;
};

export default UserStatus;
