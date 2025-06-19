import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiPlus } from "react-icons/fi";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { AiFillLike,AiFillDislike  } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { FaShare } from "react-icons/fa";
import { getDatabase, onValue, get, ref, remove, set, update } from 'firebase/database';
import GetUser from '../../hooks/GetUser';
import Skeleton from 'react-loading-skeleton';
import { getAuth } from 'firebase/auth';
import useLike from '../../hooks/useLike';
import useDislike from '../../hooks/useDislike';


export default function  PostItem({postId, post}) {
 
  let userId = post.userId;
  const { user, loading } = GetUser(userId);
  const db = getDatabase();
  const auth = getAuth();
  const currentUserId = auth.currentUser.uid;
  const postRef = ref(db,`posts/${post.userId}/${postId}`)
  const hasLiked = useLike({ postID: post.id, userID:currentUserId });
  const hasDisliked = useDislike({ postID: post.id, userID:currentUserId });

  console.log('likes:', hasLiked)

const handleLike = async (postId ) => {
  const db = getDatabase();
  const likeId = `${postId}_${currentUserId}`;
  const likeRef = ref(db, `likes_table/${likeId}`);
  const postRef = ref(db, `posts/${post.userId}/${post.id}`);

  const snapshot = await get(likeRef);
  const currentLikes = post.like || 0;

  if (snapshot.exists()) {
    // User already liked — remove
    await remove(likeRef);
    await update(postRef, {
      like: Math.max(currentLikes - 1, 0),
    });
  } else {
    // First time like
    await set(likeRef, {
      who_liked: currentUserId,
      which_post: post.userId,
      post_id: postId,
      timestamp: new Date().toISOString(),
    });
    await update(postRef, {
      like: currentLikes + 1,
    });

    // Optionally remove dislike if it exists
    const dislikeRef = ref(db, `dislikes_table/${postId}_${currentUserId}`);
    const disSnap = await get(dislikeRef);
    if (disSnap.exists()) {
      await remove(dislikeRef);
      await update(postRef, {
        dislike: Math.max((post.dislike || 0) - 1, 0),
      });
    }
  }
};
const handleDislike = async (postId ) => {
  const db = getDatabase();
  const dislikeId = `${postId}_${currentUserId}`;
  const dislikeRef = ref(db, `dislikes_table/${dislikeId}`);
  const postRef = ref(db, `posts/${post.userId}/${postId}`);

  const snapshot = await get(dislikeRef);
  const currentDislikes = post.dislike || 0;

  if (snapshot.exists()) {
    // User already liked — remove
    await remove(dislikeRef);
    await update(postRef, {
      dislike: Math.max(currentDislikes - 1, 0),
    });
  } else {
    // First time like
    await set(dislikeRef, {
      who_liked: currentUserId,
      which_post: post.userId,
      post_id: postId,
      timestamp: new Date().toISOString(),
    });
    await update(postRef, {
      dislike: currentDislikes + 1,
    });

    // Optionally remove like if it exists
    const likeRef = ref(db, `likes_table/${postId}_${currentUserId}`);
    const likSnap = await get(likeRef);
    if (likSnap.exists()) {
      await remove(likeRef);
      await update(postRef, {
        like: Math.max((post.like || 0) - 1, 0),
      });
    }
  }
};

 

  return (
      <>
        <div key={postId} className='item bg-white mobile:p-3 tablet:p-5 mobile:rounded tablet:rounded-xl mb-5'>
            {/* Post hdr Start */}
            <div className='flex items-start justify-between'>
                <div className='usr flex gap-3'>

                    <img className='w-10 h-10 rounded-full border-2 object-cover border-brd' src={user?.profile_picture} alt='puser_image'/>
                  <Link className='text-base text-black' to={'/'}>
                    {user?.username || <Skeleton/>}
                    {/* <span className='text-xs text-gray-500 block'>Front End Developer</span> */}
                  </Link>
                </div>
                <div>
                    <HiOutlineDotsVertical className="text-2xl text-gray-500"/>
                </div>
            </div>
            {/* Post cntn Start */}
            <div className='pst_cntn py-5'>
                <p className='post_p'> {post?.postText} </p>
                {post.postImg &&
                <div className=' !aspect-square  mobile:rounded tablet:rounded-xl  my-5 overflow-hidden '>
                    <img className='!aspect-square  object-contain' src={post.postImg} alt='img_cont'/>
                </div>
                }
            </div>
            {/* Post cntn Start */}
            <div className='pst_ftr flex justify-between items-center'>
              <div className='flex gap-5 items-center'>
                <span onClick={()=>handleLike(post.id)} className={`cursor-pointer font-poppin mobile:text-xs desktop:text-base ${hasLiked ? 'text-blue-500':'text-gray-500' } text-gray-500 flex mobile:gap-1 tablet:gap-1 items-center`}><AiFillLike/> {post?.like} </span>
                <span onClick={()=>handleDislike(post.id)} className={`cursor-pointer font-poppin mobile:text-xs desktop:text-base ${hasDisliked ? 'text-blue-500':'text-gray-500' } text-gray-500 flex mobile:gap-1 tablet:gap-1 items-center`}><AiFillDislike /> {post?.dislike} </span>
                <span  className='cursor-pointer font-poppin mobile:text-xs desktop:text-base text-gray-500 flex mobile:gap-1 tablet:gap-1 items-center'><FaComment/> {post?.comment} </span>
              </div>
                <span className='cursor-pointer font-poppin mobile:text-xs desktop:text-base text-gray-500 flex mobile:gap-1 tablet:gap-1 items-center'><FaShare/> {post?.share} </span>
            </div>
      </div>
      </>
  )
}
