import React, { useEffect, useState } from 'react'
import ComingSoon from '../component/comming_soon'
import { Sidebar } from '../component/sidebar'
import { SearchBar } from '../component/search'
import Notifaction from '../component/notification'
import { getDatabase, onValue, ref } from 'firebase/database'
import { getAuth } from 'firebase/auth'

export const Notification = () => {
  let db = getDatabase();
  let auth = getAuth();
  let [notification,setNotification] = useState([]);

  // Notification Show
  useEffect(()=>{
    const notificationRef = ref(db,'notification/');
    onValue(notificationRef,(snapshot) => {
      if(snapshot.exists()){
        let arr = [];
        snapshot.forEach((item)=>{
          if(item.val().receiverid === auth.currentUser.uid){
            arr.push({...item.val(),id:item.key});
          }
        })
        setNotification(arr)
      }
    })
  },[])

  return (
    <>
       <div className='flex'>
            <div className='mobile:w-screen tablet:w-[180px] tablet:h-screen fixed  mobile:bottom-0 z-[99999]'>
              <Sidebar active='notification' />
            </div>
            <div className='bg-[#ffffff] w-full h-screen pl-28'>
              <div className='w-full tablet:h-screen mobile:h-screen overflow-hidden large_tablet:flex justify-between px-4 tablet:pl-48'>
                <div className='tablet:w-100% overflow-y-scroll'>     
                    <SearchBar/>
                 <div className='mt-12'>
                   {notification.map((item)=>
                    <Notifaction data={item} img={item.senderprofilephoto} name={item.sendername} notify={item.notify}/>
                   )}
                 </div>
                </div> 
              </div>
            </div>
       </div>
   </>
  )
}
