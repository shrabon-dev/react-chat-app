import React from 'react'
import ComingSoon from '../component/comming_soon'
import { Sidebar } from '../component/sidebar'

export const Setting = () => {
  return (
    <>
       <div className='flex bg-bg'>
       <div className='mobile:w-screen tablet:w-[180px] tablet:h-screen  mobile:bottom-0 fixed z-[99999]'>
          <Sidebar active='setting' />
       </div>
       <div className='bg-white w-full h-screen pl-28'>
              <ComingSoon/>
       </div>
       </div>
   </>
  )
}
