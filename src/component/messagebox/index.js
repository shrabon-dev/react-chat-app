import React, { useEffect, useState } from 'react'
import {BiDotsVertical} from 'react-icons/bi'
import {HiOutlineEmojiHappy} from 'react-icons/hi'
import {AiOutlineCamera} from 'react-icons/ai'
import {FiSend} from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { activechat } from '../../slice/activeChatSlice'
import { isFulfilled } from '@reduxjs/toolkit'
import { getAuth } from "firebase/auth";
import { getDatabase, ref, onValue, set, push} from "firebase/database";
import { getStorage, ref as storeRef, uploadBytesResumable, getDownloadURL,uploadBytes} from "firebase/storage";
import moment from 'moment/moment';
import EmojiPicker from 'emoji-picker-react';
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';
import ScrollToBottom from 'react-scroll-to-bottom';
import { IoReturnDownBack } from "react-icons/io5";
import { setMobileMessagesList } from '../../slice/mobileMessagesListSlice'


export default function MessageBox() {
  let db = getDatabase();
  let auth = getAuth();
  let dispatch = useDispatch();
  const storage = getStorage();

  const modeStatus = useSelector((state)=>state.darkmode.value)
  const mobileMessagesList = useSelector((state)=>state.mobileMessagesList.value)
  let data = useSelector((state)=> state.activechat.value)
  let [message,setMessage] = useState('');
  let [messagelist,setMessagelist] = useState([])
  let [groupMessagelist,setGroupMessagelist] = useState([])
  let [groupUserHaveorNot,setGroupUserHaveorNot] = useState([])
  let [imagePopUp,setImagePopUp] = useState();
  let [emojiPopUp,setEmojiPopUp] = useState();
  let [image,setImage] = useState('');
  let [errorImage,setErrorImage] = useState('');
  let [audio,setAudio] = useState();
  let [audioMessage,setAudioMessage] = useState();

  const recorderControls = useAudioRecorder();
  const addAudioElement = (blob) => {
    const url = URL.createObjectURL(blob);
    console.log(blob)
    setAudioMessage(blob)
    setAudio(url);

  };

  // audio message send start
  let handleAudioMessageSent = ()=>{
  uploadBytes(storeRef(storage, 'audioMessages'), audioMessage).then((snapshot) => {
    getDownloadURL(storeRef(storage, 'audioMessages')).then((downloadURL) => {
      console.log('File available at', downloadURL);
      if(data.status == 'group'){
        set(push(ref(db,'groupMessages')),{
          who_send_id:auth.currentUser.uid,
          who_send_name:auth.currentUser.displayName,
          whom_send_id:data.id,
          whom_send_name:data.name,
          audio_msg:downloadURL,
          date:`${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`,

        }).then(()=>{
          setAudio(!audio)
        })
     }else{
 
      set(push(ref(db,'singleMessages')),{
        who_send_id:auth.currentUser.uid,
        who_send_name:auth.currentUser.displayName,
        whom_send_id:data.id,
        whom_send_name:data.name,
        audio_msg:downloadURL,
        date:`${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`,
        }).then(()=>{
          setAudio(!audio)
        })
     }
    });
  });
  }
  // audio message send End

  let messagewrite =(e)=>{
        e.preventDefault();
       setMessage(e.target.value)
  }


    let handleMessageSent = (e) =>{
         e.preventDefault();
        if(data.status == 'group'){

          set(push(ref(db,'groupMessages')),{
            who_send_id:auth.currentUser.uid,
            who_send_name:auth.currentUser.displayName,
            whom_send_id:data.id,
            whom_send_name:data.name,
            msg:message,
            date:`${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`,

           }).then(()=>{
            if(emojiPopUp){
              setEmojiPopUp(!emojiPopUp)
            }
            setMessage('')
          })

        }else if (data.status == 'single'){

          set(push(ref(db,'singleMessages')),{
               who_send_id:auth.currentUser.uid,
               who_send_name:auth.currentUser.displayName,
               whom_send_id:data.id,
               whom_send_name:data.name,
               msg:message,
               date:`${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`,
          }).then(()=>{
            if(emojiPopUp){
              setEmojiPopUp(!emojiPopUp)
            }
            setMessage('')

          })
        }
    }

    useEffect(()=>{
      onValue(ref(db, 'groups/' ), (snapshot) => {
         
             let arr = []
  
            snapshot.forEach((item)=>{       
                arr.push(item.val().group_id + item.val().user_id)
                // console.log(  item.val().group_id+ '--------------' +item.val().user_id)
            });
  
          setGroupUserHaveorNot(arr)
      });
  
      
    },[data?.id])

    useEffect(()=>{
   
        const messageRef = ref(db, 'singleMessages/');
        onValue(messageRef, (snapshot) => {
       
          let arr = []
          snapshot.forEach((item) => {
                if(item.val().who_send_id == auth.currentUser.uid && data.id == item.val().whom_send_id ||
                item.val().whom_send_id == auth.currentUser.uid && data.id == item.val().who_send_id ){
                  arr.push({...item.val(),id:item.key})
                }

          });
          setMessagelist(arr)
          
        });
              
    },[data?.id])

    useEffect(()=>{
   
      const messageRef = ref(db, 'groupMessages/');
      onValue(messageRef, (snapshot) => {
     
        let arr = []
        snapshot.forEach((item) => {
              if(data.id == item.val().whom_send_id){
                arr.push({...item.val(),id:item.key})
              }
                // arr.push({...item.val(),id:item.key})  

        });
        setGroupMessagelist(arr)
        
      });
            
    },[data?.id])

let handleMessageSelect = (e) =>{
  setImage(e.target.files[0])
  setErrorImage('')
}

let handleImageUpload = (e) =>{
    if(image){


const storageRef = storeRef(storage, 'SingleMessageImages/'+image.name);

const uploadTask = uploadBytesResumable(storageRef,image);

uploadTask.on('state_changed', 
  (snapshot) => {

    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
    
  }, 
  () => {

    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      console.log('File available at', downloadURL);

         if(data.status == 'group'){
            set(push(ref(db,'groupMessages')),{
              who_send_id:auth.currentUser.uid,
              who_send_name:auth.currentUser.displayName,
              whom_send_id:data.id,
              whom_send_name:data.name,
              img_msg:downloadURL,
              date:`${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`,

            })
         }else{
     
          set(push(ref(db,'singleMessages')),{
            who_send_id:auth.currentUser.uid,
            who_send_name:auth.currentUser.displayName,
            whom_send_id:data.id,
            whom_send_name:data.name,
            img_msg:downloadURL,
            date:`${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`,
            })
         }

    });
  }
);

   setTimeout(()=>{
    setImagePopUp(false)
   },1000)

    }else{
      setErrorImage(" You cann't upload empty file")
    }

  }
  const handleBackRecentMessageList = () =>{
    dispatch(setMobileMessagesList(!mobileMessagesList))
  }

  return (
     
        <>
          <div className={`${modeStatus ? 'tablet:h-[90vh] desktop:h-[98vh] mobile:h-[100%] bg-[#323949]  border-[#3d3e51] shadow-xl ':' tablet:h-[100vh] desktop:h-[98vh]  mobile:h-[100%] bg-white shadow-xl border-blue-300 '}`}>
           {  data ? 
            <div className='msg_container h-full'>
              {/* PROFILE */}
              <div className='bg-primary py-2 px-4'>           
                  <div className='flex justify-between items-center  border-[#00000041] last:border-0'>   
                      <div className='flex items-center gap-x-4'>
                          <div>
                              <img className='w-11 h-11 rounded-full' src='../images/group/grp3.webp' />
                          </div>
                          <div className='ml-2'>
                              <h4 className={`bold_text text-sm text-gray-200`}>{data ? data.name : 'demo' }</h4>
                              <p className={` text-sm text-gray-200`}>Online</p>
                          </div>
                          <div>
                          <p className=' text-xs text-gray-200'>1 minute ago</p> 
                        </div>
                      </div>

                      <div>
                          <p  className=' text-xl text-gray-200'><BiDotsVertical/></p> 
                      </div>
                      <div onClick={handleBackRecentMessageList} className='tablet:hidden'>
                          <p  className='text-xl bg-white text-primary rounded p-1 shadow-lg'><IoReturnDownBack/></p> 
                      </div>
                  </div>
              </div>
              {/* PROFILE */}
              {/* *************************************************** */}
              {/* message start */}
              <div className='py-5 px-3'>
              <ScrollToBottom  className='message_show_box tablet:h-[72vh] mobile:h-[54vh] mb-0 mobile:mb-20 custom-scrollbar'>
          
          {data.status == 'group' ? 
          
          (
            groupMessagelist.map((item)=>(

              
              
              ((item.who_send_id == auth.currentUser.uid && data.id == item.whom_send_id) ||
                (groupUserHaveorNot.includes(item.whom_send_id + auth.currentUser.uid) && data.id == item.whom_send_id) ||
                (groupUserHaveorNot.includes(auth.currentUser.uid + item.whom_send_id) && data.id == item.whom_send_id)) && 
                  
                item.msg ? (
                  auth.currentUser.uid == item.who_send_id ? ( 

                  <div className='flex justify-end mt-4'>
                  <div>
                    <p className={`${modeStatus ? 'current_dark_msg':'current_light_msg'}`}>{item.msg}</p>
                    <p className='text-xs font-nunito text-gray-500 font-normal mt-1 text-right'>{moment(item.date, "YYYYMMDD hh:mm").fromNow()}</p>
                  </div>
                  </div>
                  )
              : (
                  <div className='mt-4'>
                  <p className={`${modeStatus ? 'dark_msg_tex':'light_msg_tex'}`}>{ item.msg}</p>
                  <p className='text-xs font-nunito text-gray-500 font-normal mt-1'>{moment(item.date, "YYYYMMDD hh:mm").fromNow()}</p>
                  </div>
                  )
                
                ) : (

                  item.audio_msg ? (       
                    auth.currentUser.uid == item.who_send_id ? 
                    <div className='flex justify-end mt-4'>
                      <div>
                    <audio controls src={item.audio_msg} type="audio/ogg"></audio> 
                      <p className='text-xs font-nunito text-gray-500 font-normal mt-1 text-right'>{moment(item.date, "YYYYMMDD hh:mm").fromNow()}</p>
                    </div>
                    </div>
              
                : 
            
                  <div className='mt-4'>
                    <audio controls src={item.audio_msg} type="audio/ogg"></audio> 
                    <p className='text-xs font-nunito text-gray-500 font-normal mt-1'>{moment(item.date, "YYYYMMDD hh:mm").fromNow()}</p>
                  </div>
                  )
                  : 
                  (
                    auth.currentUser.uid == item.who_send_id ? 
                    <div className='flex justify-end mt-4'>
                    <div>
      
                    <img className='max-w-xs' src={item.img_msg} />
                      <p className='text-xs font-nunito text-gray-500 font-normal mt-1 text-right'>{moment(item.date, "YYYYMMDD hh:mm").fromNow()}</p>
                    </div>
                    </div>
              
                : 
            
                <div className='mt-4'>
                    <img className='max-w-xs'  src={item.img_msg} />
                    <p className='text-xs font-nunito text-gray-500 font-normal mt-1'>{moment(item.date, "YYYYMMDD hh:mm").fromNow()}</p>
                    </div>
                  )
                )
          ))
            )
          
          : 
          
          (
            messagelist.map((item)=>(
              
              item.msg ? (
                auth.currentUser.uid == item.who_send_id ? 

                <div className='flex justify-end mt-4'>
                <div>
                  <p className={`${modeStatus ? 'current_dark_msg':'current_light_msg'}`}>{item.msg}</p>
                  <p className='text-xs font-nunito text-gray-500 font-normal mt-1 text-right'>{moment(item.date, "YYYYMMDD hh:mm").fromNow()}</p>
                </div>
                </div>
            : 
                <div className='mt-4'>
                <p className={`${modeStatus ? 'dark_msg_tex':'light_msg_tex'}`}>{item.msg}</p>
                <p className='text-xs font-nunito text-gray-500 font-normal mt-1'>{moment(item.date, "YYYYMMDD hh:mm").fromNow()}</p>
                </div>
              ) : (

                item.audio_msg ? 
                (
                  auth.currentUser.uid == item.who_send_id ? 

                  <div className='flex justify-end mt-4'>
                  <div>

                  <audio  controls src={item.audio_msg} type="audio/ogg"></audio> 
                    <p className='text-xs font-nunito text-gray-500 font-normal mt-1 text-right'>{moment(item.date, "YYYYMMDD hh:mm").fromNow()}</p>
                  </div>
                  </div>
              : 
                  <div className='mt-4'>
                  <audio  controls src={item.audio_msg} type="audio/ogg"></audio> 
                  <p className='text-xs font-nunito text-gray-500 font-normal mt-1'>{moment(item.date, "YYYYMMDD hh:mm").fromNow()}</p>
                  </div>
                )
                : 
                (
                  auth.currentUser.uid == item.who_send_id ? 

                  <div className='flex justify-end mt-4'>
                  <div>
                    <img className='max-w-xs'  src={item.img_msg} />
                    <p className='text-xs font-nunito text-gray-500 font-normal mt-1 text-right'>{moment(item.date, "YYYYMMDD hh:mm").fromNow()}</p>
                  </div>
                  </div>
              : 
                  <div className='mt-4'>
                  <img className='max-w-xs' src={item.img_msg} />
                  <p className='text-xs font-nunito text-gray-500 font-normal mt-1'>{moment(item.date, "YYYYMMDD hh:mm").fromNow()}</p>
                  </div>
                )


              )

            ))
          )
          }

              </ScrollToBottom>
              </div>

              <div className='mobile:absolute mobile:bottom-0 mobile:w-full'>
              <div className='message_send_option bg-primary laptop:bg-transparent py-1 laptop:py-0 flex tablet:gap-4 mobile:gap-1 px-2 relative mobile:bottom-0 laptop:bottom-1 desktop:bottom-[3rem] laptop:left-10 z-[999] '>
                        <div className='w-[65%] laptop:w-[56%] desktop:w-[70%]'><input  value={message} onChange={messagewrite} className={`${modeStatus ? 'dark_msg_input !bg-white laptop:!bg-semi-white ':'light_msg_input !bg-white laptop:!bg-semi-white '}`}/></div>
                        
                        <div className='w-[42%] laptop:w-[34%] desktop:w-[20%] flex justify-end tablet:gap-2 mobile:gap-1 desktop:gap-5 items-center relative'> 
                        {emojiPopUp && 
                        <span className='tablet:p-3 mobile:p-1 text-lg absolute  w-1/4 bottom-11 right-[20rem]'> 
                        <EmojiPicker onEmojiClick={(e)=>setMessage(message + e.emoji)} />
                        </span> 
                        }
                        <span className='tablet:p-3 mobile:p-1 text-lg  text-white laptop:text-semi-black'> 
                        <HiOutlineEmojiHappy onClick={()=>setEmojiPopUp(!emojiPopUp)} className='cursor-pointer'/> 
                        </span> 
                        <div className='relative bottom-0'>
                          {audio && 
                          <div >
                            <audio className='absolute left-0 bottom-14' controls src={audio} type="audio/ogg"></audio> 
                          </div>
                          
                          }
                          <div className='relative '>
                          <AudioRecorder
                            onRecordingComplete={(blob) => addAudioElement(blob)}
                            recorderControls={recorderControls}
                          />
                          </div>
                
                        </div>
                        <span onClick={()=>setImagePopUp(!imagePopUp)} className='tablet:p-3 mobile:p-1 text-white laptop:text-semi-black text-lg cursor-pointer'><AiOutlineCamera/></span>
                        {audio ?
                        <span onClick={handleAudioMessageSent} className=' bg-white tablet:bg-primary text-primary laptop:text-white tablet:p-3 mobile:p-1 rounded-lg text-lg cursor-pointer'><FiSend/></span>
                        : 
                        <span onClick={handleMessageSent} className='bg-white laptop:bg-primary text-primary laptop:text-white tablet:p-3 mobile:p-1 rounded-lg text-lg cursor-pointer'><FiSend/></span>
                    
                        }
                        </div>
                </div>
              </div>
                {/* message End */}
            </div>
           :
          //  Waiting For Message Select
           <>
           <div className='waiting_msg h-full flex flex-col items-center justify-center'>
            <img src='../images/waiting_bird.gif' className='w-96 h-96 rounded-full block object-cover' alt='waiting msg img'/>
            <h3 className='font-poppin text-sm laptop:text-lg italic font-medium w-1/2 mx-auto pt-10 text-center'>🎯 Don't just stare at the screen – pick a friend and let the nonsense flow! You know you want to. 😉</h3>
           </div>
           </>
           }
             
          </div>

          {/* image upoload popup start */}
              {imagePopUp &&
                  <div className='w-96 h-60 p-4 rounded-md absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[999] bg-primary'>
                      <h4 className='text-white font-nunito font-medium text-2xl'>Select Image</h4>
                      <input onChange={handleMessageSelect} className='text-white my-4 outline-none'  type="file"  />
                      
                      {errorImage && 
                        <p  className='bg-red p-2 text-white font-nunito rounded-lg bg-red-500 cursor-pointer'>{errorImage}</p>
                      
                      }
                    <div className='mt-8'>
                        <span onClick={handleImageUpload} className='bg-red p-2 text-white font-nunito rounded-lg bg-lime-500 cursor-pointer mr-6'>Upload</span>
                        <span onClick={()=>setImagePopUp(!imagePopUp)} className='bg-red p-2 text-white font-nunito rounded-lg bg-red-500 cursor-pointer'>Cencel</span>
                    </div>
                  </div>
              }
          {/* image upoload popup end */}

        </>
        

       
       
  )
}
