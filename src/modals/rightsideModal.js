import React from 'react'
import { IoCreateOutline } from "react-icons/io5";
import { Friends } from '../component/friends';
import { useSelector } from 'react-redux';
import { MyGroups } from '../component/mygroups';
import { Grouprequest } from '../component/grouprequest';
import { FriendsRequest } from '../component/friendRequest';
import { BlockUsers } from '../component/blockusers';
export const RightsideModal = () => {
  const {popup,type,data} = useSelector(state => state.SidebarModal)
  console.log('popup', popup)
  console.log('type : ', type)
  console.log('Data : ', data)
  return (
    <div className='rgt_side w-full h-screen bg-semi-white p-2 relative'>
    {type == 'suggest-friend'?
        <Friends/>
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
