import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMessageAlert } from '../../slice/messageSlice';

export default function NotifyMessage() {
    const message = useSelector((state) => state.messageNotify.message);
    const type = useSelector((state) => state.messageNotify.status);
    
    console.log('Message:', message); // check what’s logged
    console.log('Type:', type); 
    
    const dispatch = useDispatch();
    useEffect(()=>{
        setTimeout(()=>{
            dispatch(setMessageAlert({
             message: '',
             status: ''
           }))
        },10000)
    },[message])

  return (
    <>
    {message &&
        <div className='message w-full absolute top-1 right-0 bg-primary text-white py-2 text-center rounded'>
            <h2>{message}</h2>
        </div>
    }
    </>
  );
}
