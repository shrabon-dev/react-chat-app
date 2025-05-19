import React, { useEffect, useState } from 'react'
import { getAuth } from 'firebase/auth';
import { getDatabase, onValue, push, ref, remove, set } from 'firebase/database'
import { useDispatch, useSelector } from 'react-redux'
import { activechat } from '../../slice/activeChatSlice'

function MessageFriends() {
  const modeStatus = useSelector((state)=>state.darkmode.value)
  let db = getDatabase();
  let auth = getAuth();
  let dispatch = useDispatch();

  let [myfriend,setMyFriend] = useState([]);



  useEffect(()=>{  
    onValue(ref(db, 'myfriends/' ), (snapshot) => {
      
        let arr = []
            snapshot.forEach((item)=>{
               if(auth.currentUser.uid == item.val().receiverid || auth.currentUser.uid == item.val().senderid){
                 arr.push({...item.val(),id:item.key})
               }
            });
            console.log('message box theke bolsi ami')
            setMyFriend(arr)
      });
    },[])

    let handleMessageforClick = (value)=>{

        let userinfo = {}
        if(auth.currentUser.uid == value.receiverid){

            userinfo.status = 'single';
            userinfo.id = value.senderid;
            userinfo.name = value.sendername;
        }else{
          userinfo.status = 'single';
          userinfo.id = value.receiverid;
          userinfo.name = value.receivername;
        }
      dispatch(activechat(userinfo))

    }

  return (
    <>
    <div  >
        
{/* *************************************************** */}
        {/* members start */}
         <div className=''>         
         {myfriend.map((item)=>( 
           <>
           {auth.currentUser.uid == item.senderid ? 
           <>
              <div onClick={()=>handleMessageforClick(item)} className='flex justify-between items-center mt-5 border-b pb-3 border-semi-bdr last:border-0 cursor-pointer'>   
              <div className='flex '>
                    <div>
                      <img className='w-11 h-11 rounded-full' src={item.receiverprofilephoto} />
                    </div>
                    <div className='ml-3'>
                      <h4 className={`${modeStatus ? 'bold_texttext-sm large-desktop:text-lgtext-gray-200':'bold_text text-sm'}`}>{item.receivername}</h4>
                      <p className={`${modeStatus ? 'p_text text-xs text-gray-200':'p_text text-xs'}`}>hi, how are you? {item.sendername}</p>
                    </div>
              </div>
              <div>
                    <p className='text-yellow-800 bg-yellow-400 w-6 h-6 flex justify-center items-center rounded-full'>5</p> 
              </div>
              </div>
           </>
           : 
           <>
              <div onClick={()=>handleMessageforClick(item)} className='flex justify-between items-center mt-5 border-b pb-3 border-semi-bdr last:border-0 cursor-pointer'>   
              <div className='flex '>
                    <div>
                      <img className='w-11 h-11 rounded-full' src={item.senderprofilephoto} />
                    </div>
                    <div className='ml-3'>
                      <h4 className={`${modeStatus ? 'bold_text   text-gray-200':'bold_text  '}`}>{item.sendername}</h4>
                      <p className={`${modeStatus ? 'p_text text-xs text-gray-200':'p_text text-xs'}`}>hi, how are you? {item.receivername}</p>
                    </div>
              </div>
              <div>
                    <p className='text-yellow-800 bg-yellow-400 w-6 h-6 flex justify-center items-center rounded-full'>5</p> 
              </div>
              </div>
        </>
           }

            </>            
         ))}
   
        </div>
        {/* members end */}
    </div>
   </>
  )
}

export default MessageFriends;