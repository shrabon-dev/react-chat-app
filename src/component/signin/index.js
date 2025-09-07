import React, { useState } from 'react'
import { json, Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { RiEyeCloseFill,RiEyeFill } from 'react-icons/ri';
import { getAuth, signInWithEmailAndPassword,sendPasswordResetEmail  } from "firebase/auth";
import { Oval } from 'react-loader-spinner';
import { useNavigate } from "react-router-dom";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { userLoginInfo } from '../../slice/userSlice';
import { MdOutlineMailLock } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";

const Signin = () => {
    const auth = getAuth();
    const navigate = useNavigate();
    const provider = new GoogleAuthProvider();
    const dispatch = useDispatch();
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [emailerror, setEmailError] = useState('');
    let [passworderror, setPasswordError] = useState('');
    let [passwordShow, setPasswordShow] = useState(false);
    let [signinError, setSigninError] = useState('');
    let [showModal,setShowModal] = useState(false)
    let [forgetEmail,setForgetEmail] = useState('')
    let [errorFEmail,seteErrorFEmaill] = useState('')
    let [messageFEmail,setMessageFEmail] = useState('')

    let emailValue = (e) => {
        e.preventDefault();
        setEmail(e.target.value);
        setEmailError('')
    }
    let passwordValue = (e) => {
        e.preventDefault();
        setPassword(e.target.value);
        setPasswordError('')
    }
    let handleSubmit = (e) =>{
        e.preventDefault();

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

            signInWithEmailAndPassword(auth, email, password)
            .then((user) => {
                dispatch(userLoginInfo(user.user))
                localStorage.setItem('userInfo',JSON.stringify(user.user))
                if(auth.currentUser.emailVerified){
                   navigate('/')
                }else{
                    setSigninError('Please, verify your email')
                }
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                if(errorCode.includes('auth/invalid-email')){
                    setSigninError('Please, use the valid email')
                }
                if(errorCode.includes('auth/wrong-password')){
                    setSigninError('Sorry, password is wrong')
                }
                if(errorCode.includes('auth/user-not-found')){
                    setSigninError('Sorry, user not found')
                }
            });
    }
    let handleShowPassword = () =>{
        setPasswordShow(!passwordShow)
    }

    let HandleResetPassword = () => {
        setShowModal(true)
    }

    let ForgetPassword = (e) =>{
        e.preventDefault();
        setForgetEmail(e.target.value);
        seteErrorFEmaill('')
        setMessageFEmail('')
    }

    let SubmiForgetEmail = () =>{
        sendPasswordResetEmail(auth, forgetEmail)
        .then(() => {
            setMessageFEmail('Reset password link submited')
            setTimeout(()=>{
            navigate('/signin')
            setMessageFEmail('')
            setShowModal(false)
           },2000)
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            if(errorCode.includes('auth/missing-email')){
                seteErrorFEmaill('Please, give a email')
            }
            if(errorCode.includes('auth/invalid-email')){
                seteErrorFEmaill('Please, give a valid email')
            }
            if(errorCode.includes('auth/user-not-found')){
                seteErrorFEmaill('Sorry, user not found')
            }
        });
        }
    let CancelModel = () =>{
            setShowModal(false)
        }

    let HandleLoginWithGoogle = () =>{
            auth.languageCode = 'it';
            provider.setCustomParameters({
                'login_hint': 'user@example.com'
              });
            signInWithPopup(auth, provider)
            .then((result) => {
              // This gives you a Google Access Token. You can use it to access the Google API.
              const credential = GoogleAuthProvider.credentialFromResult(result);
              const token = credential.accessToken;
              // The signed-in user info.
              const user = result.user;
              navigate('/')
             
            }).catch((error) => {
              // Handle Errors here.
              const errorCode = error.code;
              const errorMessage = error.message;
              // The email of the user's account used.
              const email = error.customData.email;
              // The AuthCredential type that was used.
              const credential = GoogleAuthProvider.credentialFromError(error);
              // ...
            });
        }

  return (
     <>
        {/* <div className='flex justify-center items-center bg-cover bg-no-repeat bg-center h-screen' style={{backgroundImage:'url(./images/auth/log.webp)'}}> */}
        <div className='flex justify-center items-center bg-cover bg-no-repeat bg-center bg-gradient-to-br shadow-lg from-lime-400/20 to-primary/40  h-screen'>
            <div className=' bg-white backdrop-blur-md border border-white'>
                <div>
                    <h3 className='font-poppin font-normal tablet:text-2xl text-center mobile:text-xl text-white/90 bg-primary p-4'>Login to your account!</h3>
                     <div className='p-5 tablet:p-10 rounded-lg overflow-hidden tablet:pt-0'>

                    <div className='loginInfo'>
                        <p className='font-nunito text-gray-500 text-base italic pt-5'>Email: <b>mdshrabon331@gmail.com</b></p>
                        <p className='font-nunito text-gray-500 text-base italic'>Password: <b>112233</b></p>
                    </div>

                    <form className='large_tablet:w-[370px]'>
                        <div className='relative mobile:mt-5 tablet:mt-12'>
                            <span className='font-nunito text-lg pb-2 text-primary block'>Email Address</span>
                            <MdOutlineMailLock onClick={handleShowPassword} className='text-lg text-primary absolute -left-0 top-[59%] cursor-pointer'/>
                            <input onChange={emailValue}  className='input_css  '  type={'text'} placeholder='Enter Your Email'/>
                            {/* <span className='input_span_css  '>Email Address</span> */}
                        </div>

                        <div className='relative mobile:mt-5 tablet:mt-6'>
                            <span className='font-nunito text-lg pb-2 text-primary block'>Password</span>
                            <RiLockPasswordFill onClick={handleShowPassword} className='text-lg text-primary absolute -left-0 top-[59%] cursor-pointer'/>
                            <input onChange={passwordValue} className='input_css ' type={passwordShow? 'text':'password'} placeholder='input your password' />
                            {/* <span className='input_span_css  '>Password</span> */}
                            {passwordShow? 
                            <RiEyeFill onClick={handleShowPassword} className='text-lg text-slate-600 absolute right-4 top-[59%] cursor-pointer'/>
                            :
                            <RiEyeCloseFill onClick={handleShowPassword} className='text-lg text-slate-600 absolute right-4 top-[59%] cursor-pointer'/>
                            }
                        </div>
                    
                        {signinError ? 
                        <p className='text-red-600 bg-red-200 py-2 px-4 font-nunito rounded mt-1'>{signinError}</p>
                        : ''}
                        <button onClick={handleSubmit} className='py-5 mt-12 font-nunito font-semibold text-base text-white bg-primary text-center w-full rounded-lg'> Sign in </button>
                        <p className='font-nunito font-normal text-sm text-left mt-2 text-black'>Don’t have an account ?  <Link to='/registration' className='text-[#EA6C00] font-bold'>Sign up </Link> </p>
                        <p onClick={HandleResetPassword} className='font-nunito  text-sm  mt-2  text-primary font-bold cursor-pointer text-center'> Reset Password  </p>
                        <button onClick={HandleLoginWithGoogle} className='tablet:py-4 mobile:py-1 tablet:px-8 mobile:px-2 tablet:mt-7 mobile:mt-4 font-nunito font-normal mobile:text-sm sm:text-base text-[#03014C] bg-white text-center rounded-lg border-2 border-slate-300 flex items-center '><FcGoogle className='mr-1'/> Login with Google</button>
                    
                    </form>
                     </div>
                </div>
            </div>

          
       </div>
       {showModal ? 
        <div className=' w-1/3 p-10 h-auto bg-white border-gray-200 border-2 rounded-lg absolute top-0 left-1/2 -translate-x-1/2 shadow-lg shadow-gray'>
              <h2 className='font-nunito font-bold tablet:text-4xl mobile:text-3xl text-[#11175D]'>Forgot Your password </h2>
              <input  onChange={ForgetPassword} className='input_css rounded-none border-t-0 border-l-0 border-r-0  border-b pl-1 pb-2' type={'email'} placeholder='your email' />
                {errorFEmail ? 
                <p className='!text-black bg-red-200 py-2 px-4 font-nunito rounded mt-1'>{errorFEmail}</p>
                : ''}
                {messageFEmail ? 
                <p className='text-white bg-blue-500 py-2 px-4 font-nunito rounded mt-1'>{messageFEmail}</p>
                : ''}
               {messageFEmail ? 
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
               :
               <div>
               <button onClick={SubmiForgetEmail} className='py-2 mt-6 ml-6 font-nunito font-semibold text-base text-white bg-primary text-center w-32 rounded-lg'>Submit</button>
               <button onClick={CancelModel} className='py-2 mt-6 ml-6 font-nunito font-semibold text-base text-white bg-red-500 text-center w-32 rounded-lg'>Cancel</button>
               </div>
                }
        </div>
        :''}
     </>
  )
}

export default Signin;