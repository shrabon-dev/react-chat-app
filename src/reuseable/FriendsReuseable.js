import { getAuth } from 'firebase/auth';
import { getDatabase, push, ref, remove, set } from 'firebase/database'
import React from 'react'
import { useSelector } from 'react-redux';

export const FriendsReuseable = (props) => {
  const modeStatus = useSelector((state)=>state.darkmode.value)
  let db = getDatabase();
  let auth = getAuth();

  let handleUserBlock = (value) =>{

      set(push(ref(db,'usersblock/')),{
        who_block_name:auth.currentUser.displayName,
        who_block_id:auth.currentUser.uid,
        whom_bloking_name:props.name,
        whom_bloking_id:props.getid,
        whom_bloking_profile_photo:props.profile,
        date:`${new Date().getDate()}/${new Date().getMonth()+1}/${new Date().getFullYear()}`
       }).then(()=>{
         remove(ref(db, 'myfriends/' + props.id))
       })
  }

  return (
    <>
       <div className='flex justify-around items-center mt-2 border-b pb-2 border-bdr last:border-0'>
               <div >
                <img className='w-10 h-10 rounded-full' src={props.profile} />
               </div>
               <div>
               <h4 className={`${modeStatus ? 'bold_text text-xs text-gray-200':'bold_text text-xs'}`}>{props.name}</h4>
                <p className={`${modeStatus ? 'p_text text-xs text-gray-200':'p_text text-xs'}`}>{props.message}</p>
               </div>
               <div>
               <button onClick={()=>handleUserBlock(props.allvalue)} className='bg-red-700 text-xs font-poppin font-normal text-white px-2 py-1 rounded-lg'>Unfriend</button>
               <button onClick={()=>handleUserBlock(props.allvalue)} className='bg-primary text-xs font-poppin font-normal text-white px-2 py-1 rounded-lg ml-2'>Block</button>
               </div>
          </div>
    </>
  )
}
