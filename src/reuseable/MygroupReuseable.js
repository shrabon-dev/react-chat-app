import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { GroupInfo } from '../features/stateSlice';

export const MygroupReuseable = (props) => {
  const modeStatus = useSelector((state)=>state.darkmode.value)
  const show = useSelector((state) => console.log(state.showGInfo.show))
  const dispatch = useDispatch()



let ss = () =>{
    
}



  return (
  
    <>
       <div className='flex justify-between items-center mt-5 border-b pb-3 border-[#00000041] last:border-0'>
               <div className='flex'>
               <div className='w-12 h-12'>
                <img src={props.profile} />
               </div>
               <div className='ml-2'>
               <h4 className={`${modeStatus ? 'bold_text text-sm text-gray-200':'bold_text text-sm'}`}>{props.name}</h4>
                <p className={`${modeStatus ? 'p_text text-xs text-gray-200':'p_text text-xs'}`}>{props.message}</p>
               </div>
               </div>
              <div>
              
                {/* <button onClick={ ()=>dispatch(GroupInfo('on'))} className='bg-primary text-white mb-2 font-poppin font-normal text-sm p-2 rounded-md cursor-pointer'>{props.btn}</button> */}
              
                <button onClick={ss} className='bg-primary text-white mb-2 font-poppin font-normal text-sm p-2 rounded-md cursor-pointer'>{props.btn}</button>
               </div>
        </div>
    </>
  )

}
