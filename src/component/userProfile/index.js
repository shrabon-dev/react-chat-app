import PostItem from '../utils/Post';
import Button from '../utils/Button';
import CreatePost from '../utils/CreatePost';
import { useSelector, useDispatch } from 'react-redux';
import UserStatus from '../userStatus';
import { FiEdit3 } from 'react-icons/fi';
import { BsFillCloudUploadFill } from 'react-icons/bs';
import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signOut, updateProfile } from 'firebase/auth';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { getStorage, ref, uploadString, getDownloadURL } from 'firebase/storage';
import { ref as dbRef, onValue, getDatabase, update } from 'firebase/database';
import { setSidebarModal } from '../../slice/SidebarModalSlice';
import { userLoginInfo } from '../../slice/userSlice';

export default function Profile() {
  const user = useSelector((state) => state.userLoginInfo.userInfo);
  const dispatch = useDispatch();
  const db = getDatabase();
  const auth = getAuth();
  const navigate = useNavigate();
  const storage = getStorage();

  const [posts, setPosts] = useState([]);
  const [showImgUpload, setShowImgUpload] = useState(false);
  const [showCoverUpload, setShowCoverUpload] = useState(false);
  const [img, setImg] = useState('');
  const [preImg, setPreImg] = useState('');
  const [imgName, setImgName] = useState('');
  const [coverImg, setCoverImg] = useState('');
  const [preCoverImg, setPreCoverImg] = useState('');
  const [coverImgName, setCoverImgName] = useState('');
  const [coverURL, setCoverURL] = useState('');

  const cropperRef = useRef(null);

  useEffect(() => {
    if (!user) {
      return;
    }
    const postRef = dbRef(db, 'posts/');
    const userRef = dbRef(db, 'users/' + user.uid);

    const unsubscribePosts = onValue(postRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) {
        setPosts([]);
        return;
      }
      const postList = [];
      Object.entries(data).forEach(([userId, userPosts]) => {
        if (userId === user.uid) {
          Object.entries(userPosts).forEach(([postId, postData]) => {
            postList.push({
              id: postId,
              ...postData,
            });
          });
        }
      });
      postList.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setPosts(postList);
    });

    const unsubscribeUser = onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      if (data && data.coverURL) {
        setCoverURL(data.coverURL);
      } else {
        setCoverURL('../images/cvr.jpg');
      }
    });

    return () => {
      unsubscribePosts();
      unsubscribeUser();
    };
  }, [db, user]);

  const handleImageChange = (e, type) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        if (type === 'profile') {
          setImg(reader.result);
          setImgName(file.name);
        } else if (type === 'cover') {
          setCoverImg(reader.result);
          setCoverImgName(file.name);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const onCrop = (type) => {
    const cropper = cropperRef?.current?.cropper;
    if (cropper) {
      if (type === 'profile') {
        setPreImg(cropper.getCroppedCanvas().toDataURL());
      } else if (type === 'cover') {
        setPreCoverImg(cropper.getCroppedCanvas().toDataURL());
      }
    }
  };

  const toggleImgUploadModal = () => {
    setShowImgUpload(!showImgUpload);
    setImg('');
    setPreImg('');
  };

  const toggleCoverUploadModal = () => {
    setShowCoverUpload(!showCoverUpload);
    setCoverImg('');
    setPreCoverImg('');
  };

  const handleProfileUpload = async (e) => {
    e.preventDefault();
    if (!preImg) return;

    const storageRef = ref(storage, `profile_images/${user.uid}/${imgName}`);
    try {
      await uploadString(storageRef, preImg, 'data_url');
      const downloadURL = await getDownloadURL(storageRef);

      await updateProfile(auth.currentUser, {
        photoURL: downloadURL,
      });

      const updatedUserInfo = { ...user, photoURL: downloadURL };
      localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));
      // Dispatch the updated user info to the Redux store
      dispatch(userLoginInfo(updatedUserInfo));

      toggleImgUploadModal();
    } catch (error) {
      console.error('Error uploading profile image:', error);
    }
  };

  const handleCoverUpload = async (e) => {
    e.preventDefault();
    if (!preCoverImg) return;

    const storageRef = ref(storage, `cover_images/${user.uid}/${coverImgName}`);
    try {
      await uploadString(storageRef, preCoverImg, 'data_url');
      const downloadURL = await getDownloadURL(storageRef);

      await update(dbRef(db, 'users/' + user.uid), {
        coverURL: downloadURL,
      });

      setCoverURL(downloadURL);
      toggleCoverUploadModal();
    } catch (error) {
      console.error('Error uploading cover image:', error);
    }
  };

  return (
    <>
      <div className='w-full h-full'>
        {/* Cover Start */}
        <div className='w-full bg-primary h-40 overflow-hidden rounded-xl relative group'>
          <img className='w-full h-full object-cover' src={coverURL} alt='cover img' />
          <div
            onClick={toggleCoverUploadModal}
            className='group-hover:opacity-100 duration-300 opacity-0 w-full h-full bg-black/50 rounded-xl flex justify-center items-center absolute top-0 left-0 cursor-pointer'
          >
            <BsFillCloudUploadFill className='text-white text-3xl' />
          </div>
        </div>
        {/* Profile Start */}
        <div className='w-full relative -top-16 right-0 overflow-hidden rounded-bl-xl rounded-br-xl flex items-end justify-between'>
          <div className='flex items-end gap-5'>
            <div className='img w-32 h-32 cursor-pointer relative rounded-full group overflow-hidden border-4 border-primary'>
              {/* This is the key change */}
              <img className='object-cover w-full h-full' src={`${user?.photoURL ? user.photoURL : '../images/demo.jpg'}`} alt='demo.jpg' />
              <div
                onClick={toggleImgUploadModal}
                className='group-hover:top-0 duration-300 w-full h-full bg-black/70 rounded-full flex justify-center items-center text-semi-black text-3xl absolute -top-32'
              >
                <BsFillCloudUploadFill />
              </div>
            </div>
            <div className='usr_info'>
              <h3 className='font-poppin text-2xl font-medium text-semi-black pb-5'>
                {user?.displayName}{' '}
                <Link className='inline-flex bg-primary/10 w-4 h-4 justify-center items-center rounded text-primary text-xs' to={`/setting`}>
                  <FiEdit3 className='text-xs' />
                </Link>
              </h3>
            </div>
          </div>
          <div className='button text-right'>
            {user ? (
              <Button type={'status'} text={<UserStatus userId={user.uid} />} />
            ) : (
              <>
                <Button type={'friend'} text={'Friend'} />
                <Button type={'unfriend'} text={'Unfriend'} />
              </>
            )}
          </div>
        </div>

        <CreatePost />

        <div className='post_lists mobile:p-2 tablet:p-5 mt-10 border border-bdr mobile:rounded tablet:rounded-xl h-[1080px] overflow-y-scroll'>
          {posts.map((post) => (
            <PostItem key={post.id} post={post} />
          ))}
        </div>
      </div>
      {showImgUpload && (
        <div className='w-[600px] h-[550px] z-50 bg-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-10 rounded-lg shadow-2xl'>
          <p className='text-semi-black font-nunito text-2xl'>Profile Upload</p>
          {preImg && <img src={preImg} className='w-24 h-24 block rounded-full my-4' alt='Cropped preview' />}
          <input onChange={(e) => handleImageChange(e, 'profile')} className='bg-white p-2 rounded-lg cursor-pointer mt-10' type={'file'} />
          <div className='mt-4'>
            <button onClick={handleProfileUpload} className='font-nunito font-normal text-semi-black p-2 rounded-lg text-lg bg-emerald-500 border-none inline-block'>
              Upload
            </button>
            <button onClick={toggleImgUploadModal} className='font-nunito font-normal text-semi-black p-2 m-2 rounded-lg text-lg bg-red-700 border-none inline-block'>
              Cancel
            </button>
          </div>
          <Cropper
            src={img}
            style={{ height: 200, width: '100%' }}
            initialAspectRatio={1 / 1}
            guides={true}
            crop={() => onCrop('profile')}
            ref={cropperRef}
          />
        </div>
      )}
      {showCoverUpload && (
        <div className='w-[600px] h-[550px] z-50 bg-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-10 rounded-lg shadow-2xl'>
          <p className='text-semi-black font-nunito text-2xl'>Cover Upload</p>
          {preCoverImg && <img src={preCoverImg} className='w-full h-32 block my-4 object-cover' alt='Cropped preview' />}
          <input onChange={(e) => handleImageChange(e, 'cover')} className='bg-white p-2 rounded-lg cursor-pointer mt-10' type={'file'} />
          <div className='mt-4'>
            <button onClick={handleCoverUpload} className='font-nunito font-normal text-semi-black p-2 rounded-lg text-lg bg-emerald-500 border-none inline-block'>
              Upload
            </button>
            <button onClick={toggleCoverUploadModal} className='font-nunito font-normal text-semi-black p-2 m-2 rounded-lg text-lg bg-red-700 border-none inline-block'>
              Cancel
            </button>
          </div>
          <Cropper
            src={coverImg}
            style={{ height: 200, width: '100%' }}
            initialAspectRatio={16 / 9}
            guides={true}
            crop={() => onCrop('cover')}
            ref={cropperRef}
          />
        </div>
      )}
    </>
  );
}