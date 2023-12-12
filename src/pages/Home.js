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
       <div className='flex'>
        <div className='mobile:w-screen tablet:w-[180px] tablet:h-full fixed  mobile:bottom-0 z-[99999]'>
          <Sidebar active='home' />
        </div>
        <div className='w-full h-full tablet:flex tablet:flex-wrap justify-between px-4 large_tablet:pl-48 tablet:pl-48'>
              <div className='tablet:w-[445px] large_tablet:w-[48%] desktop:w-[33%] '>
                    {/* <SearchBar/> */}
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
              </div>   
        </div>
       </div>
    </>
  )
}

