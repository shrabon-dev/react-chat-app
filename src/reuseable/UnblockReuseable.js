import React from 'react'
import { getDatabase, push, ref, set,onValue, remove } from 'firebase/database'
import { getAuth } from 'firebase/auth'
import { useSelector } from 'react-redux'


export const UnblockReuseable = (props) => {
  const modeStatus = useSelector((state)=>state.darkmode.value)
  let auth = getAuth();
  let db = getDatabase();



  let handleUnblockUsers = () =>{
  

    set(push(ref(db,'myfriends/')),{
     receivername:auth.currentUser.displayName,
     receiverid:auth.currentUser.uid,
     sendername:props.name,
     senderid:props.senderid,
     senderprofilephoto:props.profile,
     receiverprofilephoto:auth.currentUser.photoURL,
     date:`${new Date().getDate()}/${new Date().getMonth()+1}/${new Date().getFullYear()}`
    }).then(()=>{
      remove(ref(db, 'usersblock/' + props.id))
    })

}

  
  return (
   <>
       <div className='flex justify-around items-center mt-5 border-b pb-3 border-[#00000041] last:border-0'>
               <div>
                <img   className='w-10 h-10 rounded-full object-cover' src={props.profile} />
               </div>
               <div>
               <h4 className={`${modeStatus ? 'bold_text text-sm text-gray-200':'bold_text text-sm'}`}>{props.name}</h4>
                <p className={`${modeStatus ? 'p_text text-xs text-gray-200':'p_text text-xs'}`}>{props.message}</p>
               </div>
               <div>
               <button onClick={handleUnblockUsers} className='bg-primary text-sm font-poppin font-semibold text-white px-2 py-1 rounded-lg'>{props.button}</button>
               </div>
          </div>
   </>
  )
}
