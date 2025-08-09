import { getAuth } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SearchBar } from "../component/search";
import { Sidebar } from "../component/sidebar";
import RightSideBar from "../component/right_sidebar";
import SavePostItem from "../component/utils/SavePost";
import { getDatabase, onValue, ref } from "firebase/database";

export const Save = () => {
  const userData = useSelector((state) => state.userLoginInfo.userInfo);
  const auth = getAuth();
  const naviget = useNavigate();
  const db = getDatabase();

  const [posts, setPosts] = useState([]);
  const [savedPostIDs, setSavedPostIDs] = useState([]);

  useEffect(() => {
    if (!userData) {
      naviget("/signin");
    }
  }, [userData, naviget]);

  // 1️⃣ Get saved post IDs for the current user
  useEffect(() => {
    if (!auth.currentUser) return;

    const savedRef = ref(db, "savepost/");
    onValue(savedRef, (snapshot) => {
      if (!snapshot.exists()) {
        setSavedPostIDs([]);
        return;
      }

      const ids = [];
      snapshot.forEach((child) => {
        // child.key format: userId_postId
        const [uid, postId] = child.key.split("_");
        if (uid === auth.currentUser.uid) {
          ids.push(postId);
        }
      });

      setSavedPostIDs(ids);
    });
  }, [auth.currentUser, db]);

  // 2️⃣ Fetch all posts and filter only saved ones
  useEffect(() => {
    if (savedPostIDs.length === 0) {
      setPosts([]);
      return;
    }

    const postRef = ref(db, "posts/");
    onValue(postRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) {
        setPosts([]);
        return;
      }

      const postList = [];
      Object.entries(data).forEach(([userId, userPosts]) => {
        Object.entries(userPosts).forEach(([postId, postData]) => {
          if (savedPostIDs.includes(postId)) {
            postList.push({
              id: postId,
              ...postData,
            });
          }
        });
      });

      // Sort newest first
      postList.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setPosts(postList);
    });
  }, [db, savedPostIDs]);

  return (
    <div className="flex mobile:flex-wrap tablet:flex-nowrap bg-bg">
      <div className="mobile:w-full tablet:w-[400px]">
        <Sidebar active="home" />
      </div>
      <div className="w-full h-full flex justify-center px-4">
        <div className="min-w-[290px] tablet:max-w-[460px] laptop:min-w-[500px] laptop:max-w-[620px] desktop:min-w-[700px] desktop:max-w-[700px] mobile:py-20 tablet:pt-2 desktop:py-10">
          <SearchBar />
          <div className="post_lists mobile:p-2 tablet:p-5 mt-10 border border-bdr mobile:rounded tablet:rounded-xl h-[1080px] overflow-y-scroll">
            {posts.map((post) => (
              <SavePostItem key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>
      <div className="right_sidebar tablet:w-[420px] desktop:w-[530px]">
        <RightSideBar />
      </div>
    </div>
  );
};
