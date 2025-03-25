import React from 'react'
import { Friends } from '../friends'
import { MyGroups } from '../mygroups'

export default function RightSideBar() {
  return (
    <div className='rgt_side w-full'>
       <Friends/>
       <MyGroups/>
    </div>
  )
}
