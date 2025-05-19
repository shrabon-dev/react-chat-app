import React from 'react'
import PostItem from '../utils/Post'
import Button from '../utils/Button'
import { FcAddImage } from "react-icons/fc";
import { FcVideoCall } from "react-icons/fc";


export default function Profile() {
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
                        <img src='../images/demo.jpg' alt='demo.jpg' />
                    </div>
                    <div className='usr_info'>
                        <h3 className='font-poppin text-2xl font-medium text-semi-black'>Yusuf Khan</h3>
                        <h6 className='font-poppin text-sm font-normal text-semi-black'>Front End Developer</h6>
                    </div>
            </div>
            <div className='button text-right'>
                <Button type={'friend'} text={'Friend'} />
                <Button type={'unfriend'} text={'Unfriend'} />
            </div>
          </div>
          {/* Create Port Option Start */}
          <div className='create_post w-full bg-white  rounded shadow p-4'>
            <p className=' font-poppin text-lg font-semibold pb-2  text-semi-black'>Share your thoughts with the world - </p>
            <div className='flex gap-3'>
              <input className=' w-[90%] justify-between focus:outline-none border-semi-bdr border p-2 px-4 rounded bg-transparent' type='text' placeholder='Share your thought what you think now.....'/>
              <button type='submit' className='w-24 rounded bg-primary text-semi-white font-poppin text-sm '>Post Now</button>
            </div>
            <div className='flex pt-1 gap-3'>
              <label for="img_upload" className='cursor-pointer'>
                <FcAddImage className='text-4xl ' />
              </label>
              <input className='hidden' id='img_upload' type='file'  />
            </div>
          </div>
          {/* Post Item Start */}
           <div className='post_lists mobile:p-2 tablet:p-5 mt-10 border border-bdr mobile:rounded tablet:rounded-xl  h-[1080px] overflow-y-scroll'>
                <PostItem/>
                <PostItem/>
                <PostItem/>
                <PostItem/>
                <PostItem/>
                <PostItem/>
                <PostItem/>
            </div>
        </div>
    </>
  )
}
