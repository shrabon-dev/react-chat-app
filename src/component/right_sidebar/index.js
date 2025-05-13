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
import { BsFillCloudUploadFill } from 'react-icons/bs';
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



export default function RightSideBar() {
  const dispatch = useDispatch(); 
const sidebar = useSelector(state => state.SidebarModal) || {};
const { popup, type, data } = sidebar;


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
  
    let profileImgLinkGet = (e) =>{
      setImgName(e.target.files[0].name)
  
      let files;
      if(e.dataTransfer){
          files = e.dataTransfer.files;
      }else if (e.target){
        files = e.target.files
      }
       const reader = new FileReader();
       reader.onload = () =>{
        setImg(reader.result);
       }
       reader.readAsDataURL(files[0])
    }
  
    // Image Upload Popup Handle Functtion
    let showPopupImgUpload = () => {
      setShowImgUpload(!showImgUpload);
      setImg('')
      setPreimg('')
    }
  
    // Profile Image Upload Handle Functtion
    let handleProfileUpload = (e) => {
      e.preventDefault();
      uploadString(storageRef, preimg, 'data_url').then((snapshot) => {
        getDownloadURL(storageRef).then((downloadURL) => {
          updateProfile(auth.currentUser, {
            photoURL: downloadURL
          }).then(() => {
            // Update localStorage
            let updatedUserInfo = { ...userData, photoURL: downloadURL };
            localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));
    
  
             setShowImgUpload(!showImgUpload);
             setImg('')
             setPreimg('')
             setReload(!reload)
          }).catch((error) => {
            console.log(error)
          });
        });
      });
    }
   

  return (
    
      <>
            
        <div className='rgt_side w-full  h-screen bg-semi-white p-5 fixed border-l border-semi-bdr'>
          <div className='usr__info w-[354px] p-3 relative top-[-20px] left-[-20px] bg-primary'>
            <div className='flex justify-between items-center'>
                  <div className='menus'>
                    <ul className='flex gap-5 items-center'>
                      <li>
                        <Link  className='flex gap-1 items-center icon_menu_a bg-white p-2 px-2 rounded' to={'/'}><RiMessage3Fill /> Chat </Link>
                        {/* <Link  className='flex gap-2 items-center icon_menu_a bg-primary/10 p-2 px-2 rounded' to={'/'}><FaBookmark /> Saved </Link> */}
                      </li>
                      <li>
                        <Link  className='flex gap-1 items-center icon_menu_a bg-white p-2 px-2 rounded' to={'/'}><IoIosCreate /> Create Post </Link>
                      </li>
                    </ul>
                  </div>
                  <div  className='group relative overflow-hidden cursor-pointer mobile:w-12 tablet:w-[80px] large_tablet:w-12 mobile:h-12 tablet:h-[80px] large_tablet:h-12 rounded-full  '>
                      <picture>
                        <img  className='mobile:w-12 object-cover tablet:w-[80px] large_tablet:w-16 mobile:h-12 tablet:h-[80px] large_tablet:h-16 rounded-full' src={userData && userData.photoURL} alt='profile image'/>
                      </picture>
                      <div onClick={showPopupImgUpload} className='group-hover:top-0 duration-300 w-full h-full bg-black/70 rounded-full flex justify-center items-center text-semi-black text-3xl absolute -top-28'>
                          {/* <input onChange={(e)=>setProfileImage(e.target.files[0].name)} type={'file'}  /> <BsFillCloudUploadFill /> */}
                          <BsFillCloudUploadFill />
                      </div>
                  </div>
            </div>
          </div>
          
          {!popup ?

                  <ul className='space-y-6'>
                    <li><button onClick={() => handleRightsidebar('suggest-friend')} className='font-poppin font-semibold text-sm text-semi-black  flex items-center gap-2'><FaQuestion/> Suggest Friends <span className='...'></span></button></li>
                    <li><button onClick={() => handleRightsidebar('friend-request')} className='font-poppin font-semibold text-sm text-semi-black  flex items-center gap-2'><RiNotificationBadgeFill/> Friends Request <span className='...'></span></button></li>
                    <li><button onClick={() => handleRightsidebar('your-friend')} className='font-poppin font-semibold text-sm text-semi-black  flex items-center gap-2'> <FaUserFriends/> All Friends <span className='...'></span></button></li>
                    {/* <li><button onClick={() => handleRightsidebar('suggest-group')} className='font-poppin font-semibold text-sm text-semi-black'>Suggest Group <span className='...'>90</span></button></li> */}
                    <li><button onClick={() => handleRightsidebar('your-group')} className='font-poppin font-semibold text-sm text-semi-black  flex items-center gap-2'><TiGroup/> All Groups <span className='...'></span></button></li>
                    <li><button onClick={() => handleRightsidebar('create-group')} className='font-poppin font-semibold text-sm text-semi-black flex items-center gap-2'><IoCreate className='text-lg'/> Create Group</button></li>
                    <li><button onClick={() => handleRightsidebar('create-group')} className='font-poppin font-semibold text-sm text-semi-black flex items-center gap-2'><FaBookmark/> Saved</button></li>
                    <li><button onClick={() => handleRightsidebar('block-users')} className='font-poppin font-semibold text-sm text-semi-black  flex items-center gap-2'><ImBlocked/> Block Users <span className='...'></span></button></li>
                  </ul>
           :
          <RightsideModal />
          }
        </div>
            <>
    { showImgUpload ? 
      <>
        {/* image upload modal start */}
            <div className='w-[600px] h-[550px] z-50 bg-primary absolute top-0 -left-full translate-x-full p-10 rounded-lg shadow-2xl ease-in duration-300'>
              <p className='text-semi-black font-nunito text-2xl '>Profile Upload</p>
                  {preimg && 
                       <img src={preimg} className='w-24 h-24 block rounded-full' />
                   }
              <input onChange={profileImgLinkGet} className='bg-white p-2 rounded-lg cursor-pointer mt-10' type={'file'} />
              <div className='mt-4'>
                <button onClick={handleProfileUpload} className='font-nunito font-normal text-semi-black p-2  rounded-lg text-lg bg-emerald-500 border-none inline-block' >Upload</button>
                <button onClick={()=>setShowImgUpload(!showImgUpload)} className='font-nunito font-normal text-semi-black p-2 m-2 rounded-lg text-lg bg-red-700 border-none inline-block' >Cancel</button>
              </div>
              <Cropper
              src={img}
              style={{ height: 200, width: "100%" }}
              // Cropper.js options
              initialAspectRatio={16 / 9}
              guides={false}
              crop={onCrop}
              ref={cropperRef}
            />
            </div>
        {/* image upload modal end */}
      </>
      : ''
      }
         </>
    </>
 
  

    
 
  );
}
