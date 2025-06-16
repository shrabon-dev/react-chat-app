import { getAuth } from "firebase/auth";
import { getDatabase, ref, onValue} from "firebase/database";
import React, { useEffect, useState } from 'react'
import {BiDotsVerticalRounded} from 'react-icons/bi'
import { useDispatch, useSelector } from "react-redux";
import { FriendRequestReuseable } from '../../reuseable/FriendRequestReuseable'
import { closeSidebarModal } from "../../slice/SidebarModalSlice";
import { IoReturnDownBack } from "react-icons/io5";
export const FriendsRequest = () => {
     const modeStatus = useSelector((state)=>state.darkmode.value)
     let db = getDatabase();
     let auth = getAuth();
     let [friendRequestList,setFriendRequestList] = useState([]);
      let dispatch = useDispatch();

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
  
 const handleBackModal = () =>{
    dispatch(closeSidebarModal())
  }

if(friendRequestList.length > 0){
  return (
    <>
    <div className=''>
        {/* title start */}
 
         <div className='sml_tle flex justify-between items-center py-3 tablet:py-0 tablet:px-0 px-2'>
              <h4 className='font-poppin text-base text-semi-black font-normal'>Friends Request</h4>
              <button
                onClick={handleBackModal}
                className='font-poppin text-xs text-white font-normal bg-primary py-1 px-2 rounded ' >
                <IoReturnDownBack className='inline-block mr-1'/>
                Back
              </button>
          </div>
        {/* title end */}
  {/* *************************************************** */}
        {/* members start */}
        <div className=' overflow-y-scroll scrollbar-hide'>
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
    <div className=''>
        {/* title start */}
   
          <div className='sml_tle flex justify-between items-center py-3 tablet:py-0 tablet:px-0 px-2'>
              <h4 className='font-poppin text-base text-semi-black font-normal'>Friends Request</h4>
              <button
                onClick={handleBackModal}
                className='font-poppin text-xs text-white font-normal bg-primary py-1 px-2 rounded ' >
                <IoReturnDownBack className='inline-block mr-1'/>
                Back
              </button>
          </div>
          
        {/* title end */}
  {/* *************************************************** */}
        {/* members start */}
        <div className=' overflow-y-scroll scrollbar-hide'>

             <p className={`${modeStatus ? 'bg-[#3d3e51] text-red-500 py-2 px-4 font-nunito rounded mb-2 text-center mt-28':'text-red-500 bg-red-200 text-center py-2 px-4 font-nunito rounded mt-28 mb-2'}`}>You have no Friend Request</p>

         </div>
        {/* members end */}
  
    </div>
   </>
  )
}

}
