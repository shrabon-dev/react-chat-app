import React, { useEffect, useState } from 'react'
import {BiDotsVerticalRounded} from 'react-icons/bi'
import { getDatabase, ref, onValue} from "firebase/database";
import { UserListReuseable } from '../../reuseable/UserListReuseable'
import { getAuth } from 'firebase/auth'
import { useSelector } from 'react-redux';
import { SearchBar } from '../search';
// import { AiTwotoneHdd } from 'react-icons/ai';

export const Userlist = () => {
  const modeStatus = useSelector((state)=>state.darkmode.value)
  const db = getDatabase();
  const auth = getAuth();
  let [searchList,setSearchList] = useState([]);
  let [userlist, setUserlist] = useState([]);

  useEffect(()=>{  
  onValue(ref(db, 'users/' ), (snapshot) => {
  
      let arr = []
          snapshot.forEach((item)=>{
             if(auth.currentUser.uid !== item.key){
               arr.push({...item.val(),userid:item.key})
             }
          });
         setUserlist(arr)
    });
  },[])

  let handleSearch = (e) =>{
    
    let arr = [];
        userlist.filter((item)=>{
          if(e.target.value != ''){
            if(item.username.toLowerCase().includes(e.target.value.toLowerCase())){
              arr.push(item)
            }
          }else{
            arr = []
          }
          setSearchList(arr)
        }) 
      } 


  return (
    <>

    <div className={`${modeStatus ? 'dark_mode laptop:mt-2 tablet:mt-8  laptop:mr-0 tablet:mr-5 large_tablet:w-[47%] desktop:w-full':'light_mode laptop:mr-0 tablet:mr-5 laptop:mt-2  tablet:mt-8 large_tablet:w-[47%] desktop:w-full'}`}>
    {/* <div className={`${modeStatus ? 'dark_mode laptop:mt-2 laptop:max-w-[360px] tablet:max-w-[294px] tablet:mt-8  laptop:mr-0 tablet:mr-5':'light_mode laptop:mr-0 tablet:mr-5 laptop:mt-2 laptop:max-w-[360px] tablet:max-w-[294px] tablet:mt-8'}`}> */}
        {/* title start */}

         <div className='flex justify-between items-center'>
            <h2 className={`${modeStatus ? 'dark_heading':'light_heading'}`}>User List</h2>
            <BiDotsVerticalRounded className='text-primary text-xl'/>
         </div>

         <SearchBar type={handleSearch} />

        {/* title end */}
{/* *************************************************** */}
        {/* members start */}
        <div className='h-[340px] overflow-y-scroll scrollbar-hide'>
         {searchList.length > 0 ? 
         searchList.map((item)=>(
          <UserListReuseable allValue={item}  profile={item.profile_picture} name={item.username} message='Hi! are you free now?' />
          ))
         : 
         userlist.map((item)=>(
          <UserListReuseable allValue={item}  profile={item.profile_picture} name={item.username} message='Hi! are you free now?' />
          ))
         }
         </div>
        {/* members end */}

    </div>
   </>
  )
}
