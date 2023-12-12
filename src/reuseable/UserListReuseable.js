import { getDatabase, push, ref, set,onValue } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import {AiOutlinePlus} from 'react-icons/ai'
import { getAuth } from 'firebase/auth'
import { useDispatch, useSelector } from 'react-redux'

export const UserListReuseable = (props) => {
  const modeStatus = useSelector((state)=>state.darkmode.value)

   let auth = getAuth();
   let db = getDatabase();
   let [friendHaveorNot, setFriendHaveorNot] = useState([]);
   let [blockHaveorNot, setBlockHaveorNot] = useState([]);
   let [myfriendHaveorNot, setMyfriendHaveorNot] = useState([]);

  let handleFriendRequest = (value) =>{
  
         set(push(ref(db,'friendRequest/')),{
          receivername:value.username,
          receiverid:value.userid,
          sendername:auth.currentUser.displayName,
          senderid:auth.currentUser.uid,
          senderprofilephoto:auth.currentUser.photoURL,
          receiverprofilephoto:value.profile_picture,
         }).then(()=>{
          set(push(ref(db,'notification/')),{
            receivername:value.username,
            receiverid:value.userid,
            sendername:auth.currentUser.displayName,
            senderid:auth.currentUser.uid,
            senderprofilephoto:auth.currentUser.photoURL,
            notify:'sended friend request to you',
            readStatus:false,
           }).then(()=>{

           })

         })
  }

    // Cheack My Friend Have or Not
    useEffect(()=>{
      onValue(ref(db, 'myfriends/' ), (snapshot) => {
             let arr = []
            snapshot.forEach((item)=>{       
                arr.push(item.val().senderid + item.val().receiverid)
            });
            setMyfriendHaveorNot(arr)
      });
    },[])

  // Cheack Block Have or Not
  useEffect(()=>{
    onValue(ref(db, 'usersblock/' ), (snapshot) => {
           let arr = []
          snapshot.forEach((item)=>{       
              arr.push(item.val().whom_bloking_id + item.val().who_block_id)
          });
          setBlockHaveorNot(arr)
    }); 
  },[])


  // Cheack Friend Request Have or Not
  useEffect(()=>{
    onValue(ref(db, 'friendRequest/' ), (snapshot) => {
           let arr = []
          snapshot.forEach((item)=>{       
              arr.push(item.val().senderid + item.val().receiverid)
          });
        setFriendHaveorNot(arr)
    });
  },[])

return (
    <>
        <div className='flex justify-around items-center mt-5 border-b pb-3 border-[#00000041] last:border-0'>
               <div className='w-12 h-12'>
                <img className='w-12 h-12 rounded-full' src={props.profile} />
               </div>
               <div>
               <h4 className={`${modeStatus ? 'bold_text text-sm text-gray-200':'bold_text text-sm'}`}>{props.name}</h4>
                <p className={`${modeStatus ? 'p_text text-xs text-gray-200':'p_text text-xs'}`}>{props.message}</p>
               </div>
               <div>


                        <>
                        {friendHaveorNot.includes(auth.currentUser.uid + props.allValue.userid) || friendHaveorNot.includes(props.allValue.userid + auth.currentUser.uid) ?
                        
                        <button  className='bg-primary text-sm  text-white px-2 py-1 rounded-lg'> Panding</button>
                        :
                        <>
                        {myfriendHaveorNot.includes(auth.currentUser.uid + props.allValue.userid) || myfriendHaveorNot.includes(props.allValue.userid + auth.currentUser.uid) ?
                        
                        <button  className='bg-primary text-sm  text-white px-2 py-1 rounded-lg'> Friend</button>                 
                 
                        :
                         <>
                    {blockHaveorNot.includes(auth.currentUser.uid + props.allValue.userid) || blockHaveorNot.includes(props.allValue.userid + auth.currentUser.uid ) ? 
                   
                   <button  className='bg-primary text-sm  text-white px-2 py-1 rounded-lg'> Block</button>                 
                   
                   : 
                   <button onClick={()=>handleFriendRequest(props.allValue)} className='bg-primary text-sm  text-white px-2 py-1 rounded-lg'> Request Sent </button>
                 }
                         </>
                        
                         }
                        </>
                        }
                       </>
                     
                 
                 
                   
       
               {/* {myfriendHaveorNot.includes(auth.currentUser.uid + props.allValue.userid) || myfriendHaveorNot.includes(props.allValue.userid + auth.currentUser.uid) ?
                        
                 
                   <button  className='bg-primary text-sm  text-white px-2 py-1 rounded-lg'> Friend</button>                 
            
                   :
                  <>
                    {blockHaveorNot.includes(auth.currentUser.uid + props.allValue.userid) || blockHaveorNot.includes(props.allValue.userid + auth.currentUser.uid) ?
                        <button  className='bg-primary text-sm  text-white px-2 py-1 rounded-lg'> Block</button>                 
                     :
                 
                    <>
                        {friendHaveorNot.includes(auth.currentUser.uid + props.allValue.userid) || friendHaveorNot.includes(props.allValue.userid + auth.currentUser.uid) ?
                        
                        <button  className='bg-primary text-sm  text-white px-2 py-1 rounded-lg'> Panding</button>
                        :
                        <button onClick={()=>handleFriendRequest(props.allValue)} className='bg-primary text-sm  text-white px-2 py-1 rounded-lg'> Request Sent </button>
                        }
                    </>
                 
                    }
                  </>
                } */}

                 </div>
          </div>
    </>
  )
}
