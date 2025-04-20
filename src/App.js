import './App.css';
import { Registration } from './component/registration';
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Signin from './component/signin/index.js';
import { Home } from './pages/Home';
import { Messenger } from './pages/Messenger';
import { Notification } from './pages/Notification';
import { Setting } from './pages/Setting';
import { useEffect, useState } from 'react';
import {darkmode} from './slice/darkmodeSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth } from 'firebase/auth';
// import { current } from '@reduxjs/toolkit';
function App() {
  const userData = useSelector((state)=>state.userLoginInfo.userInfo);
  const dispatch = useDispatch();
  const modeStatus = useSelector((state)=>state.darkmode.value)
  let location = useLocation();

  let auth = getAuth();
  let naviget = useNavigate();

  let handleDarkMode = (e) =>{
    dispatch(darkmode(!modeStatus))
  }

 
  return (
    <>
    <div className={`${modeStatus ? 'bg-[#2d3342] text-white h-screen':''}`}>
      {/* {userData && (
        location.pathname != '/signin' && 
        <div className='inline-flex justify-center fixed z-[99999999] top-2 right-2'>
            <input onChange={handleDarkMode} id="mode" type={'checkbox'} />
            <label for="mode" className='custom_swicth'></label>
        </div>
      )
     } */}
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/messenger' element={<Messenger/>} />
      <Route path='/notification' element={<Notification/>} />
      <Route path='/setting' element={<Setting/>} />
      <Route path='/registration' element={<Registration/>} />
      <Route path='/signin' element={<Signin/>} />
    </Routes>
    </div>
    </>
  );
}

export default App;
