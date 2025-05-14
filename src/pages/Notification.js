import React, { useEffect, useState } from 'react'
import ComingSoon from '../component/comming_soon'
import { Sidebar } from '../component/sidebar'
import { SearchBar } from '../component/search'
import Notifaction from '../component/notification'
import { getDatabase, onValue, ref } from 'firebase/database'
import { getAuth } from 'firebase/auth'
import RightSideBar from '../component/right_sidebar'

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
 
        <div className='flex mobile:flex-wrap tablet:flex-nowrap  bg-bg'>
               <div className='mobile:w-full tablet:w-[400px]'>
                 <Sidebar active='notification' />
               </div>
               {/* <div className='w-full h-full tablet:flex tablet:flex-wrap justify-between px-4 large_tablet:pl-48 tablet:pl-48'> */}
               <div className='w-full h-screen flex justify-center px-4  '>
                    <div className=' '>
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
               <div className='right_sidebar  tablet:w-[420px] desktop:w-[530px]'>
                 <RightSideBar/>
               </div>
        </div>
   </>
  )
}
