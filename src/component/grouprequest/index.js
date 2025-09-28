import React, { useEffect, useState } from 'react'
import {BiDotsVerticalRounded} from 'react-icons/bi'
import { GrouprequestReuseble } from '../../reuseable/GrouprequestReuseble'
import { getAuth } from 'firebase/auth';
import { getDatabase, onValue, push, ref, remove, set } from 'firebase/database'
import { useDispatch, useSelector } from 'react-redux';
import { SearchBar } from '../search';
import { closeSidebarModal } from '../../slice/SidebarModalSlice';
import { setMessageAlert } from '../../slice/messageSlice';
import NotifyMessage from '../notifyMessage';
import { IoReturnDownBack } from "react-icons/io5";

export const Grouprequest = () => {
  const modeStatus = useSelector((state)=>state.darkmode.value)
  let db = getDatabase();
  let auth = getAuth();
  let [showCreateGroup,setShowCreateGroup] = useState(false);
  let [groupName,setGroupName] = useState();
  let [tagName,setTagName] = useState();
  let [errorCreateGroup,setErrorCreateGroup] = useState();
  let [suggestGroupList,setSuggestGroupList] = useState([]);
  let [groupRequestHaveorNot,setGroupRequestHaveorNot] = useState([])
  let [groupHaveorNot,setGroupHaveorNot] = useState([])
  let dispatch = useDispatch();




  let getGroupName = (e) =>{
    setGroupName(e.target.value)
    setErrorCreateGroup('')
  } 
  let getTagName = (e) =>{
    setTagName(e.target.value)
    setErrorCreateGroup('')
  } 

  let handleCreateGroup = () =>{
    if(groupName && tagName){
      
      set(push(ref(db,'mygroups/')),{
        admin_name:auth.currentUser.displayName,
        admin_id:auth.currentUser.uid,
        group_name:groupName,
        tag_name:tagName,
        date:`${new Date().getDate()}/${new Date().getMonth()+1}/${new Date().getFullYear()}`
       }).then(()=>{
        setShowCreateGroup(!showCreateGroup)
        setGroupName('')
        setTagName('')
        dispatch(setMessageAlert({
          message: 'Created a new group',
          status: 'success'
        }))
       })
       

    }else{
      setErrorCreateGroup('Please, fill up all inputs')
    }

  }

      // suggest all group start

useEffect(()=>{  
  onValue(ref(db, 'mygroups/' ), (snapshot) => {
    
      let arr = []
          snapshot.forEach((item)=>{
             if(auth.currentUser.uid !== item.val().admin_id ){
               arr.push({...item.val(),id:item.key})
             }
          });
          setSuggestGroupList(arr)
    });
  },[])


  let handleGroupRequest = (value) =>{

      set(push(ref(db,'grouprequest/')),{
        admin_name:value.admin_name,
        admin_id:value.admin_id,
        group_name:value.group_name,
        tag_name:value.tag_name,
        group_id:value.id,
        user_name:auth.currentUser.displayName,
        user_id:auth.currentUser.uid,
        user_profile:auth.currentUser.photoURL,
        date:`${new Date().getDate()}/${new Date().getMonth()+1}/${new Date().getFullYear()}`,
       }).then(() => {
             push(ref(db, 'notification/'), {
               receivername: value.admin_name,
               receiverid: value.admin_id,
               sendername: auth.currentUser.displayName,
               senderid: auth.currentUser.uid,
               senderprofilephoto:auth.currentUser.photoURL,
               notify: 'sent a group request to' + value.group_name,
               readStatus: false,
              })})
  }


  // join group request have or not checking
  useEffect(()=>{
    onValue(ref(db, 'grouprequest/' ), (snapshot) => {
       
           let arr = []

          snapshot.forEach((item)=>{       
              arr.push(item.val().group_id + item.val().user_id)
          });

        setGroupRequestHaveorNot(arr)
    });

    
  },[])

  // join group  have or not checking
  useEffect(()=>{
    onValue(ref(db, 'groups/' ), (snapshot) => {
       
           let arr = []

          snapshot.forEach((item)=>{       
              arr.push(item.val().group_id + item.val().user_id)
          });

        setGroupHaveorNot(arr)
    });

    
  },[])

const handleBackModal = () =>{
    dispatch(closeSidebarModal())
}
  
  return (
   <>
    <div className=''>
        {/* title start */}
          
          <div className='sml_tle flex justify-between items-center py-3 tablet:py-0 tablet:px-0 px-2'>
                  <h4 className='font-poppin text-base text-semi-black font-normal'>My Groups</h4>
                  <button
                    onClick={handleBackModal}
                    className='font-poppin text-xs text-white font-normal bg-primary py-1 px-2 rounded ' >
                    <IoReturnDownBack className='inline-block mr-1'/>
                    Back
                  </button>
          </div>
         <SearchBar/>
        {/* title end */}
{/* *************************************************** */}
        {/* members start */}
        <div className='overflow-y-scroll scrollbar-hide'>

        <div className='p-3 border border-gray-200 mb-2 !rounded-lg'>
          {errorCreateGroup &&
                <p className={`${modeStatus ? 'bg-[#3d3e51] text-red-500 py-2 px-4 font-nunito rounded mt-1 mb-2':'text-red-500 bg-red-200 py-2 px-4 font-nunito rounded mt-1 mb-2'}`}>{errorCreateGroup}</p>
          }
          <input onChange={getGroupName} className='input_css text-sm p-2 mb-4' value={groupName} type={'text'} placeholder='Group Name'/>
          <input onChange={getTagName}  className='input_css text-sm p-2 mb-4' value={tagName} type={'text'} placeholder='Tag'/>
          <div className='text-center'><button onClick={handleCreateGroup} className=' bg-primary text-white text-xs lg:text-sm font-nunito font-normal p-2 rounded-lg '>Create</button></div>
        </div>

        <h2 className='relative text-stone-400 mb-2 font-poppin font-semibold text-sm mt-5'>Suggeest  Group </h2>
        {suggestGroupList.map((item)=>(
        <>
             <div className='flex justify-between items-center mt-5 border-b pb-3 border-[#00000041] last:border-0'>
              
              <div className='flex '>
              <div>
               <img className='w-11 h-11 rounded-full' src='../images/group/grp3.webp' />
              </div>
              <div className='ml-2'>
               <h4 className={`${modeStatus ? 'bold_text text-sm text-gray-200':'bold_text text-sm'}`}>{item.group_name}</h4>
               <p className={`${modeStatus ? 'p_text text-xs text-yellow-100':'p_text text-xs'}`}>{item.tag_name}</p>
             
              </div>
              </div>
  
              <div>
                {groupHaveorNot.includes(auth.currentUser.uid + item.id) || groupHaveorNot.includes(item.id + auth.currentUser.uid) ? 
                <button className='bg-primary text-xs font-poppin font-semibold text-white px-2 py-1 rounded-lg'>Message</button>
                
                : 
                <>
                 {groupRequestHaveorNot.includes(auth.currentUser.uid+ item.id) || groupRequestHaveorNot.includes(item.id + auth.currentUser.uid) ? 
              
                 <button className='bg-primary text-xs font-poppin font-semibold text-white px-2 py-1 rounded-lg'>Panding</button>
                 : 
                 
                 <button onClick={()=>handleGroupRequest(item)} className='bg-primary text-xs font-poppin font-semibold text-white px-2 py-1 rounded-lg'>Join</button>       
                 
                 } 
                </>
                }


               </div>
           </div>
        </>
        ))}
        
        </div>



        {/* members end */}

    </div>
    <NotifyMessage/>
   </>
  )
}
