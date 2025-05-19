import React from 'react';
import { FriendsRequest } from '../component/friendRequest';
import MessageBox from '../component/messagebox';
import MessageFriends from '../component/messagefriends';
import MessageGroup from '../component/messagegroup';
import { SearchBar } from '../component/search';
import { Sidebar } from '../component/sidebar';
import RecentMessagesList from '../component/recentMessagesList';
import { useDispatch, useSelector } from 'react-redux';
import { setMobileMessagesList } from '../slice/mobileMessagesListSlice';

export const Messenger = () => {
  const mobileMessagesList = useSelector((state) => state.mobileMessagesList.value);
  const dispatch = useDispatch();

 

  return (
    <>
      <div className="flex bg-bg">
        <div className="mobile:w-screen tablet:w-[180px] tablet:h-screen fixed mobile:bottom-0 z-[99999]">
          <Sidebar active="messenger" />
        </div>
        <div className="w-full tablet:h-screen mobile:h-screen tablet:pl-48">
          <div className="large_tablet:flex justify-between desktop:pt-5 gap-5">
    
            <div className={`w-full tablet:w-[75%] tablet:ml-6 h-full ${mobileMessagesList ? 'z-[12] block' : 'hidden tablet:block'} laptop:w-[24%] desktop:w-[18%] large-desktop:w-[22%] tablet:h-[100vh] desktop:h-[98vh] fixed bg-white shadow-xl p-5 laptop:ml-[30px] desktop:ml-[130px]`}>
              <div className="pb-2 border-b border-semi-bdr">
                <SearchBar />
              </div>
              <div className="overflow-y-scroll tablet:h-[90%]">
                <RecentMessagesList />
              </div>
            </div>
            <div className="w-full tablet:w-[71%] h-[91%] laptop:h-full desktop:w-[60%] laptop:w-[56%] fixed right-0 bg-white shadow-xl">
              <MessageBox />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
