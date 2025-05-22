import React from 'react'
import { IoCreateOutline } from "react-icons/io5";
import { Friends } from '../component/friends';
import { useSelector } from 'react-redux';
import { MyGroups } from '../component/mygroups';
import { Grouprequest } from '../component/grouprequest';
import { FriendsRequest } from '../component/friendRequest';
import { BlockUsers } from '../component/blockusers';
import { Userlist } from '../component/userlist';
export const RightsideModal = () => {
  const {popup,type,data} = useSelector(state => state.SidebarModal)
 
  return (
    <div className='rgt_side w-[320px] h-screen relative overflow-y-scroll bg-semi-white '>
    {type == 'suggest-friend'?
        <Userlist/>
    :
    (
      type === 'your-friend'?
          <Friends/>
        :
        type === 'friend-request'?
        <FriendsRequest/>
        :
        type === 'your-group'?
        <MyGroups/>
        :
        type === 'block-users'? 
        <BlockUsers/>
        :
        <Grouprequest/>
    ) 
    }
    </div>
  )
}
