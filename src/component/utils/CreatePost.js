import React, { useState } from 'react'
import { FcAddImage } from "react-icons/fc";
import { FcVideoCall } from "react-icons/fc";
import { BsArrowLeft } from "react-icons/bs";

export default function CreatePost() {
  const [popupShow, setPopupShow] = useState(false);
  const [preViewImgPost, setPreViewImgPost] = useState(false);
  

  let handleShowPostCreatePopup = () =>{
    setPopupShow(!popupShow)
    setPreViewImgPost('')
  }
  let handleUplaodPostImage = (e) =>{
    let img = e.target.files[0];
    console.log(e.target.files[0])
   let reader =  new FileReader()
   
   reader.onload = () => { 
     setPreViewImgPost(reader.result);
    }
   reader.readAsDataURL(img);

   console.log(preViewImgPost)
  }
 
  return (
    <>
    <div className='create_post w-full bg-white mt-4 rounded shadow p-4'>
        <p className=' font-poppin text-lg font-semibold pb-2  text-semi-black'>Share your thoughts with the world - </p>
        <div className='flex gap-3'>
          <input onClick={handleShowPostCreatePopup} className=' w-[90%] justify-between focus:outline-none border-semi-bdr border p-2 px-4 rounded bg-transparent' type='text' placeholder='Share your thought what you think now.....'/>
          <button type='submit' className='w-24 rounded bg-primary text-semi-white font-poppin text-sm '>Post Now</button>
        </div>
        <div className='flex pt-1 gap-3'>
          <label for="img_upload" className='cursor-pointer'>
            <FcAddImage className='text-4xl ' />
          </label>
          <input className='hidden' id='img_upload' type='file'  />
        </div>
    </div>
    {
      popupShow &&
      <>
        <div className='create_post absolute top-1/2 left-1/2 -translate-x-[56%] -translate-y-[75%] w-[710px] bg-white border-semi-bdr rounded mt-4 shadow p-4 z-[999]'>
            {/* <div className='flex'></div> */}
            <p onClick={()=>setPopupShow(!popupShow)} className=' font-poppin text-lg font-semibold pb-2  text-semi-black text-center relative '> <BsArrowLeft className='absolute text-2xl left-0 top-0 cursor-pointer'/> Create Post </p>
            <div className='border border-semi-bdr/50 rounded mt-1 p-3'>
              <textarea className=' w-full h-32 resize-none justify-between focus:outline-none text-semi-black border-semi-bdr border-0 py-2 rounded bg-transparent'>

              </textarea>
              {preViewImgPost ?
              <img src={preViewImgPost} className='w-full h-52 bg-primary/20 !object-contain object-top border border-semi-bdr/50 rounded'/>
              :
              <label for="imgUpl" className=' w-full h-52 cursor-pointer flex justify-center items-center text-primary/40 font-bold text-center border border-semi-bdr/50'>
                 Upload Image or Drop Image
              </label>
              }
              <input onChange={handleUplaodPostImage} className='hidden' type='file' accept='image' id='imgUpl' />
            </div>
            <div className='text-right'>
              <button onClick={()=>setPopupShow(!popupShow)} type='button' className='w-24 py-2 mt-5 ml-auto rounded bg-gray-200 mr-5 text-semi-black font-poppin text-sm '>Cancel</button>
              <button type='submit' className='w-24 py-2 mt-5 ml-auto rounded bg-primary text-semi-white font-poppin text-sm '>Post Now</button>
            </div> 
        </div>
      </>
    }
     
    </>
  )
}
