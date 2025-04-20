import React from 'react';
import { IoCreateOutline } from "react-icons/io5";
import { RightsideModal } from '../../modals/rightsideModal';
import { useDispatch, useSelector } from 'react-redux';
import { setSidebarModal } from '../../slice/SidebarModalSlice'; // ✅ Correct import

export default function RightSideBar() {
  const dispatch = useDispatch(); 
const sidebar = useSelector(state => state.SidebarModal) || {};
const { popup, type, data } = sidebar;


  const handleRightsidebar = (value) => {
    dispatch(setSidebarModal({
      popup: true,
      type: value,
      data: [],  
    }));
    // console.log("Type:", value);
  };

  return (
    !popup ?
      <>
            
        <div className='rgt_side w-full h-screen bg-semi-white p-5 relative'>
          <ul className='space-y-3'>
            <li><button onClick={() => handleRightsidebar('suggest-friend')} className='font-poppin font-semibold text-sm text-semi-black'>Suggest Friends <span className='...'>150</span></button></li>
            <li><button onClick={() => handleRightsidebar('friend-request')} className='font-poppin font-semibold text-sm text-semi-black'>Friends Request <span className='...'>80</span></button></li>
            <li><button onClick={() => handleRightsidebar('your-friend')} className='font-poppin font-semibold text-sm text-semi-black'>Your Friends <span className='...'>45</span></button></li>
            <li><button onClick={() => handleRightsidebar('suggest-group')} className='font-poppin font-semibold text-sm text-semi-black'>Suggest Group <span className='...'>90</span></button></li>
            <li><button onClick={() => handleRightsidebar('your-group')} className='font-poppin font-semibold text-sm text-semi-black'>Your Groups <span className='...'>25</span></button></li>
            <li><button onClick={() => handleRightsidebar('create-group')} className='font-poppin font-semibold text-sm text-semi-black flex items-center gap-1'><IoCreateOutline className='text-lg'/> Create Group</button></li>
          </ul>
        </div>
      </>
    :
    <RightsideModal />
    
 
  );
}
