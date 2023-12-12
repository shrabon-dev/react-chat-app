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


export default function MessageBox() {
  let db = getDatabase();
  let auth = getAuth();
  const storage = getStorage();

  const modeStatus = useSelector((state)=>state.darkmode.value)
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
  
      
    },[data.id])

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
              
    },[data.id])

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
            
  },[data.id])

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
    // Handle unsuccessful uploads
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

  return (
        <>
            <div className={`${modeStatus ? 'p-5 tablet:h-[97vh] mobile:h-[100%] bg-[#323949]  border-[#3d3e51] shadow-xl  mt-4 border-l-2':'p-5 tablet:h-[97vh] mobile:h-[100%] bg-white shadow-xl  mt-4 border-l-2 border-blue-300 '}`}>
            {/* PROFILE */}
            <div >           
                <div className='flex justify-between items-center mt-5 border-b pb-3 border-[#00000041] last:border-0'>   
                    <div className='flex items-center gap-x-4'>
                        <div>
                            <img className='w-11 h-11 rounded-full' src='../images/group/grp3.webp' />
                        </div>
                        <div className='ml-3'>
                            <h4 className={`${modeStatus ? 'bold_text text-sm text-gray-200':'bold_text text-sm'}`}>{data ? data.name : 'demo' }</h4>
                            <p className={`${modeStatus ? 'p_text text-xs text-gray-200':'p_text text-xs'}`}>Online</p>
                        </div>
                        <div>
                        <p className='text-xs text-gray-600'>1 minute ago</p> 
                       </div>
                    </div>

                    <div>
                        <p ><BiDotsVertical/></p> 
                    </div>
                </div>
            </div>
            {/* PROFILE */}
    {/* *************************************************** */}
          {/* message start */}
  
        <ScrollToBottom  className='message_show_box tablet:h-[72vh] mobile:h-[60vh] mb-0 mobile:mb-20 custom-scrollbar'>
       
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
   
         <div>
         <div className='message_send_option flex tablet:gap-4 mobile:gap-1 relative mobile:bottom-16'>
                  <div className='w-3/4'><input  value={message} onChange={messagewrite} className={`${modeStatus ? 'dark_msg_input':'light_msg_input'}`}/></div>
                  
                  <div className='w-1/4 flex tablet:gap-4 mobile:gap-1 items-center'> 
                  {emojiPopUp && 
                  <span className='tablet:p-3 mobile:p-1 text-lg absolute  w-1/4 bottom-11 right-52'> 
                  <EmojiPicker onEmojiClick={(e)=>setMessage(message + e.emoji)} />
                  </span> 
                  }
                  <span className='tablet:p-3 mobile:p-1 text-lg '> 
                  <HiOutlineEmojiHappy onClick={()=>setEmojiPopUp(!emojiPopUp)} className='cursor-pointer'/> 
                  </span> 
                  <div className=''>
                    {audio && 
                    <div>
                      <audio className='absolute left-0 bottom-14' controls src={audio} type="audio/ogg"></audio> 
                    </div>
                    
                    }
                    
                    <AudioRecorder
                      onRecordingComplete={(blob) => addAudioElement(blob)}
                      recorderControls={recorderControls}
                    />
           
                  </div>
                  <span onClick={()=>setImagePopUp(!imagePopUp)} className='tablet:p-3 mobile:p-1 text-lg cursor-pointer'><AiOutlineCamera/></span>
                  {audio ?
                  <span onClick={handleAudioMessageSent} className='bg-primary text-white tablet:p-3 mobile:p-1 rounded-lg text-lg cursor-pointer'><FiSend/></span>
                  : 
                  <span onClick={handleMessageSent} className='bg-primary text-white tablet:p-3 mobile:p-1 rounded-lg text-lg cursor-pointer'><FiSend/></span>
              
                    }
                  </div>
          </div>
         </div>
          {/* message End */}
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
