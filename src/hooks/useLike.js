import { getDatabase, onValue, ref } from 'firebase/database';
import { useEffect, useState } from 'react';

export default function useLike({ postID, userID }) {
  const [value, setValue] = useState(false);

  useEffect(() => {
    if (!postID || !userID) return;

    const db = getDatabase();
    const likeRef = ref(db, `likes_table/${postID}_${userID}`);

    const unsubscribe = onValue(likeRef, (snapshot) => {
      const val = snapshot.val();
      setValue(!!val);
    });

    return () => unsubscribe(); // 🔁 Clean up listener
  }, [postID, userID]); // ✅ Add dependencies

  return value;
}
