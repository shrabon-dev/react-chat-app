import React from 'react'
import { useSelector } from 'react-redux'

export const GrouprequestReuseble = (props) => {
  const modeStatus = useSelector((state)=>state.darkmode.value)
  return (
    <>
        <div className='flex justify-between items-center mt-5 border-b pb-3 border-[#00000041] last:border-0'>
               
               <div className='flex '>
               <div>
                <img   className='w-10 h-10 rounded-full object-cover' src={props.profile} />
               </div>
               <div className='ml-2'>
                <h4 className={`${modeStatus ? 'bold_text text-sm text-gray-200':'bold_text text-sm'}`}>{props.groupName}</h4>
                <p className={`${modeStatus ? 'p_text text-xs text-gray-200':'p_text text-xs'}`}>{props.message}</p>
               </div>
               </div>

               <div>
  
                <button  className='bg-primary text-xs font-poppin font-semibold text-white px-2 py-1 rounded-lg'>{props.button}</button>
               </div>
          </div>
    </>
  )
}
