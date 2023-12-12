import React from 'react'
import {FiSearch} from 'react-icons/fi'
import {BiDotsVerticalRounded} from 'react-icons/bi'
import { useSelector } from 'react-redux'

export const SearchBar = ({type}) => {
  const modeStatus = useSelector((state)=>state.darkmode.value)
  return (
    <>
    <div>
        <div className='relative w-full'>

          <input onChange={type} type='search' placeholder='search' className={`${modeStatus ? 'search_dark_style' : 'search_light_style'}`} />
          <span className='absolute text-2xl left-3 top-[22px] text-black'>
            <FiSearch/>
          </span>
          <span className='absolute text-2xl right-4 top-[22px] text-primary '>
            <BiDotsVerticalRounded/>
          </span>
        </div>
    </div>
    </>
  )
}
