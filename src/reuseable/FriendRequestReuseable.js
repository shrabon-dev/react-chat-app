import { getAuth } from 'firebase/auth';
import { getDatabase, push, ref, remove, set } from 'firebase/database'
import React from 'react'
import { useSelector } from 'react-redux';

export const FriendRequestReuseable = (props) => {
  const modeStatus = useSelector((state)=>state.darkmode.value)
  let db = getDatabase();
  let auth = getAuth();

  // Friend Request Accept and Delete 
  let handleFriendRequestAccept = (value) =>{
  

    set(push(ref(db,'myfriends/')),{
     receivername:auth.currentUser.displayName,
     receiverid:auth.currentUser.uid,
     sendername:value.sendername,
     senderid:value.senderid,
     senderprofilephoto:value.senderprofilephoto,
     receiverprofilephoto:auth.currentUser.photoURL,
     date:`${new Date().getDate()}/${new Date().getMonth()+1}/${new Date().getFullYear()}`
    }).then(()=>{
      remove(ref(db, 'friendRequest/' + value.id))
    })

}



  // Friend Request Reject or Delete 
  let handleRejectFriendRequest = (item) =>{
        remove(ref(db, 'friendRequest/' + item.id))
  }
  return (
    <>
         <div className='flex justify-around items-center mt-5 border-b pb-3 border-[#00000041] last:border-0'>
               <div>
                <img className='w-11 h-11 rounded-full' src={props.profile} />
               </div>
               <div>
                <h4 className={`${modeStatus ? 'bold_text text-sm text-gray-200':'bold_text text-sm'}`}>{props.name}</h4>
                <p className={`${modeStatus ? 'p_text text-xs text-gray-200':'p_text text-xs'}`}>{props.message}</p>
               </div>
               <div>
               <button onClick={()=>handleFriendRequestAccept(props.allvalue)} className='bg-primary text-sm font-poppin font-normal text-white px-2 py-1 rounded-lg'>Accept</button>
               <button onClick={()=>handleRejectFriendRequest(props.allvalue)} className='bg-red-500 text-sm font-poppin font-normal text-white px-2 py-1 rounded-lg'>Reject</button>
               </div>
          </div>
    </>
  )
}
