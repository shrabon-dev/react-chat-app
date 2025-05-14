import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { RiEyeCloseFill,RiEyeFill } from 'react-icons/ri';
import { getAuth, createUserWithEmailAndPassword, updateProfile,sendEmailVerification   } from "firebase/auth";
import { Oval } from 'react-loader-spinner'
import { getDatabase, push, ref, set } from "firebase/database";

export const Registration = () => {
    const auth = getAuth();
    const navigate = useNavigate();
    const db = getDatabase();

    let [name, setName] = useState('');
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [nameerror, setNameError] = useState('');
    let [emailerror, setEmailError] = useState('');
    let [passworderror, setPasswordError] = useState('');
    let [passwordShow, setPasswordShow] = useState(false);
    let [emailChecking, setEmailChecking] = useState('');
    let [signupMessage, setSignupMessage] = useState('');
    let [allIsOk, setAllIsOk] = useState(true);


    let nameValue = (e) =>{
        e.preventDefault();
        setName(e.target.value);
        setNameError('')
    }
    let emailValue = (e) => {
        e.preventDefault();
        setEmail(e.target.value);
        setEmailError('')
        setEmailChecking('')

    }
    let passwordValue = (e) => {
        e.preventDefault();
        setPassword(e.target.value);
        setPasswordError('')
    }
    let handleSubmit = (e) =>{
        e.preventDefault();
        if(!name){
            setAllIsOk(false)
            setNameError('Please, fill the name field');
        }
        if(!email){
            setEmailError('Please, fill the email field');
        }else{
            if(!/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(email)){
            setEmailError('Please, use the valid email');
            }
        }
        if(!password){
            setPasswordError('Please, fill the password field');
        }else{
            if(!/^(?=.*[a-z])/.test(password)){
               setPasswordError('Please, use a lower case ');
            }else if(!/^(?=.*[A-Z])/.test(password)){
                setPasswordError('Please, use a upper case ');
            }else if(!/^(?=.*[0-9])/.test(password)){
                setPasswordError('Please, use a number ');
            }else if(!/^(?=.*[!@#$%^&*])/.test(password)){
                setPasswordError('Please, use a symbol ');
            }else if(!/^(?=.{8,})/.test(password)){
                setPasswordError('Please, use 8 character ');
            }
        }

   if(name && /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(email) && /^(?=.*[a-z])/.test(password) && 
   /^(?=.*[A-Z])/.test(password) && /^(?=.*[0-9])/.test(password) && /^(?=.*[!@#$%^&*])/.test(password) && /^(?=.{8,})/.test(password)){
    createUserWithEmailAndPassword(auth, email, password)
      .then((user) => {    
        updateProfile(auth.currentUser, {
            displayName: name, photoURL: "../images/demo.jpg"
          }).then(() => {
              sendEmailVerification(auth.currentUser)
            .then(() => {

                set(ref(db, 'users/' + auth.currentUser.uid ), {
                    username: name,
                    email: email,
                    profile_picture : "../images/demo.jpg"
                  });
                
            }).then(()=>{
                setSignupMessage('registration successful & sended email verify link');
                setTimeout(()=>{
                        navigate('/signin')
                },3000)
            });
          })

      }) .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if(errorCode.includes('auth/email-already-in-use')){
            setEmailChecking('Sorry, this email already use');
        }
    
        // ..
      });
     }

    }
    let handleShowPassword = () =>{
        setPasswordShow(!passwordShow)
    }

  return (
     <>
       <div className='flex justify-center items-center bg-cover bg-no-repeat bg-center h-screen w-full' style={{backgroundImage:'url(./images/auth/reg.webp)'}}>
            <div className=' bg-white/20 backdrop-blur-md border border-white flex items-center tablet:justify-end mobile:justify-center  '>
                <div className='w-[280px] tablet:w-[450px]'>
                    <div className=''>
                    <h3 className='font-nunito font-bold tablet:text-3xl text-center mobile:text-xl text-white/90 bg-black p-4'>Create a free account!</h3>
                     {/* <p className='font-nunito font-bold tablet:text-xl  mobile:text-lg text-white tablet:mt-4 mobile:mt-2'>Free register and you can enjoy it</p> */}
                     {signupMessage ? 
                      <p className='text-white bg-blue-600 py-2 px-4 font-nunito rounded mt-1'>{signupMessage}</p>
                     :''}
                    </div>
                     <div className='p-10'>
                     <form className=' '>

                          
                          <div className='relative mobile:mt-5 tablet:mt-12'>
                              <input onChange={nameValue}  className='input_css'  type={'text'} />
                              <span className='input_span_css'>Full Name</span>
                          </div>
                         {nameerror ? 
                           <p className='text-red-500 bg-red-200 py-2 px-4 font-nunito rounded mt-1'>{nameerror}</p>
                         : ''}
                            <div onChange={emailValue} className='relative mobile:mt-5 tablet: mt-6'>
                              <input  className='input_css'  type={'email'} />
                              <span className='input_span_css'>Email Address</span>
                            </div>
                          {emailerror ? 
                           <p className='text-red-500 bg-red-200 py-2 px-4 font-nunito rounded mt-1'>{emailerror}</p>
                          : ''}
                            {emailChecking ? 
                           <p className='text-red-500 bg-red-200 py-2 px-4 font-nunito rounded mt-1'>{emailChecking}</p>
                          : ''}
                          <div className='relative mobile:mt-5 tablet:mt-6'>
                              <input onChange={passwordValue} className='input_css'  type={passwordShow? 'text':'password'} />
                              <span className='input_span_css'>Password</span>
                             {passwordShow? 
                              <RiEyeFill onClick={handleShowPassword} className='text-2xl text-slate-600 absolute right-4 top-1/3 cursor-pointer'/>
                              :
                              <RiEyeCloseFill onClick={handleShowPassword} className='text-2xl text-slate-600 absolute right-4 top-1/3 cursor-pointer'/>
                              }
                          </div>
                          {passworderror ? 
                           <p className='text-red-500 bg-red-200 py-2 px-4 font-nunito rounded mt-1'>{passworderror}</p>
                          : ''}
                          {signupMessage ? '' :
                          <button onClick={handleSubmit} className='py-5 mt-12 font-nunito font-semibold text-base text-white bg-primary text-center w-full rounded-lg'> Sign up </button>
                          }
                        {signupMessage ? 
                        <div className=' w-10 text-center m-auto mt-2'>  <Oval  className='text-center m-auto '
                        height={30}
                        width={30}
                        color="#4fa94d"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                        ariaLabel='oval-loading'
                        secondaryColor="#4fa94d"
                        strokeWidth={2}
                        strokeWidthSecondary={2}
                        /> </div>
                        :'' }

                          <p className='font-nunito font-normal text-sm text-center mt-2 text-[#03014C]'>Already  have an account ? <Link to='/signin' className='text-[#EA6C00] font-bold'> Sign In </Link> </p>
                     </form>
                     </div>
                </div>
            </div>

           
       </div>
     </>
  )
}



