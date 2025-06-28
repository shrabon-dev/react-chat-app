import React, { useEffect, useState } from 'react'
import ComingSoon from '../component/comming_soon'
import { Sidebar } from '../component/sidebar'
import RightSideBar from '../component/right_sidebar'
import { getDatabase, update,ref } from 'firebase/database'
import { useDispatch, useSelector } from 'react-redux'
import { getAuth } from 'firebase/auth'
import { setMessageAlert } from '../slice/messageSlice'
import { userLoginInfo } from '../slice/userSlice'

export const Setting = () => {
  const user = useSelector((state)=>state.userLoginInfo.userInfo)
  const db = getDatabase();
  const auth = getAuth();
  const dispatch = useDispatch();
const msg = useSelector((state) => state.messageNotify);

  const [formData, setFormData] =  useState({
    displayName: '',
    email: '',
  })
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((previous)=>({...previous,[name]:value }))
  }
  const handleFormSubmit = (e) => {
    e.preventDefault();
 
    update(ref(db, 'users/' + user?.uid), {
      username: formData.displayName,
      email: formData.email,
    }).then(() => {
      dispatch(setMessageAlert({ message: 'Data updated successfully!', status: 'success',}))
    const updatedUser = {
      ...user,
      displayName: formData.displayName,
      email: formData.email,
    };

    // Update localStorage
    localStorage.setItem('userInfo', JSON.stringify(updatedUser));

    // Update Redux
    dispatch(userLoginInfo(updatedUser));
    
    }).then(()=>{
       console.log()
    }).catch((error) => {
      console.error('Error updating data:', error);
    }) 
  }
useEffect(() => {
 
  if (user) {
    setFormData({
      displayName: user?.displayName || '',
      email: user?.email || '',
    });
  }
  setTimeout(()=>{
    dispatch(setMessageAlert({ message: '',
          status: '',}))
  },[5000])

}, [user]);
  return (
    <>
          <div className='flex mobile:flex-wrap tablet:flex-nowrap  bg-bg'>
            <div className='mobile:w-full tablet:w-[400px]'>
              <Sidebar active='home' />
            </div>
            <div className='w-full h-full flex justify-center px-4  '>
              <div className='min-w-[290px] tablet:max-w-[460px] laptop:min-w-[500px] laptop:max-w-[620px] desktop:min-w-[700px] desktop:max-w-[700px] mobile:py-20 tablet:pt-2 desktop:py-10'>
                 <div className='stng_sec  bg-white rounded-lg shadow-md'>
                   <h6 className='text-xl font-semibold text-semi-black mb-5 p-5'>Customize Your Information</h6>
                   {msg.message && (
                     <div className={`p-2 mb-4 text-sm  mx-2 ${msg.status === 'success' ? 'bg-blue-400/50 text-blue-700' : 'bg-red-400/50 text-red-700'}  rounded`} role="alert">
                       <span className="font-medium">{msg.message}</span>
                     </div>)}
                   <div className='w-full p-5'>
                     <form>
                      <div className='group_inp '>
                        <label className='text-sm font-medium text-semi-black'>Display Name</label>
                        <input onChange={handleFormChange} type='text' name="displayName" value={formData.displayName} placeholder='Enter your display name' className='w-full h-10 border border-bdr rounded-lg px-3 py-2 mt-2 focus:outline-none focus:border-primary' />
                      </div>
                      <div aria-disabled className='group_inp mt-2 '>
                        <label className='text-sm font-medium text-semi-black'>Email</label>
                        <input readOnly disabled onChange={handleFormChange} type='email'  name="email" value={formData.email} placeholder='Enter your email' className='opacity-70 w-full h-10 border border-bdr rounded-lg px-3 py-2 mt-2 focus:outline-none focus:border-primary' /> 
                      </div>
                      <div aria-disabled className='group_inp mt-2'>
                        <label className='text-sm font-medium text-semi-black '>Password Change</label>
                        <input readOnly disabled type='password' placeholder='.......' className='w-full h-10 border opacity-50 border-bdr rounded-lg px-3 py-2 mt-2 focus:outline-none focus:border-primary' />
                      </div>
                      <div className='text-center mt-5'>
                        <button onClick={handleFormSubmit} type='submit' className='w-full h-10 bg-primary text-white rounded-lg mt-5 hover:bg-primary/90 transition duration-300'>Save Changes</button>
                      </div>

                     </form>
                   </div>
                 </div>
              </div>
            </div>
            <div className='right_sidebar  tablet:w-[420px] desktop:w-[530px]'>
              <RightSideBar/>
            </div>
          </div>
   </>
  )
}
