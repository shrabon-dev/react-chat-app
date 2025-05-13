import { getAuth } from "firebase/auth";
import { getDatabase, ref, onValue} from "firebase/database";
import React, { useEffect, useState } from 'react'
import {BiDotsVerticalRounded} from 'react-icons/bi'
import { FriendsReuseable } from '../../reuseable/FriendsReuseable'
import { useDispatch, useSelector } from 'react-redux'
import { activechat } from '../../slice/activeChatSlice'
import Skeleton from "react-loading-skeleton";
import { closeSidebarModal } from "../../slice/SidebarModalSlice";

export const Friends = () => {
  const modeStatus = useSelector((state)=>state.darkmode.value)
  let dispatch = useDispatch();
  let db = getDatabase();
  let auth = getAuth();
  let [friendList,setFriendList] = useState([]);

 const handleBackModal = () =>{
    dispatch(closeSidebarModal())
  }

useEffect(()=>{  
 onValue(ref(db, 'myfriends/' ), (snapshot) => {
   
     let arr = []
         snapshot.forEach((item)=>{
            if(auth.currentUser.uid == item.val().receiverid || auth.currentUser.uid == item.val().senderid ){
              arr.push({...item.val(),id:item.key})
            }
         });
         let userinfo = {}
         if(auth.currentUser.uid == arr[0].receiverid){
             userinfo.status = 'single';
             userinfo.id = arr[0].senderid;
             userinfo.name = arr[0].sendername;
         }else{
           userinfo.status = 'single';
           userinfo.id = arr[0].receiverid;
           userinfo.name = arr[0].receivername;
         }
       dispatch(activechat(userinfo))
         setFriendList(arr)
   });
 },[])






 if(friendList.length>0){
   return (
     <>
     <div className=''>
         {/* title start */}
          <div className='sml_tle flex justify-between items-center pb-5'>
            <h4 className='font-poppin text-base text-semi-black  font-normal'>Your Friends</h4>
            <button onClick={handleBackModal} className='font-poppin text-xs text-white font-normal bg-primary py-2 px-4 rounded-lg'>Back</button>
          </div>
         {/* title end */}
  {/* *************************************************** */}
          {/* members start */}
          {friendList ? 
                    <div className=' '>
                    {friendList.map((item)=>(
                       <>
                       {auth.currentUser.uid == item.senderid ? 
                         <FriendsReuseable id={item.id} getid={item.receiverid} profile={item.receiverprofilephoto} name={item.receivername} message='Hi! are you free now?' date='today, 9.00 am' />
                         : 
                         <FriendsReuseable id={item.id} getid={item.senderid} profile={item.senderprofilephoto} name={item.sendername} message='Hi! are you free now?' date='today, 9.00 am' />
                       }
                       </>
                      ))}
                    </div>
          :
          <Skeleton/>
          }

          {/* members end */}
     </div>
    </>
   )
 }else{
  return (
    <>
    <div className=''>
        {/* title start */}
         <div className='flex justify-between items-center'>
            <h2 className={`${modeStatus ? 'dark_heading':'light_heading'}`}>Friends</h2>
            <button onClick={handleBackModal} className='font-poppin text-xs text-white font-normal bg-primary py-2 px-4 rounded-lg'>Back</button>
         </div>
        {/* title end */}
        {/* *************************************************** */}
        {/* members start */}
        <div className='h-[390px] overflow-y-scroll scrollbar-hide'>
              <p className={`${modeStatus ? 'bg-[#3d3e51] text-red-500 py-2 px-4 font-nunito rounded mb-2 text-center mt-28':'text-red-500 bg-red-200 text-center py-2 px-4 font-nunito rounded mt-28 mb-2'}`}>You have no Friends</p>
        </div>
        {/* members end */}
    </div>
   </>
  )
 }

}
