import React, { useEffect, useState, useRef } from 'react'; // Import useRef
import { Link } from 'react-router-dom';
import { FiPlus, FiSend } from "react-icons/fi";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { FaComment, FaShare } from "react-icons/fa";
import { getDatabase, onValue, get, ref, remove, set, update } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import Skeleton from 'react-loading-skeleton';
import GetUser from '../../hooks/GetUser'; // Assuming this fetches the post creator's user
import useLike from '../../hooks/useLike';
import useDislike from '../../hooks/useDislike';

export default function PostItem({ postId, post }) {

    let userId = post.userId;
    const { user, loading } = GetUser(userId); // User is the post creator
    const db = getDatabase();
    const auth = getAuth();
    const currentUserId = auth.currentUser.uid;
    // const postRef = ref(db, `posts/${post.userId}/${postId}`); // Unused, consider removing if not needed for direct listeners

    const hasLiked = useLike({ postID: post.id, userID: currentUserId });
    const hasDisliked = useDislike({ postID: post.id, userID: currentUserId });

    const [postBigModal, setPostBigModal] = useState(false);
    const [showComment, setShowComment] = useState(false);
    const commentInputRef = useRef(null); // Correctly initialized useRef
    const [comments, setComments] = useState([]); // State to store comments for this post

    console.log('likes:', hasLiked);

    // Fetch comments when showComment or postBigModal is active
    useEffect(() => {
        if (showComment === post.id || postBigModal) {
            const commentsRef = ref(db, 'comments');
            const unsubscribe = onValue(commentsRef, (snapshot) => {
                const fetchedComments = [];
                snapshot.forEach((childSnapshot) => {
                    const commentData = childSnapshot.val();
                    if (commentData.post_id === post.id) {
                        fetchedComments.push({
                            id: childSnapshot.key,
                            ...commentData
                        });
                    }
                });
                setComments(fetchedComments.reverse()); // Show latest comments first
            });

            return () => unsubscribe(); // Cleanup listener
        } else {
            setComments([]); // Clear comments when not shown
        }
    }, [showComment, postBigModal, post.id, db]);


    const handleLike = async (postId) => {
        const db = getDatabase();
        const likeId = `${postId}_${currentUserId}`;
        const likeRef = ref(db, `likes_table/${likeId}`);
        const postRef = ref(db, `posts/${post.userId}/${post.id}`);

        const snapshot = await get(likeRef);
        const currentLikes = post.like || 0;

        if (snapshot.exists()) {
            await remove(likeRef);
            await update(postRef, {
                like: Math.max(currentLikes - 1, 0),
            });
        } else {
            await set(likeRef, {
                who_liked: currentUserId,
                which_post: post.userId,
                post_id: postId,
                timestamp: new Date().toISOString(),
            });
            await update(postRef, {
                like: currentLikes + 1,
            });

            const dislikeRef = ref(db, `dislikes_table/${postId}_${currentUserId}`);
            const disSnap = await get(dislikeRef);
            if (disSnap.exists()) {
                await remove(dislikeRef);
                await update(postRef, {
                    dislike: Math.max((post.dislike || 0) - 1, 0),
                });
            }
        }
    };

    const handleDislike = async (postId) => {
        const db = getDatabase();
        const dislikeId = `${postId}_${currentUserId}`;
        const dislikeRef = ref(db, `dislikes_table/${dislikeId}`);
        const postRef = ref(db, `posts/${post.userId}/${postId}`);

        const snapshot = await get(dislikeRef);
        const currentDislikes = post.dislike || 0;

        if (snapshot.exists()) {
            await remove(dislikeRef);
            await update(postRef, {
                dislike: Math.max(currentDislikes - 1, 0),
            });
        } else {
            await set(dislikeRef, {
                who_liked: currentUserId,
                which_post: post.userId,
                post_id: postId,
                timestamp: new Date().toISOString(),
            });
            await update(postRef, {
                dislike: currentDislikes + 1,
            });

            const likeRef = ref(db, `likes_table/${postId}_${currentUserId}`);
            const likSnap = await get(likeRef);
            if (likSnap.exists()) {
                await remove(likeRef);
                await update(postRef, {
                    like: Math.max((post.like || 0) - 1, 0),
                });
            }
        }
    };

    const handleCommentShow = (id) => {
        if (showComment === id) {
            setShowComment(false);
        } else {
            setShowComment(id);
        }
    };

    const createComment = async (postId) => {
        const commentText = commentInputRef.current.value;
        if (!commentText.trim()) {
            console.log("Comment cannot be empty.");
            return;
        }

        const db = getDatabase();
        // A more unique ID for each comment
        const newCommentRef = ref(db, `comments/${currentUserId}_${postId}_${new Date().getTime()}`);

        await set(newCommentRef, {
            who_comment: currentUserId,
            post_id: postId,
            comment_text: commentText,
            timestamp: new Date().toISOString(),
        });

        // Update post's comment count
        const postRef = ref(db, `posts/${post.userId}/${postId}`);
        const currentComments = post.comment || 0;
        await update(postRef, {
            comment: currentComments + 1,
        });

        commentInputRef.current.value = ''; // Clear the input
    };

    const CommentDisplay = ({ commentData }) => {
        const { user: commenterUser, loading: commenterLoading } = GetUser(commentData.who_comment);

        if (commenterLoading) return <Skeleton width={100} />;

        return (
            <div className='flex items-center gap-3 p-5 border-b border-gray-200'>
                <img className='w-10 h-10 rounded-full border-2 object-cover border-brd' src={commenterUser?.profile_picture} alt='commenter_image' />
                <div>
                    <Link className='text-base text-black' to={'/'}>
                        {commenterUser?.username || <Skeleton />}
                    </Link>
                    <p className='text-gray-600'>{commentData.comment_text}</p>
                </div>
            </div>
        );
    };


    return (
        <>
            <div key={postId} className='post_item mb-5 '>
                <div className='item bg-white mobile:p-3 tablet:p-5 mobile:rounded tablet:rounded-xl'>
                    {/* Post hdr Start */}
                    <div className='flex items-start justify-between'>
                        <div className='usr flex gap-3'>

                            <img className='w-10 h-10 rounded-full border-2 object-cover border-brd' src={user?.profile_picture} alt='puser_image' />
                            <Link className='text-base text-black' to={'/'}>
                                {user?.username || <Skeleton />}
                            </Link>
                        </div>
                        <div>
                            <HiOutlineDotsVertical className="text-2xl text-gray-500" />
                        </div>
                    </div>
                    {/* Post cntn Start */}
                    <div className='pst_cntn py-5'>
                        <p className='post_p'> {post?.postText} </p>
                        {post.postImg &&
                            <div className=' !aspect-square mobile:rounded tablet:rounded-xl my-5 overflow-hidden ' onClick={() => setPostBigModal(true)}>
                                <img className='!aspect-square object-contain' src={post.postImg} alt='img_cont' />
                            </div>
                        }
                    </div>
                    {/* Post cntn Start */}
                    <div className='pst_ftr flex justify-between items-center'>
                        <div className='flex gap-5 items-center'>
                            <span onClick={() => handleLike(post.id)} className={`cursor-pointer font-poppin mobile:text-xs desktop:text-base ${hasLiked ? 'text-blue-500' : 'text-gray-500'} text-gray-500 flex mobile:gap-1 tablet:gap-1 items-center`}><AiFillLike /> {post?.like} </span>
                            <span onClick={() => handleDislike(post.id)} className={`cursor-pointer font-poppin mobile:text-xs desktop:text-base ${hasDisliked ? 'text-blue-500' : 'text-gray-500'} text-gray-500 flex mobile:gap-1 tablet:gap-1 items-center`}><AiFillDislike /> {post?.dislike} </span>
                            <span onClick={() => handleCommentShow(post.id)} className='cursor-pointer font-poppin mobile:text-xs desktop:text-base text-gray-500 flex mobile:gap-1 tablet:gap-1 items-center'><FaComment /> {post?.comment} </span>
                        </div>
                        <span className='cursor-pointer font-poppin mobile:text-xs desktop:text-base text-gray-500 flex mobile:gap-1 tablet:gap-1 items-center'><FaShare /> {post?.share} </span>
                    </div>

                </div>
                {/* All Comment List Start */}
                {showComment === post.id &&
                    <div className='all_comment_list h-[280px] relative overflow-hidden rounded-lg bg-white'>
                        <div className='h-[200px] overflow-y-auto'>
                            {comments.map(comment => (
                                <CommentDisplay key={comment.id} commentData={comment} />
                            ))}
                        </div>
                        <div className='absolute w-full left-0 h-[60px] bottom-0 bg-gray-400 flex items-center gap-3 p-5'>
                            <img className='w-10 h-10 rounded-full border-2 object-cover border-brd' src={user?.profile_picture} alt='puser_image' />
                            <input ref={commentInputRef} type="text" placeholder='Write a comment...' className='h-10 border text-semi-black font-nunito font-normal text-base border-bdr w-full outline-none focus:outline-none border-b-2 rounded px-2 focus:border-0' />
                            <button onClick={() => createComment(post.id)} className='bg-blue-500 flex items-center gap-3 text-white px-4 py-2 rounded'><FiSend className='text-base text-white cursor-pointer' />Post</button>
                        </div>
                    </div>
                }
            </div>
            {postBigModal &&
                <div className='fixed top-0 left-0 w-full h-full z-[99999999] inset-0 bg-black/10' onClick={() => setPostBigModal(false)}>
                    <div className='laptop:w-[760px] desktop:w-[760px] z-[999999] h-[80%] fixed top-5 left-1/2 -translate-x-1/2' onClick={(e) => e.stopPropagation()}>
                        <div key={postId} className='item h-[80%] bg-white mobile:p-3 tablet:p-5 mobile:rounded tablet:rounded-xl !rounded-b-none '>
                            {/* Post hdr Start */}
                            <div className='flex items-start justify-between'>
                                <div className='usr flex gap-3'>
                                    <img className='w-10 h-10 rounded-full border-2 object-cover border-brd' src={user?.profile_picture} alt='puser_image' />
                                    <Link className='text-base text-black' to={'/'}>
                                        {user?.username || <Skeleton />}
                                    </Link>
                                </div>
                                <div>
                                    <HiOutlineDotsVertical className="text-2xl text-gray-500" />
                                </div>
                            </div>
                            {/* Post cntn Start */}
                            <div className='pst_cntn py-5'>
                                <p className='post_p'> {post?.postText} </p>
                                {post.postImg &&
                                    <div className=' !aspect-[1.9/1] mobile:rounded tablet:rounded-xl my-5 overflow-hidden '>
                                        <img className='!aspect-[1.9/1] object-contain' src={post.postImg} alt='img_cont' />
                                    </div>
                                }
                            </div>
                            {/* Post cntn Start */}
                            <div className='pst_ftr flex justify-between items-center'>
                                <div className='flex gap-5 items-center'>
                                    <span onClick={() => handleLike(post.id)} className={`cursor-pointer font-poppin mobile:text-xs desktop:text-base ${hasLiked ? 'text-blue-500' : 'text-gray-500'} text-gray-500 flex mobile:gap-1 tablet:gap-1 items-center`}><AiFillLike /> {post?.like} </span>
                                    <span onClick={() => handleDislike(post.id)} className={`cursor-pointer font-poppin mobile:text-xs desktop:text-base ${hasDisliked ? 'text-blue-500' : 'text-gray-500'} text-gray-500 flex mobile:gap-1 tablet:gap-1 items-center`}><AiFillDislike /> {post?.dislike} </span>
                                    <span className='cursor-pointer font-poppin mobile:text-xs desktop:text-base text-gray-500 flex mobile:gap-1 tablet:gap-1 items-center'><FaComment /> {post?.comment} </span>
                                </div>
                                <span className='cursor-pointer font-poppin mobile:text-xs desktop:text-base text-gray-500 flex mobile:gap-1 tablet:gap-1 items-center'><FaShare /> {post?.share} </span>
                            </div>
                        </div>
                        {/* All Comment List Start */}
                        <div className='all_comment_list h-[280px] relative overflow-hidden rounded rounded-t-none border border-gray-300 bg-white'>
                            <div className='h-[200px] overflow-y-auto'>
                                {comments.map(comment => (
                                    <CommentDisplay key={comment.id} commentData={comment} />
                                ))}
                            </div>
                            <div className='absolute w-full left-0 h-[60px] bottom-0 bg-gray-400 flex items-center gap-3 p-5'>
                                <img className='w-10 h-10 rounded-full border-2 object-cover border-brd' src={user?.profile_picture} alt='puser_image' />
                                <input ref={commentInputRef} type="text" placeholder='Write a comment...' className='h-10 border text-semi-black font-nunito font-normal text-base border-bdr w-full outline-none focus:outline-none border-b-2 rounded px-2 focus:border-0' />
                                <button onClick={() => createComment(post.id)} className='bg-blue-500 flex items-center gap-3 text-white px-4 py-2 rounded'><FiSend className='text-base text-white cursor-pointer' />Post</button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}