import React, { useEffect, useState } from 'react'
import PostItem from '../utils/Post'
import Button from '../utils/Button'
import { FcAddImage } from "react-icons/fc";
import { FcVideoCall } from "react-icons/fc";
import CreatePost from '../utils/CreatePost';
import { useSelector } from 'react-redux';
import UserStatus from '../userStatus';
import { getDatabase, onValue, ref } from 'firebase/database';

export default function Profile() {
  const user = useSelector((state)=>state.userLoginInfo.userInfo)
   
      const db = getDatabase();
      const [posts,setPosts] = useState([]);
    
      useEffect(()=>{
        const postRef = ref(db,'posts/')
        onValue(postRef,(snapeshot)=>{
          const data = snapeshot.val();
          const postList = [];
    
          Object.entries(data).forEach(([useId,userPosts]) => {
            Object.entries(userPosts).forEach(([postId,postData]) =>{
              postList.push({
                id:postId,...postData
              })
            })
          })
    
          // Short By Newest
          postList.sort((a,b)=> new Date(b.createdAt) - new Date(a.createdAt))
    
          setPosts(postList);
    
          console.log(posts);
    
        })
      },[])
  return (
    <>
        <div className='w-full h-full'>
          {/* Main Profile Start */}
          {/* Cover Start */}
          <div className='w-full bg-primary h-40 overflow-hidden rounded-xl'>
            <img className='w-full h-full object-cover ' src='../images/cvr.jpg' alt='cover img' />
          </div>
          {/* Profile Start */}
          <div className='w-full relative -top-16 right-0 overflow-hidden rounded-bl-xl rounded-br-xl flex items-end justify-between'>
            <div className='flex items-end gap-5'>
                    <div className='img w-32 h-32 rounded-full overflow-hidden border-4 border-primary'>
                        <img className='object-cover w-full h-full' src={`${user.photoURL ? user.photoURL:'../images/demo.jpg'}`} alt='demo.jpg' />
                    </div>
                    <div className='usr_info'>
                        <h3 className='font-poppin text-2xl font-medium text-semi-black pb-5'>{user.displayName}</h3>
                        {/* <h6 className='font-poppin text-sm font-normal text-semi-black'>Front End Developer</h6> */}
                    </div>
                  
            </div>
            <div className='button text-right'>
              {user? 
                <Button type={'status'} text={<UserStatus userId={user.uid}/>} />
                 
              :
              <>
                <Button type={'friend'} text={'Friend'} />
                <Button type={'unfriend'} text={'Unfriend'} />
              </>
              }
            </div>
          </div>
          {/* Create Port Option Start */}
         
          <CreatePost/>
          {/* Post Item Start */}
           <div className='post_lists mobile:p-2 tablet:p-5 mt-10 border border-bdr mobile:rounded tablet:rounded-xl  h-[1080px] overflow-y-scroll'>
                {posts.map(post => (
                    <PostItem key={post.id} post={post} />
                ))}
            </div>
        </div>
    </>
  )
}
