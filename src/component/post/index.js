import React from 'react'
import { Link } from 'react-router-dom'
import { FiPlus } from "react-icons/fi";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { AiFillLike,AiFillDislike  } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { FaShare } from "react-icons/fa";





export default function Posts() {
  return (
    <div className='w-[780px] py-10'>
        {/* Notice Start */}
        <p className='text-center text-red-700 bg-red-100 rounded py-2 mb-5'>This site is currently under construction as we are upgrading the UI of our chat application for a more enhanced and professional experience. Stay tuned for updates! <b> Last Updated - 13/05/25</b></p>
        {/* Notice End */}
        <div className='story_lists flex items-center gap-5 justify-between '>
            <div className='item w-[200px]  flex justify-center items-center h-[280px] overflow-hidden bg-black/80 rounded relative'>
               <div className='w-20 cursor-pointer h-20 border-2 flex items-center justify-center rounded-full border-gray-400'>
                    <FiPlus className='text-4xl text-white'/>
               </div>
               <div className='usr absolute flex gap-4 items-center p-2 bottom-0 left-0 z-1 w-full bg-gradient-to-t to-black/20 from-black'>
                 <img className='w-10 h-10 rounded-full' src='https://media.istockphoto.com/id/1082483460/photo/beautiful-black-man.jpg?s=612x612&w=0&k=20&c=MmNFcZf6z2WLY7jMBAmtLxo6YNItudiRuzn-z7V3tZk=' />
                <Link to={'/'}><p className='text-sm font-poppin text-white'>Ruman Uddin</p></Link>               
               </div>
            </div>
            <div className='item w-[200px] flex relative justify-center items-center h-[280px] overflow-hidden bg-black/80 rounded'>
               <img className='object-center' src='https://img.freepik.com/premium-photo/dawn-with-flowers-mountains_209487-41.jpg' alt='story_img' />
               <div className='usr absolute flex gap-4 items-center p-2 bottom-0 left-0 z-1 w-full bg-gradient-to-t to-black/20 from-black'>
                 <img className='w-10 h-10 rounded-full' src='https://media.istockphoto.com/id/1082483460/photo/beautiful-black-man.jpg?s=612x612&w=0&k=20&c=MmNFcZf6z2WLY7jMBAmtLxo6YNItudiRuzn-z7V3tZk=' />
                <Link to={'/'}><p className='text-sm font-poppin text-white'>Ruman Uddin</p></Link>               
               </div>
            </div>
            <div className='item w-[200px] relative flex justify-center items-center h-[280px] overflow-hidden bg-black/80 rounded'>
               <img className='object-center' src='https://natureconservancy-h.assetsadobe.com/is/image/content/dam/tnc/nature/en/photos/w/o/WOPA160517_D056-resized.jpg?crop=864%2C0%2C1728%2C2304&wid=600&hei=800&scl=2.88' alt='story_img' />
               <div className='usr absolute flex gap-4 items-center p-2 bottom-0 left-0 z-1 w-full bg-gradient-to-t to-black/20 from-black'>
                 <img className='w-10 h-10 rounded-full' src='https://media.istockphoto.com/id/1082483460/photo/beautiful-black-man.jpg?s=612x612&w=0&k=20&c=MmNFcZf6z2WLY7jMBAmtLxo6YNItudiRuzn-z7V3tZk=' />
                <Link to={'/'}><p className='text-sm font-poppin text-white'>Ruman Uddin</p></Link>               
               </div>
            </div>
            <div className='item w-[200px] relative flex justify-center items-center h-[280px] overflow-hidden bg-black/80 rounded'>
               <img className='object-center' src='https://st4.depositphotos.com/8660766/39016/i/450/depositphotos_390165278-stock-photo-blue-green-summer-park.jpg' alt='story_img' />
               <div className='usr absolute flex gap-4 items-center p-2 bottom-0 left-0 z-1 w-full bg-gradient-to-t to-black/20 from-black'>
                 <img className='w-10 h-10 rounded-full' src='https://media.istockphoto.com/id/1082483460/photo/beautiful-black-man.jpg?s=612x612&w=0&k=20&c=MmNFcZf6z2WLY7jMBAmtLxo6YNItudiRuzn-z7V3tZk=' />
                <Link to={'/'}><p className='text-sm font-poppin text-white'>Ruman Uddin</p></Link>               
               </div>
            </div>
        </div>
        <div className='post_lists p-5 mt-10 border border-bdr rounded-xl h-[1080px] overflow-y-scroll'>
            <div className='item bg-white p-5 rounded-2xl'>
                {/* Post hdr Start */}
                <div className='flex items-start justify-between'>
                    <div className='usr flex gap-3'>
                        <img className='w-10 h-10 rounded-full border-2 border-brd' src='https://media.istockphoto.com/id/1082483460/photo/beautiful-black-man.jpg?s=612x612&w=0&k=20&c=MmNFcZf6z2WLY7jMBAmtLxo6YNItudiRuzn-z7V3tZk=' alt='puser_image'/>
                        <Link className='text-base text-black' to={'/'}>Jumman Talukdar
                        <span className='text-xs text-gray-500 block'>Front End Developer</span>
                        </Link>
                    </div>
                    <div>
                        <HiOutlineDotsVertical className="text-2xl text-gray-500"/>
                    </div>
                </div>
                {/* Post cntn Start */}
                <div className='pst_cntn py-5'>
                    <p>Naaaa bro Hin still dey house jare , I no sure say i wan sell am tho Naaaa bro Hin still dey house jare , I no sure say i wan sell am thoNaaaa bro Hin still dey house jare , I no sure say i wan sell am thoNaaaa bro Hin still dey house jare , I no sure say i wan sell am tho</p>
                    <div className=' w-full h-[400px] rounded-xl my-5 overflow-hidden '>
                        <img className='w-full object-cover' src='https://w0.peakpx.com/wallpaper/204/667/HD-wallpaper-spring-nature.jpg' alt='img_cont'/>
                    </div>
                </div>
                {/* Post cntn Start */}
                <div className='pst_ftr flex justify-between items-center'>
                  <div className='flex gap-5 items-center'>
                    <span className='font-poppin text-base text-gray-500 flex gap-3 items-center'><AiFillLike/> 560k </span>
                    <span className='font-poppin text-base text-gray-500 flex gap-3 items-center'><AiFillDislike /> 160k </span>
                    <span className='font-poppin text-base text-gray-500 flex gap-3 items-center'><FaComment/> 160k </span>
                  </div>
                    <span className='font-poppin text-base text-gray-500 flex gap-3 items-center'><FaShare/> 160k </span>
                </div>

            </div>
            <div className='item bg-white p-5 rounded-2xl mt-5'>
                {/* Post hdr Start */}
                <div className='flex items-start justify-between'>
                    <div className='usr flex gap-3'>
                        <img className='w-10 h-10 rounded-full border-2 border-brd' src='https://media.istockphoto.com/id/1082483460/photo/beautiful-black-man.jpg?s=612x612&w=0&k=20&c=MmNFcZf6z2WLY7jMBAmtLxo6YNItudiRuzn-z7V3tZk=' alt='puser_image'/>
                        <Link className='text-base text-black' to={'/'}>Jumman Talukdar
                        <span className='text-xs text-gray-500 block'>Front End Developer</span>
                        </Link>
                    </div>
                    <div>
                        <HiOutlineDotsVertical className="text-2xl text-gray-500"/>
                    </div>
                </div>
                {/* Post cntn Start */}
                <div className='pst_cntn py-5'>
                    <p>Naaaa bro Hin still dey house jare , I no sure say i wan sell am tho Naaaa bro Hin still dey house jare , I no sure say i wan sell am thoNaaaa bro Hin still dey house jare , I no sure say i wan sell am thoNaaaa bro Hin still dey house jare , I no sure say i wan sell am tho</p>
                    <div className=' w-full h-[400px] rounded-xl my-5 overflow-hidden '>
                        <img className='w-full object-cover' src='https://w0.peakpx.com/wallpaper/204/667/HD-wallpaper-spring-nature.jpg' alt='img_cont'/>
                    </div>
                </div>
                {/* Post cntn Start */}
                <div className='pst_ftr flex justify-between items-center'>
                  <div className='flex gap-5 items-center'>
                    <span className='font-poppin text-base text-gray-500 flex gap-3 items-center'><AiFillLike/> 560k </span>
                    <span className='font-poppin text-base text-gray-500 flex gap-3 items-center'><AiFillDislike /> 160k </span>
                    <span className='font-poppin text-base text-gray-500 flex gap-3 items-center'><FaComment/> 160k </span>
                  </div>
                    <span className='font-poppin text-base text-gray-500 flex gap-3 items-center'><FaShare/> 160k </span>
                </div>

            </div>
            <div className='item bg-white p-5 rounded-2xl mt-5'>
                {/* Post hdr Start */}
                <div className='flex items-start justify-between'>
                    <div className='usr flex gap-3'>
                        <img className='w-10 h-10 rounded-full border-2 border-brd' src='https://media.istockphoto.com/id/1082483460/photo/beautiful-black-man.jpg?s=612x612&w=0&k=20&c=MmNFcZf6z2WLY7jMBAmtLxo6YNItudiRuzn-z7V3tZk=' alt='puser_image'/>
                        <Link className='text-base text-black' to={'/'}>Jumman Talukdar
                        <span className='text-xs text-gray-500 block'>Front End Developer</span>
                        </Link>
                    </div>
                    <div>
                        <HiOutlineDotsVertical className="text-2xl text-gray-500"/>
                    </div>
                </div>
                {/* Post cntn Start */}
                <div className='pst_cntn py-5'>
                    <p>Naaaa bro Hin still dey house jare , I no sure say i wan sell am tho Naaaa bro Hin still dey house jare , I no sure say i wan sell am thoNaaaa bro Hin still dey house jare , I no sure say i wan sell am thoNaaaa bro Hin still dey house jare , I no sure say i wan sell am tho</p>
                    <div className=' w-full h-[400px] rounded-xl my-5 overflow-hidden '>
                        <img className='w-full object-cover' src='https://w0.peakpx.com/wallpaper/204/667/HD-wallpaper-spring-nature.jpg' alt='img_cont'/>
                    </div>
                </div>
                {/* Post cntn Start */}
                <div className='pst_ftr flex justify-between items-center'>
                  <div className='flex gap-5 items-center'>
                    <span className='font-poppin text-base text-gray-500 flex gap-3 items-center'><AiFillLike/> 560k </span>
                    <span className='font-poppin text-base text-gray-500 flex gap-3 items-center'><AiFillDislike /> 160k </span>
                    <span className='font-poppin text-base text-gray-500 flex gap-3 items-center'><FaComment/> 160k </span>
                  </div>
                    <span className='font-poppin text-base text-gray-500 flex gap-3 items-center'><FaShare/> 160k </span>
                </div>

            </div>
            <div className='item bg-white p-5 rounded-2xl mt-5'>
                {/* Post hdr Start */}
                <div className='flex items-start justify-between'>
                    <div className='usr flex gap-3'>
                        <img className='w-10 h-10 rounded-full border-2 border-brd' src='https://media.istockphoto.com/id/1082483460/photo/beautiful-black-man.jpg?s=612x612&w=0&k=20&c=MmNFcZf6z2WLY7jMBAmtLxo6YNItudiRuzn-z7V3tZk=' alt='puser_image'/>
                        <Link className='text-base text-black' to={'/'}>Jumman Talukdar
                        <span className='text-xs text-gray-500 block'>Front End Developer</span>
                        </Link>
                    </div>
                    <div>
                        <HiOutlineDotsVertical className="text-2xl text-gray-500"/>
                    </div>
                </div>
                {/* Post cntn Start */}
                <div className='pst_cntn py-5'>
                    <p>Naaaa bro Hin still dey house jare , I no sure say i wan sell am tho Naaaa bro Hin still dey house jare , I no sure say i wan sell am thoNaaaa bro Hin still dey house jare , I no sure say i wan sell am thoNaaaa bro Hin still dey house jare , I no sure say i wan sell am tho</p>
                    <div className=' w-full h-[400px] rounded-xl my-5 overflow-hidden '>
                        <img className='w-full object-cover' src='https://w0.peakpx.com/wallpaper/204/667/HD-wallpaper-spring-nature.jpg' alt='img_cont'/>
                    </div>
                </div>
                {/* Post cntn Start */}
                <div className='pst_ftr flex justify-between items-center'>
                  <div className='flex gap-5 items-center'>
                    <span className='font-poppin text-base text-gray-500 flex gap-3 items-center'><AiFillLike/> 560k </span>
                    <span className='font-poppin text-base text-gray-500 flex gap-3 items-center'><AiFillDislike /> 160k </span>
                    <span className='font-poppin text-base text-gray-500 flex gap-3 items-center'><FaComment/> 160k </span>
                  </div>
                    <span className='font-poppin text-base text-gray-500 flex gap-3 items-center'><FaShare/> 160k </span>
                </div>

            </div>
        </div>
    </div>
  )
}
