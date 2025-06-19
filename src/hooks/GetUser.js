import { useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';

export default function GetUser(userId) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const db = getDatabase();
    const userRef = ref(db, `users/${userId}`);

    const unsubscribe = onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      setUser(data);
      setLoading(false);
    });

    // Optional: Cleanup
    return () => unsubscribe();
  }, [userId]);

  return { user, loading };
}
