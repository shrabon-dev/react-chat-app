import React from 'react'
import { FriendsRequest } from '../component/friendRequest'
import MessageBox from '../component/messagebox'
import MessageFriends from '../component/messagefriends'
import MessageGroup from '../component/messagegroup'
import { SearchBar } from '../component/search'
import { Sidebar } from '../component/sidebar'

export const Messenger = () => {
  return (
    <>
       <div className='flex'>
       <div className='mobile:w-screen tablet:w-[180px] tablet:h-screen fixed  mobile:bottom-0 z-[99999]'>
          <Sidebar active='messenger' />
        </div>
        <div className='w-full tablet:h-screen mobile:h-screen overflow-hidden large_tablet:flex justify-between px-4 tablet:pl-48'>
        <div className='tablet:w-[345px] overflow-y-scroll'>     
                    <SearchBar/>
                    <MessageGroup/>
                    <MessageFriends/>
        </div> 
        <div className='tablet:w-[770px]'>     
             <MessageBox/>
        </div> 
       </div>
       </div>
   </>
  )
}
