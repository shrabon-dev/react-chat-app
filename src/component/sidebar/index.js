import React, { useState, useRef, useEffect  } from 'react'
import {AiOutlineHome,AiOutlineSetting} from 'react-icons/ai'
import {TbMessageDots} from 'react-icons/tb'
import {MdOutlineNotifications} from 'react-icons/md'
import {BsFillCloudUploadFill} from 'react-icons/bs'
import {BiLogOut} from 'react-icons/bi'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth,signOut, updateProfile  } from 'firebase/auth'
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { getStorage,ref,uploadString, getDownloadURL  } from "firebase/storage";
import { useSelector } from 'react-redux';
import { getDatabase, ref as connect, onValue } from 'firebase/database';
import notifySound from '../../assets/audio/notify.wav'



export const Sidebar = ({active}) => {

  let auth = getAuth();
  let navigate = useNavigate();
  let [showImgUpload,setShowImgUpload] = useState(false)
  let [img,setImg] = useState('')
  let [preimg,setPreimg] = useState('')
  let [imgName,setImgName] = useState()
  let [alert,setAlert] = useState([]);
  let [reload,setReload] = useState(false);
  let [audio] = useState(new Audio(notifySound))


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
    <div className='w-full h-full bg-primary tablet:p-2 tablet:py-5 large_tablet:p-0 large_tablet:pt-6  mobile:flex mobile:items-center mobile:justify-center tablet:block text-center'>

{/* profile image start */}
  <div  className='group relative overflow-hidden cursor-pointer mobile:w-12 tablet:w-[80px] large_tablet:w-[100px] mobile:h-12 tablet:h-[80px] large_tablet:h-[100px] rounded-full mobile:m-2 mobile:mr-10  tablet:m-auto'>
    <picture>
       <img  className='mobile:w-12 tablet:w-[80px] large_tablet:w-[100px] mobile:h-12 tablet:h-[80px] large_tablet:h-[100px] rounded-full' src={userData && userData.photoURL} alt='profile image'/>
    </picture>
    <div onClick={showPopupImgUpload} className='group-hover:top-0 duration-300 w-full h-full bg-black/70 rounded-full flex justify-center items-center text-white text-3xl absolute -top-28'>
         {/* <input onChange={(e)=>setProfileImage(e.target.files[0].name)} type={'file'}  /> <BsFillCloudUploadFill /> */}
         <BsFillCloudUploadFill />
    </div>
  </div>
      <h6 className='text-white font-nunito text-base tablet:block mt-1 mobile:hidden'>{userData && userData.displayName}</h6>
{/* profile image end */}
{/* Navbar start */}
 <div className='Navbar tablet:pt-6 flex tablet:flex-col items-center mobile:space-x-5 tablet:space-x-0 tablet:space-y-2'>
  <Link to='/'>
   <div className={`${active == 'home' ? 'hoverAfterBefore':'menu'}`}>
    {/* <div className='po'> */}
      <AiOutlineHome className={`${active=='home'? "text-primary mobile:text-lg tablet:text-4xl inline-block":"text-white mobile:text-lg tablet:text-4xl inline-block"}`}/>
      {/* </div> */}
   </div>
   </Link>
    <Link to='/messenger'>
    <div className={`${active=='messenger' ? 'hoverAfterBefore':'menu'}`}>
    <TbMessageDots className={`${active=='messenger'? "text-primary mobile:text-lg tablet:text-4xl inline-block":"text-white mobile:text-lg tablet:text-4xl inline-block"}`}/>
    </div>
    </Link>
    <Link to='/notification'>
    <div className={`${active=='notification' ? 'hoverAfterBefore':'menu'}`}>
    <MdOutlineNotifications className={`${active=='notification'? "text-primary mobile:text-lg tablet:text-4xl inline-block":"text-white mobile:text-lg tablet:text-4xl inline-block"}`}/>
     <span className='text-yellow-400 text-lg bg-slate-600 w-5 h-5 rounded-full inline-flex items-center justify-center'>{alert.filter(notification => !notification.readStatus).length}</span>
    </div>
    </Link>
    <Link to='/setting'>
    <div className={`${active=='setting' ? 'hoverAfterBefore':'menu'}`}>
    <AiOutlineSetting  className={`${active=='setting'? "text-primary mobile:text-lg tablet:text-4xl inline-block":"text-white mobile:text-lg tablet:text-4xl inline-block"}`}/>
    </div>
    </Link>

    <div className='tablet:text-center tablet:!mt-10 mobile:mr-2 tablet:mr-0'>
    <BiLogOut onClick={handleSignOut} className='text-white  mobile:text-lg tablet:text-4xl inline-block cursor-pointer'/>
    </div>
 </div>
{/* Navbar end */}
</div>
    <>
    { showImgUpload ? 
      <>
        {/* image upload modal start */}
            <div className='w-[600px] h-[550px] z-50 bg-primary absolute top-0 -left-full translate-x-full p-10 rounded-lg shadow-2xl ease-in duration-300'>
              <p className='text-white font-nunito text-2xl '>Profile Upload</p>
                  {preimg && 
                       <img src={preimg} className='w-24 h-24 block rounded-full' />
                   }
              <input onChange={profileImgLinkGet} className='bg-white p-2 rounded-lg cursor-pointer mt-10' type={'file'} />
              <div className='mt-4'>
                <button onClick={handleProfileUpload} className='font-nunito font-normal text-white p-2  rounded-lg text-lg bg-emerald-500 border-none inline-block' >Upload</button>
                <button onClick={()=>setShowImgUpload(!showImgUpload)} className='font-nunito font-normal text-white p-2 m-2 rounded-lg text-lg bg-red-700 border-none inline-block' >Cancel</button>
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

  )
}
