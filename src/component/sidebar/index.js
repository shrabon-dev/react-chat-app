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
    <div className='mobile:w-full tablet:w-[300px] tablet:h-full w-full fixed mobile:bottom-0 z-[99999] border-r border-semi-bdr mobile:bg-white py-3 tablet:py-0 tablet:bg-bg mobile:flex mobile:items-center mobile:justify-center tablet:block text-center'>

{/* profile image start */}

   <div className='logo text-center py-4 bg-primary hidden tablet:block'>
    <img className='w-32 block m-auto' src='../images/dc.png'  alt={'logo dcchat'}/>
   </div>
      {/* <h6 className='text-semi-black font-nunito text-base tablet:block mt-1 mobile:hidden'>{userData && userData.displayName}</h6> */}
{/* profile image end */}
{/* Navbar start */}
 <div className='Navbar mobile:flex justify-center items-center gap-3 tablet:block text-left tablet:pt-6 mobile:space-x-5 tablet:space-x-0 tablet:space-y-8'>
  <Link to='/' className='menu_a'>
   <div className={`${active == 'home' ? 'hoverAfterBefore':'menu'}`}>
      <AiOutlineHome className={`${active=='home'? "":""}`}/>
   </div>
     <span className='mobile:hidden tablet:inline-block'>Home</span>
   </Link>
    <Link to='/messenger' className='menu_a'>
    <div className={`${active=='messenger' ? 'hoverAfterBefore':'menu'}`}>
    <TbMessageDots className={`${active=='messenger'? " ":" "}`}/>
    </div>
     <span className='mobile:hidden tablet:inline-block'>Messanger</span>

    
    </Link>
    <Link to='/notification' className='menu_a '>
    <div className={`${active=='notification' ? 'hoverAfterBefore relative':'menu relative'}`}>
    <MdOutlineNotifications className={`${active=='notification'? " ":" "}`}/>
     <span className='text-black text-xs absolute top-2 right-2'>{alert.filter(notification => !notification.readStatus).length}</span>
    </div>
     <span className='mobile:hidden tablet:inline-block'>Notification</span>
    
    </Link>
    <Link to='/setting' className='menu_a'>
    <div className={`${active=='setting' ? 'hoverAfterBefore':'menu'}`}>
    <AiOutlineSetting  className={`${active=='setting'? " ":"tex "}`}/>
    </div>
     <span className='mobile:hidden tablet:inline-block'>Settings</span>
    
    </Link>
    <Link  onClick={handleSignOut} className='menu_a'>
      <div className={`${active=='setting' ? 'hoverAfterBefore':'menu'}`}>
      <BiLogOut className=''/>
      </div>
     <span className='mobile:hidden tablet:inline-block'>Logout</span>
    </Link>
    
 </div>
{/* Navbar end */}
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

  )
}
