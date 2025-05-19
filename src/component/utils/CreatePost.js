import React from 'react'
import { FcAddImage } from "react-icons/fc";
import { FcVideoCall } from "react-icons/fc";
export default function CreatePost() {
  return (
    <>
            <div className='create_post w-full bg-white mt-4 rounded shadow p-4'>
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
    </>
  )
}
