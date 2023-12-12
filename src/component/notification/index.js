import React, { useState } from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";
import { getDatabase, ref, set, update } from "firebase/database";

export default function Notifaction(props) {
  const db = getDatabase();


  let handleUpdateReadStatus = (id) => {
    update(ref(db, 'notification/' + id), {
      readStatus:true,
    })
    .then(({response}) => {
      console.log('Data saved successfully!')
    })
    .catch((error) => {
      console.log(error)
    });
  }
  return (
    <>
     <div onClick={() => handleUpdateReadStatus(props.data.id)} className={`flex items-center gap-2 border-b py-2 last:border-none hover:shadow-lg px-4 duration-300 ease-in-out cursor-pointer ${props.data.readStatus === false ? 'bg-slate-200' :'bg-white'}`}>
        <div>
            <picture>
                <img style={{ borderRadius:'100%',display:'block',width:'50px', height:'50px',objectFit:'cover' }} src={props.img} alt=''/>
            </picture> 
        </div>
        <div>
            <p className='font-nunito text-lg'><span className='font-bold font-nunito text-xl'>{props.name}</span> {props.notify} </p>
        </div>
        <BsThreeDotsVertical className='inline-block opacity-[.5] cursor-pointer'/> 
     </div>
    </>
  )
}
