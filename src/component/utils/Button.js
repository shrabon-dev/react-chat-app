import React from 'react'

export default function Button({text,type}) {
  return (
    <>
    {type == 'status' ?
    <button className={` bg-primary/10 text-base font-poppin font-normal text-primary px-2 py-1 rounded mr-2`}>{text}</button>
    :
    <button className={` ${type === 'friend' ? 'bg-primary':'bg-red-600'}  text-base font-poppin font-normal text-white px-2 py-1 rounded mr-2`}>{text}</button>
    }
    </>
  )
}
