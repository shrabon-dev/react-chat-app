import { getDatabase, push, ref, set, onValue } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { useSelector } from 'react-redux';

export const UserListReuseable = ({ allValue, profile, name, message }) => {
  const modeStatus = useSelector((state) => state.darkmode.value);

  const auth = getAuth();
  const db = getDatabase();

  const [friendRequests, setFriendRequests] = useState([]);
  const [blocks, setBlocks] = useState([]);
  const [friends, setFriends] = useState([]);

  const myId = auth.currentUser.uid;
  const userId = allValue.userid;

  // Send friend request
  const handleFriendRequest = (user) => {
    push(ref(db, 'friendRequest/'), {
      receivername: user.username,
      receiverid: user.userid,
      sendername: auth.currentUser.displayName,
      senderid: auth.currentUser.uid,
      senderprofilephoto: auth.currentUser.photoURL,
      receiverprofilephoto: user.profile_picture,
    }).then(() => {
      push(ref(db, 'notification/'), {
        receivername: user.username,
        receiverid: user.userid,
        sendername: auth.currentUser.displayName,
        senderid: auth.currentUser.uid,
        senderprofilephoto: auth.currentUser.photoURL,
        notify: 'sent a friend request to you',
        readStatus: false,
      });
    });
  };

  // Fetch data: Friends
  useEffect(() => {
    onValue(ref(db, 'myfriends/'), (snapshot) => {
      const data = [];
      snapshot.forEach((item) => {
        data.push(item.val().senderid + item.val().receiverid);
      });
      setFriends(data);
    });
  }, []);

  // Fetch data: Blocks
  useEffect(() => {
    onValue(ref(db, 'usersblock/'), (snapshot) => {
      const data = [];
      snapshot.forEach((item) => {
        data.push(item.val().whom_bloking_id + item.val().who_block_id);
      });
      setBlocks(data);
    });
  }, []);

  // Fetch data: Friend Requests
  useEffect(() => {
    onValue(ref(db, 'friendRequest/'), (snapshot) => {
      const data = [];
      snapshot.forEach((item) => {
        data.push(item.val().senderid + item.val().receiverid);
      });
      setFriendRequests(data);
    });
  }, []);

  // Check relationships
  const isFriend =
    friends.includes(myId + userId) || friends.includes(userId + myId);
  const isBlocked =
    blocks.includes(myId + userId) || blocks.includes(userId + myId);
  const isPending =
    friendRequests.includes(myId + userId) || friendRequests.includes(userId + myId);

  // Determine button text
  let buttonText = 'Send Request';
  if (isBlocked) buttonText = 'Blocked';
  else if (isFriend) buttonText = 'Friend';
  else if (isPending) buttonText = 'Pending';

  return (
    <div className='flex justify-around items-center mt-5 border-b pb-3 border-[#00000041] last:border-0'>
      <div className='w-12 h-12'>
        <img className='w-10 h-10 rounded-full object-cover' src={profile} alt="profile" />
      </div>
      <div>
        <h4 className={`${modeStatus ? 'bold_text text-sm text-gray-200' : 'bold_text text-sm'}`}>
          {name}
        </h4>
        <p className={`${modeStatus ? 'p_text text-xs text-gray-200' : 'p_text text-xs'}`}>
          {message}
        </p>
      </div>
      <div>
        <button
          onClick={() => !isFriend && !isBlocked && !isPending && handleFriendRequest(allValue)}
          className='bg-primary text-sm text-white px-2 py-1 rounded-lg'
          disabled={isFriend || isBlocked || isPending}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};
