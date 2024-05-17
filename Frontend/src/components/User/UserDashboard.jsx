import React, { useState } from 'react'
import Profile from './Profile'
import Dropdown from '../Common/Dropdown';
import FilterTabs from '../Common/FilterTabs';
import { FaRegImage } from 'react-icons/fa6'
import { FaHeart } from "react-icons/fa";
import { RiFolderImageLine } from 'react-icons/ri'
import { IoMdMail } from 'react-icons/io';
import { IoEllipsisHorizontalSharp } from 'react-icons/io5';
import { Outlet } from 'react-router-dom';

function UserDashboard(props) {
  const {username} = props;
  const [user, setUser] = useState({
    name: 'John Doe',
    username: username,
    profilePic: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&q=80&w=800",
    bio: 'Always put credits for the photographer. Your donation is very welcome. - Lifestyle photographer based in Brazil.',
    hireable: true,
    mail: 'john@mail.com',
    location: 'India',
    socials: [{ "name": 'instagram', url: 'insta.com/john' }],
    interests: ['technology', 'water', 'computers', 'development',]
  })

  // tabs array 
  const filterItems = [
    {
      path: `/${user.username}`,
      text: 'Photos',
      icon: <FaRegImage />,
      count: 25
    },
    {
      path: `/${user.username}/likes`,
      text: 'Likes',
      icon: <FaHeart />,
      count: 0
    },
    {
      path: `/${user.username}/collections`,
      text: 'Collections',
      icon: <RiFolderImageLine />,
      count: 10
    },
  ]

  return (
    <div>
      <Profile user={user} />
      <FilterTabs tabs={filterItems}>
        <ul className='hidden ms-auto gap-2 items-center md:flex'>
          <li>
            <img src={user.profilePic} className='h-6 w-6 rounded-full object-cover' alt="" />
          </li>
          <li className="me-2">
            <span>{user.name}</span>
          </li>
          <li>
            {user.hireable && <button className='rounded px-2 py-1 bg-blue-500 text-slate-100 text-base ms-auto hover:bg-blue-600'>Hire</button>}
          </li>
          <li>
            <button className='rounded px-2 py-[0.4rem] text-gray-light text-xl border hover:text-gray-dark'>
              <IoMdMail />
            </button>
          </li>
          <li>
            <Dropdown
              toggleButton={
                <span className='rounded px-2 py-[0.4rem] text-gray-light text-xl border hover:text-gray-dark'>
                  <IoEllipsisHorizontalSharp />
                </span>
              }>
              <div className='w-max'>
                <ul className="py-2 text-start" role="none">
                  <li><button className='w-full text-start text-gray-light block px-4 py-2 text-sm hover:text-gray-dark hover:bg-gray-100' role="menuitem" tabIndex="-1">Follow {user.name}</button></li>
                  <li><button className='w-full text-start text-gray-light block px-4 py-2 text-sm hover:text-gray-dark hover:bg-gray-100' role="menuitem" tabIndex="-1">Share profile</button></li>
                  <li><button className='w-full text-start text-red-400 block px-4 py-2 text-sm hover:text-red-500 hover:bg-gray-100' role="menuitem" tabIndex="-1">Report</button></li>
                </ul>
              </div>
            </Dropdown>
          </li>
        </ul>
      </FilterTabs>

      <div className='py-2 pt-6'>
        <Outlet />
      </div>
    </div>
  )
}

export default UserDashboard 