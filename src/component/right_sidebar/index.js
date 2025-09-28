import React, { useState, useRef, useEffect } from 'react';
import { IoCreateOutline } from "react-icons/io5";
import { RightsideModal } from '../../modals/rightsideModal';
import { useDispatch, useSelector } from 'react-redux';
import { setSidebarModal } from '../../slice/SidebarModalSlice'; // ✅ Correct import
import { FaUserFriends } from "react-icons/fa";
import { TiGroup } from "react-icons/ti";
import { ImBlocked } from "react-icons/im";
import { IoCreate } from "react-icons/io5";
import { MdOutlineImportExport } from "react-icons/md";
import { RiNotificationBadgeFill } from "react-icons/ri";
import { AiOutlineHome, AiOutlineSetting } from 'react-icons/ai';
import { TbMessageDots } from 'react-icons/tb';
import { MdOutlineNotifications } from 'react-icons/md';

import { BiLogOut } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signOut, updateProfile } from 'firebase/auth';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { getStorage, ref, uploadString, getDownloadURL } from "firebase/storage";
import { getDatabase, ref as connect, onValue } from 'firebase/database';
import { FaBookmark } from "react-icons/fa6";
import { IoIosCreate } from "react-icons/io"; 
import { RiMessage3Fill } from "react-icons/ri";
import { FaQuestion } from "react-icons/fa";
import { IoIosMenu } from "react-icons/io";



export default function RightSideBar() {
  const dispatch = useDispatch(); 
  const sidebar = useSelector(state => state.SidebarModal) || {};
  const { popup, type, data } = sidebar;
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


  const handleRightsidebar = (value) => {
    dispatch(setSidebarModal({
      popup: true,
      type: value,
      data: [],  
    }));
    // console.log("Type:", value);
  };
   let auth = getAuth();
    let navigate = useNavigate();
    let [showImgUpload,setShowImgUpload] = useState(false)
    let [img,setImg] = useState('')
    let [preimg,setPreimg] = useState('')
    let [imgName,setImgName] = useState()
    let [alert,setAlert] = useState([]);
    let [reload,setReload] = useState(false); 
  
  
    const storage = getStorage();
    const storageRef = ref(storage, imgName);
    const userData = useSelector((state)=>state.userLoginInfo.userInfo);
    const notification = useSelector((state)=>state.notificationSet)
    const db = getDatabase();
  
    // Notification Show
    useEffect(()=>{
      const notificationRef = connect(db,'notification/');
      onValue(notificationRef,(snapshot) => {
        if(snapshot.exists()){
          let arr = [];
          snapshot.forEach((item)=>{
            if(item.val().receiverid === auth.currentUser.uid){
              arr.push(item.val());
            }
          })
          setAlert(arr)
        }
      })
        // audio.play()
        // console.log(notification)
    
    },[])
  
  
    // Image croping
    const cropperRef = useRef(null);
    const onCrop = () => {
      const imageElement = cropperRef?.current;
      const cropper = imageElement?.cropper;
      setPreimg(cropper.getCroppedCanvas().toDataURL());
    };
  
    // Sign Out Handle Functtion
    let handleSignOut = () =>{
      signOut(auth).then(() => {
         localStorage.removeItem('userInfo')
         navigate('/signin')
      }).catch((error) => {
        console.log(error);
      });
    }
  
   
   

  return (
    
      <>
            
      <div className={`rgt_side w-full overflow-hidden bg-semi-white fixed border-l border-semi-bdr mobile:left-0 laptop:left-auto ${isMobileMenuOpen ? 'h-full' : 'h-[70px]'} laptop:h-screen laptop:p-5 duration-300`}>
          <div className='usr__info mobile:w-full laptop:w-[219px] desktop:w-[354px] p-3 relative laptop:top-[-20px] laptop:left-[-20px] bg-primary/5'>
            <div className='flex justify-between items-center'>
                  <div className='menus'>
                    <ul className='flex gap-5 items-center'>
                      <li>
                        <Link  className='flex gap-1 items-center icon_menu_a bg-white p-2 px-2 rounded' to={'/messenger'}><RiMessage3Fill /> Chat </Link>
                        {/* <Link  className='flex gap-2 items-center icon_menu_a bg-primary/10 p-2 px-2 rounded' to={'/'}><FaBookmark /> Saved </Link> */}
                      </li>
                      <li>
                        <Link  className='flex gap-1 items-center icon_menu_a bg-white p-2 px-2 rounded' to={'/'}><IoIosCreate /> Create Post </Link>
                      </li>
                    </ul>
                  </div>
                  <div className='flex gap-5 items-center'>
                  <Link to={'/user/profile'}  className='group relative overflow-hidden cursor-pointer mobile:w-8 desktop:w-[50px]  mobile:h-8 desktop:h-[50px]  rounded-full  '>
                      <picture>
                        <img  className='mobile:w-8 object-cover desktop:w-[50px]  mobile:h-8 desktop:h-[50px]  rounded-full' src={userData && userData.photoURL} alt='profile image'/>
                      </picture>
                    
                  </Link>
                  <div className='mble_menu laptop:hidden'>
                        <span onClick={()=>setIsMobileMenuOpen(!isMobileMenuOpen)}  className='flex gap-1 items-center icon_menu_a bg-white p-2 px-2 rounded'  ><IoIosMenu /> Menus </span>
                  </div>
                  </div>
            </div>
          </div>
          
          {!popup ?

                  <ul className='mobile:space-y-8 laptop:space-y-6 mobile:pl-6 mobile:pt-12 laptop:pt-0 laptop:pl-0'>
                    <li><button onClick={() => handleRightsidebar('suggest-friend')} className='font-poppin font-semibold text-sm text-semi-black  flex items-center gap-2'><FaQuestion/> Suggest Friends <span className='...'></span></button></li>
                    <li><button onClick={() => handleRightsidebar('friend-request')} className='font-poppin font-semibold text-sm text-semi-black  flex items-center gap-2'><RiNotificationBadgeFill/> Friends Request <span className='...'></span></button></li>
                    <li><button onClick={() => handleRightsidebar('your-friend')} className='font-poppin font-semibold text-sm text-semi-black  flex items-center gap-2'> <FaUserFriends/> All Friends <span className='...'></span></button></li>
                    {/* <li><button onClick={() => handleRightsidebar('suggest-group')} className='font-poppin font-semibold text-sm text-semi-black'>Suggest Group  </button></li> */}
                    <li><button onClick={() => handleRightsidebar('your-group')} className='font-poppin font-semibold text-sm text-semi-black  flex items-center gap-2'><TiGroup/> All Groups <span className='...'></span></button></li>
                    <li><button onClick={() => handleRightsidebar('create-group')} className='font-poppin font-semibold text-sm text-semi-black flex items-center gap-2'><IoCreate className='text-lg'/> Create Group</button></li>
                    <li><Link  to={'/save'} className='font-poppin font-semibold text-sm text-semi-black flex items-center gap-2'><FaBookmark/> Saved</Link></li>
                    <li><button onClick={() => handleRightsidebar('block-users')} className='font-poppin font-semibold text-sm text-semi-black  flex items-center gap-2'><ImBlocked/> Block Users <span className='...'></span></button></li>
                  </ul>
           :
          <RightsideModal />
          }
        </div>
            <>
   
         </>
    </>
 
  

    
 
  );
}
