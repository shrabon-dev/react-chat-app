import React, { useEffect, useState } from 'react'

import { getAuth } from "firebase/auth";
import { getDatabase, ref, onValue, remove, push, set} from "firebase/database";
import { useDispatch, useSelector } from 'react-redux'
import { activechat } from '../../slice/activeChatSlice'

export default function MessageGroup() {
  const modeStatus = useSelector((state)=>state.darkmode.value)
  let db = getDatabase();
  let auth = getAuth();
  let dispatch = useDispatch();
  let [myGroupList,setMyGroupList] = useState([]);
  let [joinGroupList,setJoinGroupList] = useState([]);
  useEffect(()=>{  
  
    onValue(ref(db, 'mygroups/' ), (snapshot) => {
        let arr = []
            snapshot.forEach((item)=>{
               if(auth.currentUser.uid == item.val().admin_id ){
                 arr.push({...item.val(),id:item.key})
               }
            });
            setMyGroupList(arr)
      });
  
    },[])
    useEffect(()=>{  
      onValue(ref(db, 'groups/' ), (snapshot) => {
        
          let arr = []
              snapshot.forEach((item)=>{
                 if(auth.currentUser.uid == item.val().user_id ){
                   arr.push({...item.val(),id:item.key})
                 }
              });
              setJoinGroupList(arr)
        });
    
      },[])

      let handleMessageforClick = (value,mygroupid)=>{

        let userinfo = {}
        if(auth.currentUser.uid == value.admin_id){
            userinfo.status = 'group';
            userinfo.id = mygroupid;
            userinfo.name = value.group_name;
            userinfo.tag_name = value.tag_name;
            userinfo.user_id = auth.currentUser.uid;
          
        }else if(auth.currentUser.uid == value.user_id){
          userinfo.status = 'group';
          userinfo.id = value.group_id;
          userinfo.name = value.group_name;
          userinfo.tag_name = value.tag_name;
          userinfo.user_id = auth.currentUser.uid;
        }

        dispatch(activechat(userinfo))
      }


  return (
    <>
    <div>
       
{/* *************************************************** */}
        {/* members start */}
         <div className='  '>   
         {myGroupList.map((item)=>(
          <div onClick={()=>handleMessageforClick(item,item.id)} className='flex justify-between cursor-pointer items-center mt-5 border-b pb-3 border-semi-bdr last:border-0'>
                
              <div className='flex '>
                    <div>
                      <img className='w-11 h-11 rounded-full' src='../images/group/grp3.webp' />
                    </div>
                    <div className='ml-3'>
                      <h4 className={`${modeStatus ? 'bold_text text-lg text-gray-200':'bold_text text-lg'}`}>{item.group_name}</h4>
                      <p className={`${modeStatus ? 'p_text text-xs text-gray-200':'p_text text-xs'}`}>{item.tag_name}</p>
                    </div>
              </div>

              <div>
                    <p className='text-yellow-800 bg-yellow-400 w-6 h-6 flex justify-center items-center rounded-full'>5</p> 
              </div>
          </div>
         ))}  
        {joinGroupList.map((item)=>(
          <div onClick={()=>handleMessageforClick(item)} className='flex justify-between cursor-pointer items-center mt-5 border-b pb-3 border-semi-bdr last:border-0'>
                
              <div className='flex '>
                    <div>
                      <img className='w-11 h-11 rounded-full' src='../images/group/grp3.webp' />
                    </div>
                    <div className='ml-3'>
                      <h4 className={`${modeStatus ? 'bold_text text-lg text-gray-200':'bold_text text-lg'}`}>{item.group_name}</h4>
                      <p className={`${modeStatus ? 'p_text text-xs text-gray-200':'p_text text-xs'}`}>{item.tag_name}</p>
                    </div>
              </div>

              <div>
                    <p className='text-yellow-800 bg-yellow-400 w-6 h-6 flex justify-center items-center rounded-full'>5</p> 
              </div>
          </div>
         ))}  
       
         
   
        </div>
        {/* members end */}
    </div>
   </>
  )
}
