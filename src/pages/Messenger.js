import React from 'react'
import { FriendsRequest } from '../component/friendRequest'
import MessageBox from '../component/messagebox'
import MessageFriends from '../component/messagefriends'
import MessageGroup from '../component/messagegroup'
import { SearchBar } from '../component/search'
import { Sidebar } from '../component/sidebar'

export const Messenger = () => {
  return (
    <>
       <div className='flex bg-bg'>
       <div className='mobile:w-screen tablet:w-[180px] tablet:h-screen fixed  mobile:bottom-0 z-[99999]'>
          <Sidebar active='messenger' />
        </div>
        <div className='w-full tablet:h-screen mobile:h-screen tablet:pl-48'>
       {/* <div className='flex gap-5'>
        <div className='w-[80%]'>
        <div className='story_navs py-5 px-10 bg-white shadow-lg'>
          <ul className='flex justify-between'>
            <li className='border-r-2 border-bdr'><img className='w-28 h-28 mr-8 border-2 border-bdr rounded-full' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6TATCdxKaIlhOPwR_Gi2y1w5qskEoX4GAdQ&s' alt='note' /></li>
            <li><img className='w-28 h-28 border-2 border-bdr rounded-full' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6TATCdxKaIlhOPwR_Gi2y1w5qskEoX4GAdQ&s' alt='note' /></li>
            <li><img className='w-28 h-28 border-2 border-bdr rounded-full' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6TATCdxKaIlhOPwR_Gi2y1w5qskEoX4GAdQ&s' alt='note' /></li>
            <li><img className='w-28 h-28 border-2 border-bdr rounded-full' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6TATCdxKaIlhOPwR_Gi2y1w5qskEoX4GAdQ&s' alt='note' /></li>
            <li><img className='w-28 h-28 border-2 border-bdr rounded-full' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6TATCdxKaIlhOPwR_Gi2y1w5qskEoX4GAdQ&s' alt='note' /></li>
            <li><img className='w-28 h-28 border-2 border-bdr rounded-full' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6TATCdxKaIlhOPwR_Gi2y1w5qskEoX4GAdQ&s' alt='note' /></li>
            <li><img className='w-28 h-28 border-2 border-bdr rounded-full' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6TATCdxKaIlhOPwR_Gi2y1w5qskEoX4GAdQ&s' alt='note' /></li>
            <li><img className='w-28 h-28 border-2 border-bdr rounded-full' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6TATCdxKaIlhOPwR_Gi2y1w5qskEoX4GAdQ&s' alt='note' /></li>
            <li><img className='w-28 h-28 border-2 border-bdr rounded-full' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6TATCdxKaIlhOPwR_Gi2y1w5qskEoX4GAdQ&s' alt='note' /></li>
          </ul>
        </div>
        </div>
        <div className='w-[20%]'>
        <div className='story_navs py-5 px-10 bg-white shadow-lg  '>
          <div className='flex justify-between gap-2 overflow-x-scroll'>
             <div className='ofl text-center'>
             <div className='w-20 h-20 border-2 m-auto border-bdr rounded-full relative z-1'> <span className='w-3 h-3 border-2 border-red-300 bg-red-600 z-2 rounded-full absolute bottom-2 right-0'></span> <img className='w-20 h-20 object-cover  rounded-full' src='https://mensgrooming.ie/wp-content/uploads/2022/06/1-scaled.jpg' alt='note' /></div>
             <p className='py-1 font-inter text-center font-normal text-black'>Akbar Ali</p>
             </div>
             <div className='ofl text-center'>
             <div className='w-20 h-20 border-2 m-auto border-bdr rounded-full relative z-1'> <span className='w-3 h-3 border-2 border-red-300 bg-red-600 z-2 rounded-full absolute bottom-2 right-0'></span> <img className='w-20 h-20 object-cover  rounded-full' src='https://mensgrooming.ie/wp-content/uploads/2022/06/1-scaled.jpg' alt='note' /></div>
             <p className='py-1 font-inter text-center font-normal text-black'>Umor Been</p>
             </div>
             <div className='ofl text-center'>
             <div className='w-20 h-20 border-2 m-auto border-bdr rounded-full relative z-1'> <span className='w-3 h-3 border-2 border-red-300 bg-red-600 z-2 rounded-full absolute bottom-2 right-0'></span> <img className='w-20 h-20 object-cover  rounded-full' src='https://mensgrooming.ie/wp-content/uploads/2022/06/1-scaled.jpg' alt='note' /></div>
             <p className='py-1 font-inter text-center font-normal text-black'>Umor Been</p>
             </div>
             <div className='ofl text-center'>
             <div className='w-20 h-20 border-2 m-auto border-bdr rounded-full relative z-1'> <span className='w-3 h-3 border-2 border-red-300 bg-red-600 z-2 rounded-full absolute bottom-2 right-0'></span> <img className='w-20 h-20 object-cover  rounded-full' src='https://mensgrooming.ie/wp-content/uploads/2022/06/1-scaled.jpg' alt='note' /></div>
             <p className='py-1 font-inter text-center font-normal text-black'> Umor Been</p>
             </div>
          </div>
        </div>
        </div>
       </div> */}
       <div className='  large_tablet:flex justify-between pt-5 gap-5  '>
        <div className='tablet:w-[25%] overflow-y-scroll bg-white shadow-xl p-5'>     
                    <SearchBar/>
                    <MessageGroup/>
                    <MessageFriends/>
        </div> 
        <div className='tablet:w-[75%] bg-white shadow-xl'>     
             <MessageBox/>
        </div> 
       </div>
       </div>
       </div>
   </>
  )
}
