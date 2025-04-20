import React, { useEffect, useState } from 'react'
import {BiDotsVerticalRounded} from 'react-icons/bi'

import { getAuth } from "firebase/auth";
import { getDatabase, ref, onValue, remove, push, set} from "firebase/database";
import { useSelector } from 'react-redux';


export const MyGroups = () => {
  const modeStatus = useSelector((state)=>state.darkmode.value)
  let db = getDatabase();
  let auth = getAuth();
  let [myGroupList,setMyGroupList] = useState([]);
  let [show,setShow] = useState(false);
  let [gname,setGName] = useState('')
  let [tname,setTName] = useState('')
  let [aname,setAName] = useState('')
  let [requestGroupList,setRequestGroupList] = useState([])
  let [myGroupMembers,setMyGroupMembers] = useState([])
  let [showRequest,setshowRequest] = useState('')

    // My all group start

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

   let showGroupInfo = (item) =>{
    setGName(item.group_name)
    setTName(item.tag_name)
    setAName(item.admin_name)
      onValue(ref(db, 'groups/' ), (snapshot) => {
        let arr = []
            snapshot.forEach((valuepush)=>{
  
              if(auth.currentUser.uid == valuepush.val().admin_id && item.id == valuepush.val().group_id){
                  arr.push({...valuepush.val(),id:valuepush.key})
             
               }
            });
            setMyGroupMembers(arr)
      });
    setShow(!show)
  }

  // show Request Members INFO
  let showRequstMember = (value) =>{
       onValue(ref(db, 'grouprequest/' ), (snapshot) => {
        let arr = []
            snapshot.forEach((item)=>{
               if(auth.currentUser.uid == item.val().admin_id && value.id == item.val().group_id){
                  arr.push({...item.val(),id:item.key})
               }
            });
            setRequestGroupList(arr)
      });
      setshowRequest(!showRequest)
  }
  // Delete Request Group  Members INFO
    let handleRejectGroupRequest = (id) => {
        remove(ref(db,'grouprequest/' + id))
    }

  // Accept Request Group  Members INFO
  let handleAcceptGroupRequest = (value) =>{
    set(push(ref(db,'groups/')),{
      admin_name:value.admin_name,
      admin_id:value.admin_id,
      group_name:value.group_name,
      tag_name:value.tag_name,
      group_id:value.group_id,
      user_name:value.user_name,
      user_id:value.user_id,
      user_profile:value.user_profile,
      date:`${new Date().getDate()}/${new Date().getMonth()+1}/${new Date().getFullYear()}`

    }).then(()=>{
      remove(ref(db,'grouprequest/' + value.id))
    })
  }


  // show All My Members 

let handleRemoveGropMembers = (id) =>{
  remove(ref(db,'groups/' + id))
}


if(myGroupList.length > 0){
  return (
    <>
    <div  >
        {/* title start */}
         <div className='flex justify-between items-center'>
            <h2 className={`${modeStatus ? 'dark_heading':'light_heading'}`}>My Groups</h2>
            <BiDotsVerticalRounded className='text-primary text-xl'/>
         </div>
        {/* title end */}
{/* *************************************************** */}
        {/* members start */}
        <div className=' '>
        
        {show ? 
          <>
                  <div className='text-right'>
                  <button onClick={()=>setShow(!show)} className='bg-primary text-white mb-2 font-poppin font-normal text-sm p-1 rounded-md cursor-pointer'>Back</button>
                  </div>
                  <div>
                      <div className='text-center'><img className='w-12 h-12 rounded-full m-auto' src='../images/demo.jpg' /></div>
                       <h4 className={`${modeStatus ? 'text-lg font-bold font-nunito text-primary text-center':'text-lg font-bold font-nunito text-primary text-center'}`}>{gname}</h4>
                       <h4 className={`${modeStatus ? 'text-xs font-normal font-nunito text-gray-100 text-center':'text-xs font-normal font-nunito text-gray-700 text-center'}`}>{tname}</h4>

                       <div className='p-4'>
                            <div className={`${modeStatus ? 'dark_info_style':'light_info_style'}`}><span>Admin:</span><span>{aname}</span></div>
                            <div className={`${modeStatus ? 'dark_info_style':'light_info_style'}`}><span>Members:</span><span>1</span></div>                  
                       </div>

                       <>
                       {myGroupMembers.map((item)=>(

                        <div className='flex justify-between items-center mt-5 border-b pb-3 border-[#00000041] last:border-0'>
                        <div className='flex items-center'>
                        <div >
                        <img className='w-12 h-12 rounded-full' src={item.user_profile} />
                        </div>
                        <div className='ml-2'>
                        <h4 className={`${modeStatus ? 'bold_text text-sm text-gray-200':'bold_text text-sm'}`}>{item.user_name}</h4>
                        {/* <p className='p_text text-xs'>Web Dedveloper</p> */}
                        </div>
                        </div>
                        <div>


                        <button onClick={()=>handleRemoveGropMembers(item.id)} className='bg-red-700 text-white mb-2 font-poppin font-normal text-xs p-1 rounded-md cursor-pointer'>Remove</button>

                        </div>
                        </div>

                        ))}
                     
                       </>
      


                  </div>
          </>
        : 
          <>
          {showRequest ? 
          
          <>
               <div className='text-right'>
                  <button onClick={()=>setshowRequest(!showRequest)} className='bg-primary text-white mb-2 font-poppin font-normal text-sm p-1 rounded-md cursor-pointer'>Back</button>
                  </div>

          <>
           {requestGroupList.length > 0 ? 
           
            <>
                         {requestGroupList.map((item)=>(

                        <div className='flex justify-between items-center mt-2 border-b pb-2 border-bdr last:border-0'>
                        <div className='flex'>
                        <div >
                        <img className='w-12 h-12 rounded-full' src={item.user_profile} />
                        </div>
                        <div className='ml-2'>
                        <h4 className={`${modeStatus ? 'bold_text text-sm text-gray-200':'bold_text text-sm'}`}>{item.user_name}</h4>
                        {/* <p className='p_text text-xs'>Web Developer</p> */}
                        </div>
                        </div>
                        <div>


                        <button onClick={()=>handleAcceptGroupRequest(item)} className='bg-primary text-white mb-2 font-poppin font-normal text-xs p-1 rounded-md cursor-pointer'>Accept</button>
                        <button onClick={()=>handleRejectGroupRequest(item.id)} className='bg-red-700 text-white font-poppin font-normal text-xs p-1 rounded-md cursor-pointer '>Reject</button>

                        </div>
                        </div>

                        ))}
            </>
           : 
            <p className={`${modeStatus ? 'bg-[#3d3e51] text-red-500 py-2 px-4 font-nunito rounded mb-2 text-center mt-28':'text-red-500 bg-red-200 text-center py-2 px-4 font-nunito rounded mt-28 mb-2'}`}>Sorry! you have no request</p>
           }
          </>
          </>
          : 
          <>
            {myGroupList.map((item)=>(

                 <div className='flex justify-between items-center mt-5 border-b pb-3 border-[#00000041] last:border-0'>
                 <div className='flex'>
                 <div className='w-12 h-12'>
                  <img src='../images/group/grp1.webp' />
                 </div>
                 <div className='ml-2'>
                 <h4 className={`${modeStatus ? 'bold_text text-sm text-gray-200':'bold_text text-sm'}`}>{item.group_name}</h4>
                  <p className={`${modeStatus ? 'p_text text-xs text-gray-200':'p_text text-xs'}`}>{item.tag_name}</p>
                 </div>
                 </div>
                <div>


                  <button onClick={()=>showRequstMember(item)} className='bg-red-700 text-white font-poppin font-normal text-xs p-1 rounded-md cursor-pointer inline-block'>Mem Req</button>
                  <button onClick={()=>showGroupInfo(item)} className='bg-primary text-white mb-2 font-poppin font-normal text-xs ml-2 p-1 rounded-md cursor-pointer'>info</button>
     
                  </div>
              </div>

            ))}
           </> 
          }
          </>
        }
         </div>
        {/* members end */}

    </div>
   </>
  )
}else{

  return (
    <>
    <div className={`${modeStatus ? 'card p-4 bg-semi-white rounded-lg mt-10':'card p-4 bg-semi-white rounded-lg mt-10'}`}>
        {/* title start */}
         <div className='flex justify-between items-center'>
            <h2 className={`${modeStatus ? 'dark_heading':'light_heading'}`}>My Groups</h2>
            <BiDotsVerticalRounded className='text-primary text-xl'/>
         </div>
        {/* title end */}
{/* *************************************************** */}
        {/* members start */}
        <div className='h-[300px] overflow-y-scroll scrollbar-hide'>
             <p className={`${modeStatus ? 'bg-[#3d3e51] text-red-500 py-2 px-4 font-nunito rounded mb-2 text-center mt-28':'text-red-500 bg-red-200 text-center py-2 px-4 font-nunito rounded mt-28 mb-2'}`}>You have no groups</p>
         </div>
        {/* members end */}

    </div>
   </>
  )
}
}
