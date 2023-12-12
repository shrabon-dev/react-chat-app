import React, { useEffect, useState } from 'react'
import {BiDotsVerticalRounded} from 'react-icons/bi'
import { UnblockReuseable } from '../../reuseable/UnblockReuseable'
import { getAuth } from "firebase/auth";
import { getDatabase, ref, onValue} from "firebase/database";
import { useSelector } from 'react-redux';

export const BlockUsers = () => {
  const modeStatus = useSelector((state)=>state.darkmode.value)

  let db = getDatabase();
  let auth = getAuth();
  let [blocklist,setBlocklist] = useState([]);


  useEffect(()=>{  
    onValue(ref(db, 'usersblock/' ), (snapshot) => {
      
        let arr = []
            snapshot.forEach((item)=>{
               if(auth.currentUser.uid == item.val().who_block_id){
                 arr.push({...item.val(),id:item.key})
               }
            });
            setBlocklist(arr)
      });
    },[])

if(blocklist.length > 0){

  return (
    <>
      <div className={`${modeStatus ? 'dark_mode large_tablet:w-[47%] desktop:w-full large_tablet:h-[466px] desktop:h-auto':'light_mode large_tablet:w-[47%] desktop:w-full large_tablet:h-[466px] desktop:h-auto'}`}>
        {/* <div className={`${modeStatus ? 'dark_mode laptop:mt-2 laptop:max-w-[360px] tablet:max-w-[294px] tablet:mt-8  laptop:mr-0 tablet:mr-0':'light_mode laptop:mr-0 tablet:mr-0 laptop:mt-2 laptop:max-w-[360px] tablet:max-w-[294px] tablet:mt-8'}`}> */}

        {/* title start */}
         <div className='flex justify-between items-center'>
            <h2 className={`${modeStatus ? 'dark_heading':'light_heading'}`}>Unblock Users</h2>
            <BiDotsVerticalRounded className='text-primary text-xl'/>
         </div>
        {/* title end */}
{/* *************************************************** */}
        {/* members start */}
        <div className='h-[300px] overflow-y-scroll scrollbar-hide'>
        {blocklist.map((item)=>(
            <UnblockReuseable id={item.id} senderid={item.whom_bloking_id} profile={item.whom_bloking_profile_photo} name={item.whom_bloking_name} message='hello! How are you?' button='Unblock' />
        ))}
         </div>
        {/* members end */}

      </div>
   </>
  )
}else{
  return (
    <>
    <div className={`${modeStatus ? 'dark_mode large_tablet:w-[47%] desktop:w-full large_tablet:h-[466px] desktop:h-auto':'light_mode large_tablet:w-[47%] desktop:w-full large_tablet:h-[466px] desktop:h-auto'}`}>
    {/* <div className={`${modeStatus ? 'dark_mode laptop:mt-2 laptop:max-w-[360px] tablet:max-w-[294px] tablet:mt-8  laptop:mr-0 tablet:mr-0':'light_mode laptop:mr-0 tablet:mr-0 laptop:mt-2 laptop:max-w-[360px] tablet:max-w-[294px] tablet:mt-8'}`}> */}
        {/* title start */}
         <div className='flex justify-between items-center'>
            <h2 className={`${modeStatus ? 'dark_heading':'light_heading'}`}>Unblock Users</h2>
            <BiDotsVerticalRounded className='text-primary text-xl'/>
         </div>
        {/* title end */}
{/* *************************************************** */}
        {/* members start */}
        <div className='h-[300px] overflow-y-scroll scrollbar-hide'>
           <p className={`${modeStatus ? 'bg-[#3d3e51] text-red-500 py-2 px-4 font-nunito rounded mb-2 text-center mt-28':'text-red-500 bg-red-200 text-center py-2 px-4 font-nunito rounded mt-28 mb-2'}`}>You have no blocking user</p>
         </div>
        {/* members end */}

    </div>
   </>
  )
}
}
