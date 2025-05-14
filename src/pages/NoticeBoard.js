import React from 'react';
import { AiOutlineUser, AiOutlineTeam, AiOutlineMessage, AiOutlineSetting, AiOutlineBell, AiOutlineHome } from 'react-icons/ai';
import { BsPencilSquare, BsChatSquareText } from 'react-icons/bs';
import { FaUserFriends, FaUserEdit, FaImages, FaMicrophone, FaRegSmile, FaUsers  } from 'react-icons/fa';
import { MdOutlineEditNote, MdOutlinePostAdd } from 'react-icons/md';

export default function NoticeBoard() {
    const features = [
        { icon: <AiOutlineUser size={24} />, title: 'Profile Create', description: 'Create and customize your profile to connect with friends.' },
        { icon: <FaUserFriends size={24} />, title: 'Friend Request', description: 'Send and receive friend requests to build your network.' },
        { icon: <BsPencilSquare size={24} />, title: 'Friend Request Accept', description: 'Accept or decline friend requests to manage your connections.' },
        { icon: <FaUsers  size={24} />, title: 'Create Group', description: 'Create groups to chat with multiple friends at once.' },
        { icon: <MdOutlineEditNote size={24} />, title: 'Group Request', description: 'Send and accept group requests to join communities.' },
        { icon: <FaUserEdit size={24} />, title: 'Request Accept in Group', description: 'Approve or reject group join requests for your own groups.' },
        { icon: <AiOutlineMessage size={24} />, title: 'Messages', description: 'Chat with friends or in groups using text, images, audio, and emojis.' },
        { icon: <FaMicrophone size={24} />, title: 'Audio Transfer', description: 'Send voice messages to your friends and groups.' },
        { icon: <FaRegSmile size={24} />, title: 'Emoji Support', description: 'Express your emotions with a wide range of emojis.' },
        { icon: <AiOutlineHome size={24} />, title: 'Home', description: 'Navigate to your home page for a personalized experience.' },
        { icon: <AiOutlineBell size={24} />, title: 'Notifications', description: 'Stay updated with notifications for new messages and friend requests.' },
        { icon: <MdOutlinePostAdd size={24} />, title: 'Create Post - Upcoming', description: 'Share updates, photos, and thoughts on your profile.' },
        { icon: <BsChatSquareText size={24} />, title: 'Post Edit & Delete - Upcoming', description: 'Edit or delete your posts as needed.' },
        { icon: <FaImages size={24} />, title: 'Send Story - Upcoming', description: 'Share short, time-limited stories with your friends.' },
        { icon: <AiOutlineSetting size={24} />, title: 'Settings - Upcoming', description: 'Customize your app settings and preferences.' },
        { icon: <AiOutlineUser size={24} />, title: 'User Profile - Upcoming', description: 'View and manage your personal profile information.' },
    ];

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">📋 Chat Application Manual</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature, index) => (
                    <li key={index} className="bg-white p-4 rounded-xl shadow-md flex gap-4 items-center">
                        <div className="text-primary bg-primary/20 p-2 rounded-full">
                            {feature.icon}
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700">{feature.title}</h3>
                            <p className="text-gray-500 text-sm">{feature.description}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
