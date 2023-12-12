import { getAuth } from "firebase/auth";
import { getDatabase, ref, onValue} from "firebase/database";
import React, { useEffect, useState } from 'react'
import {BiDotsVerticalRounded} from 'react-icons/bi'
import { useSelector } from "react-redux";
import { FriendRequestReuseable } from '../../reuseable/FriendRequestReuseable'


export const FriendsRequest = () => {
     const modeStatus = useSelector((state)=>state.darkmode.value)
     let db = getDatabase();
     let auth = getAuth();
     let [friendRequestList,setFriendRequestList] = useState([]);

  useEffect(()=>{  
    onValue(ref(db, 'friendRequest/' ), (snapshot) => {
      
        let arr = []
            snapshot.forEach((item)=>{
               if(auth.currentUser.uid == item.val().receiverid){
                 arr.push({...item.val(),id:item.key})
               }
            });
            setFriendRequestList(arr)
      });
    },[])
  


if(friendRequestList.length > 0){
  return (
    <>
    <div className={`${modeStatus ? 'dark_mode ':'light_mode'}`}>
        {/* title start */}
         <div className='flex justify-between items-center'>
            <h2 className={`${modeStatus ? 'dark_heading':'light_heading'}`}>Friends Request</h2>
            <BiDotsVerticalRounded className='text-primary text-xl'/>
         </div>
        {/* title end */}
  {/* *************************************************** */}
        {/* members start */}
        <div className='h-[300px] overflow-y-scroll scrollbar-hide'>
          {friendRequestList.map((item)=>(
               <FriendRequestReuseable allvalue={item} profile={item.senderprofilephoto} name={item.sendername} message='hello! How are you?' button='Accept' />
          ))}
  
         </div>
        {/* members end */}
  
    </div>
   </>
  )
}else{
  return (
    <>
    <div className={`${modeStatus ? 'dark_mode mt-[32px]':'light_mode  mt-[32px]'}`}>
        {/* title start */}
         <div className='flex justify-between items-center'>
            <h2 className={`${modeStatus ? 'dark_heading':'light_heading'}`}>Friends Request</h2>
            <BiDotsVerticalRounded className='text-primary text-xl'/>
         </div>
        {/* title end */}
  {/* *************************************************** */}
        {/* members start */}
        <div className='h-[300px] overflow-y-scroll scrollbar-hide'>

             <p className={`${modeStatus ? 'bg-[#3d3e51] text-red-500 py-2 px-4 font-nunito rounded mb-2 text-center mt-28':'text-red-500 bg-red-200 text-center py-2 px-4 font-nunito rounded mt-28 mb-2'}`}>You have no Friend Request</p>

         </div>
        {/* members end */}
  
    </div>
   </>
  )
}

}
