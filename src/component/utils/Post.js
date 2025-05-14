import React from 'react'
import { Link } from 'react-router-dom'
import { FiPlus } from "react-icons/fi";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { AiFillLike,AiFillDislike  } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { FaShare } from "react-icons/fa";


export default function PostItem() {
  return (
    <>
    <div className='item bg-white mobile:p-3 tablet:p-5 mobile:rounded tablet:rounded-xl mb-5'>
                    {/* Post hdr Start */}
                    <div className='flex items-start justify-between'>
                        <div className='usr flex gap-3'>
                            <img className='w-10 h-10 rounded-full border-2 object-cover border-brd' src='https://media.istockphoto.com/id/1082483460/photo/beautiful-black-man.jpg?s=612x612&w=0&k=20&c=MmNFcZf6z2WLY7jMBAmtLxo6YNItudiRuzn-z7V3tZk=' alt='puser_image'/>
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
                        <p className='post_p'>Naaaa bro Hin still dey house jare , I no sure say i wan sell am tho Naaaa bro Hin still dey house jare , I no sure say i wan sell am thoNaaaa bro Hin still dey house jare , I no sure say i wan sell am thoNaaaa bro Hin still dey house jare , I no sure say i wan sell am tho</p>
                        <div className=' !aspect-square  mobile:rounded tablet:rounded-xl  my-5 overflow-hidden '>
                            <img className='!aspect-square object-cover' src='https://w0.peakpx.com/wallpaper/204/667/HD-wallpaper-spring-nature.jpg' alt='img_cont'/>
                        </div>
                    </div>
                    {/* Post cntn Start */}
                    <div className='pst_ftr flex justify-between items-center'>
                      <div className='flex gap-5 items-center'>
                        <span className='font-poppin mobile:text-xs desktop:text-base text-gray-500 flex mobile:gap-1 tablet:gap-3 items-center'><AiFillLike/> 560k </span>
                        <span className='font-poppin mobile:text-xs desktop:text-base text-gray-500 flex mobile:gap-1 tablet:gap-3 items-center'><AiFillDislike /> 160k </span>
                        <span className='font-poppin mobile:text-xs desktop:text-base text-gray-500 flex mobile:gap-1 tablet:gap-3 items-center'><FaComment/> 160k </span>
                      </div>
                        <span className='font-poppin mobile:text-xs desktop:text-base text-gray-500 flex mobile:gap-1 tablet:gap-3 items-center'><FaShare/> 160k </span>
                    </div>
    
    </div>
    </>
  )
}
