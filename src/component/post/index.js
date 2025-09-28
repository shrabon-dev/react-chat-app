import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiPlus } from "react-icons/fi";
import PostItem from '../utils/Post';
import CreatePost from '../utils/CreatePost';
import { getDatabase, onValue, ref } from 'firebase/database';

export default function Posts() {
  
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
        
        postList.sort((a,b)=> new Date(b.createdAt) - new Date(a.createdAt))
        setPosts(postList);
      })
    },[])

  return (
    <div className='min-w-[290px] tablet:max-w-[460px] desktop:max-w-[700px] mobile:py-20 laptop:pt-2 desktop:py-10'>
        {/* Notice Start */}
        <p className='text-center mobile:text-xs tablet:text-base text-red-700 bg-red-100 rounded py-2 mb-5'>This site is currently under construction as we are upgrading the UI of our chat application for a more enhanced and professional experience. Stay tuned for updates! <b> Last Updated - 07 Sept 25</b> <br/> <b> <Link to="/noticeboard">View the Important Chat Application Manual</Link> </b> </p>
        {/* Notice End */}
        <div className='story_lists flex items-center gap-5 justify-between '>
            <div className='item mobile:w-[45%] tablet:w-[200px]  flex justify-center items-center h-[280px] overflow-hidden bg-black/80 rounded relative'>
               <div className='w-20 cursor-pointer h-20 border-2 flex items-center justify-center rounded-full border-gray-400'>
                    <FiPlus className='text-4xl text-white'/>
               </div>
               <div className='usr absolute flex gap-4 items-center p-2 bottom-0 left-0 z-1 w-full bg-gradient-to-t to-black/20 from-black'>
                 <img className='w-10 h-10 rounded-full  object-cover' src='https://media.istockphoto.com/id/1082483460/photo/beautiful-black-man.jpg?s=612x612&w=0&k=20&c=MmNFcZf6z2WLY7jMBAmtLxo6YNItudiRuzn-z7V3tZk=' />
                <Link to={'/'}><p className='story_p'>Ruman Uddin</p></Link>               
               </div>
            </div>
            <div className='item mobile:w-[45%] tablet:w-[200px] flex relative justify-center items-center h-[280px] overflow-hidden bg-black/80 rounded'>
               <img className='object-center my-auto' src='https://img.freepik.com/premium-photo/dawn-with-flowers-mountains_209487-41.jpg' alt='story_img' />
               <div className='usr absolute flex gap-4 items-center p-2 bottom-0 left-0 z-1 w-full bg-gradient-to-t to-black/20 from-black'>
                 <img className='w-10 h-10 rounded-full object-cover' src='https://media.istockphoto.com/id/1082483460/photo/beautiful-black-man.jpg?s=612x612&w=0&k=20&c=MmNFcZf6z2WLY7jMBAmtLxo6YNItudiRuzn-z7V3tZk=' />
                <Link to={'/'}><p className='story_p'>Bulu Miya</p></Link>               
               </div>
            </div>
            <div className='item mobile:hidden tablet:block w-[200px] relative flex justify-center items-center h-[280px] overflow-hidden bg-black/80 rounded'>
               <img className='object-center my-auto' src='https://natureconservancy-h.assetsadobe.com/is/image/content/dam/tnc/nature/en/photos/w/o/WOPA160517_D056-resized.jpg?crop=864%2C0%2C1728%2C2304&wid=600&hei=800&scl=2.88' alt='story_img' />
               <div className='usr absolute flex gap-4 items-center p-2 bottom-0 left-0 z-1 w-full bg-gradient-to-t to-black/20 from-black'>
                 <img className='w-10 h-10 rounded-full  object-cover' src='https://media.istockphoto.com/id/1082483460/photo/beautiful-black-man.jpg?s=612x612&w=0&k=20&c=MmNFcZf6z2WLY7jMBAmtLxo6YNItudiRuzn-z7V3tZk=' />
                <Link to={'/'}><p className='story_p'>Miya Vai</p></Link>               
               </div>
            </div>
            <div className='item mobile:hidden tablet:block w-[200px] relative flex justify-center items-center h-[280px] overflow-hidden bg-black/80 rounded'>
               <img className='object-center my-auto' src='https://st4.depositphotos.com/8660766/39016/i/450/depositphotos_390165278-stock-photo-blue-green-summer-park.jpg' alt='story_img' />
               <div className='usr absolute flex gap-4 items-center p-2 bottom-0 left-0 z-1 w-full bg-gradient-to-t to-black/20 from-black'>
                 <img className='w-10 h-10 rounded-full  object-cover' src='https://media.istockphoto.com/id/1082483460/photo/beautiful-black-man.jpg?s=612x612&w=0&k=20&c=MmNFcZf6z2WLY7jMBAmtLxo6YNItudiRuzn-z7V3tZk=' />
                <Link to={'/'}><p className='story_p'>Bappi Sekh</p></Link>               
               </div>
            </div>
        </div>
        {/* Create post Card */}
        <CreatePost/>
        <div className='post_lists mobile:p-2 tablet:p-5 mt-10 border border-bdr mobile:rounded tablet:rounded-xl  h-[1080px] overflow-y-scroll'>
              {posts.map(post => (
                <PostItem key={post.id} post={post} />
              ))}
        </div>
    </div>
  )
}
