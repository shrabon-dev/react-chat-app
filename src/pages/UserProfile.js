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
import Profile from '../component/userProfile'

export const UserProfile = () => {
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
       <div className='flex mobile:flex-wrap tablet:flex-nowrap  bg-bg'>
        <div className='mobile:w-full tablet:w-[400px]'>
          <Sidebar active='home' />
        </div>
        <div className='w-full h-full flex justify-center px-4  '>
          <div className='min-w-[290px]  tablet:max-w-[460px] laptop:min-w-[500px] laptop:max-w-[620px] desktop:min-w-[700px] desktop:max-w-[700px] mobile:py-20 tablet:pt-2 desktop:py-10'>
            <Profile/>
          </div>
        </div>
        <div className='right_sidebar  tablet:w-[420px] desktop:w-[530px]'>
          <RightSideBar/>
        </div>
       </div>
    </>
  )
}

