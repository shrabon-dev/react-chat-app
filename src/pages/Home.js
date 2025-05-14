import { getAuth } from 'firebase/auth'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate} from 'react-router-dom'
import { BlockUsers } from '../component/blockusers'
import { FriendsRequest } from '../component/friendRequest'
import { Friends } from '../component/friends'
import { Grouprequest } from '../component/grouprequest'
import { MyGroups } from '../component/mygroups'
import { SearchBar } from '../component/search'
import { Sidebar } from '../component/sidebar'
import { Userlist } from '../component/userlist'
import Posts from '../component/post'
import RightSideBar from '../component/right_sidebar'

export const Home = () => {
  const userData = useSelector((state)=>state.userLoginInfo.userInfo);
  let auth = getAuth();
  let naviget = useNavigate();


  useEffect(()=>{

    if(!userData){
      naviget('/signin')
    }
  },[])




  return (
    <>
       <div className='flex flex-wrap  bg-bg'>
        <div className='mobile:w-full tablet:w-[400px]'>
          <Sidebar active='home' />
        </div>
        {/* <div className='w-full h-full tablet:flex tablet:flex-wrap justify-between px-4 large_tablet:pl-48 tablet:pl-48'> */}
        <div className='w-full h-full justify-center px-4  '>
           <Posts/>
              {/* <div className='tablet:w-[445px] large_tablet:w-[48%] desktop:w-[33%] '>
                
                    <Grouprequest/>
                    <FriendsRequest/>
              </div>   
              <div className='tablet:w-[345px] large_tablet:w-[48%] desktop:w-[33%]'>
                     <Friends/>
                     <MyGroups/>
              </div>   
              <div className='tablet:w-[345px] large_tablet:w-[100%] desktop:w-[33%] desktop:block large_tablet:flex large_tablet:justify-between large_tablet:items-baseline'>
                    <Userlist/>
                    <BlockUsers/>
              </div>    */}
        </div>
        <div className='right_sidebar  tablet:w-[530px]'>
          <RightSideBar/>
        </div>
       </div>
    </>
  )
}

