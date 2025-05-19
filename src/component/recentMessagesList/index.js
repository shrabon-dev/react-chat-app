import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, onValue } from 'firebase/database';
import { useDispatch, useSelector } from 'react-redux';
import { activechat } from '../../slice/activeChatSlice';
import { setMobileMessagesList } from '../../slice/mobileMessagesListSlice';

function MessageListWithRecent() {
  const db = getDatabase();
  const auth = getAuth();
  const dispatch = useDispatch();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
    const mobileMessagesList = useSelector((state) => state.mobileMessagesList.value);
  useEffect(() => {
    const loadMessages = (uid) => {
      const combinedMessages = [];

      // Load My Friends
      onValue(ref(db, 'myfriends/'), (snapshot) => {
        const friends = [];
        snapshot.forEach((item) => {
          if (uid === item.val().receiverid || uid === item.val().senderid) {
            friends.push({ ...item.val(), id: item.key, type: 'friend' });
          }
        });

        // Load My Groups
        onValue(ref(db, 'mygroups/'), (snapshot) => {
          const groups = [];
          snapshot.forEach((item) => {
            if (uid === item.val().admin_id) {
              groups.push({ ...item.val(), id: item.key, type: 'group' });
            }
          });

          // Load Joined Groups
          onValue(ref(db, 'groups/'), (snapshot) => {
            const joinedGroups = [];
            snapshot.forEach((item) => {
              if (uid === item.val().user_id) {
                joinedGroups.push({ ...item.val(), id: item.key, type: 'group' });
              }
            });

            // Combine and sort by recent activity (mocked with id for now)
            const allMessages = [...friends, ...groups, ...joinedGroups];
            allMessages.sort((a, b) => b.id.localeCompare(a.id));
            setMessages(allMessages);
            setLoading(false);
          });
        });
      });
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        loadMessages(user.uid);
      } else {
        setMessages([]);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const handleMessageClick = (item) => {
    const userinfo = {
      status: item.type === 'friend' ? 'single' : 'group',
      id: item.type === 'friend' ? (auth.currentUser.uid === item.receiverid ? item.senderid : item.receiverid) : item.id,
      name: item.type === 'friend' ? (auth.currentUser.uid === item.receiverid ? item.sendername : item.receivername) : item.group_name,
      tag_name: item.type === 'group' ? item.tag_name : undefined,
    };
    dispatch(activechat(userinfo));
    dispatch(setMobileMessagesList(!mobileMessagesList));

  };

  return (
    <div className="">
      {loading ? (
        <p>Loading...</p>
      ) : (
        messages.map((item) => (
          <div
            key={item.id}
            onClick={() => handleMessageClick(item)}
            className="flex justify-between items-center mt-5 border-b pb-3 border-semi-bdr last:border-0 cursor-pointer"
          >
            <div className="flex">
              <div>
                <img
                  className="w-11 h-11 rounded-full"
                  src={item.type === 'friend' ? (auth.currentUser.uid === item.receiverid ? item.receiverprofilephoto : item.senderprofilephoto) : '../images/group/grp3.webp'}
                  alt="avatar"
                />
              </div>
              <div className="ml-3">
                <h4 className="bold_text">
                  {item.type === 'friend' ? (auth.currentUser.uid === item.receiverid ? item.sendername : item.receivername) : item.group_name}
                </h4>
                <p className="p_text text-xs">
                  {item.type === 'friend' ? 'Recent message...' : item.tag_name}
                </p>
              </div>
            </div>
            <div>
              <p className="text-yellow-800 bg-yellow-400 w-6 h-6 flex justify-center items-center rounded-full">5</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default MessageListWithRecent;
