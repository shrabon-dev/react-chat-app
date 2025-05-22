import React, { useEffect, useState } from 'react';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { getDatabase, ref, onValue } from "firebase/database";
import { UserListReuseable } from '../../reuseable/UserListReuseable';
import { getAuth } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { closeSidebarModal } from '../../slice/SidebarModalSlice';
import { SearchBar } from '../search';

export const Userlist = () => {
  const modeStatus = useSelector((state) => state.darkmode.value);
  const db = getDatabase();
  const auth = getAuth();
  const dispatch = useDispatch();

  const [searchList, setSearchList] = useState([]);
  const [userlist, setUserlist] = useState([]);

  const handleBackModal = () => {
    dispatch(closeSidebarModal());
  };

  useEffect(() => {
    const userRef = ref(db, 'users/');

    const unsubscribe = onValue(userRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (auth.currentUser && auth.currentUser.uid !== item.key) {
          arr.push({ ...item.val(), userid: item.key });


        }
      });
      setUserlist(arr);
    });

    return () => unsubscribe(); 
  }, []);

  const handleSearch = (e) => {
    let arr = [];
    const value = e.target.value.toLowerCase();

    if (value !== '') {
      userlist.forEach((item) => {
        if (item.username.toLowerCase().includes(value)) {
          arr.push(item);
        }
      });
    }

    setSearchList(arr);
  };

  return (
    <div>
      {/* Header */}
      <div className='sml_tle flex justify-between items-center pb-5'>
        <h4 className='font-poppin text-base text-semi-black font-normal'>
          Your Friends
        </h4>
        <button
          onClick={handleBackModal}
          className='font-poppin text-xs text-white font-normal bg-primary py-2 px-4 rounded-lg'
        >
          Back
        </button>
      </div>

      {/* Search Bar */}
      <SearchBar type={handleSearch} />

      {/* User List */}
      <div className='h-[340px] overflow-y-scroll scrollbar-hide'>
        {(searchList.length > 0 ? searchList : userlist).map((item) => (
          <UserListReuseable
            key={item.userid}
            allValue={item}
            profile={item.profile_picture}
            name={item.username}
            message='Hi! are you free now?'
          />
        ))}
      </div>
    </div>
  );
};
