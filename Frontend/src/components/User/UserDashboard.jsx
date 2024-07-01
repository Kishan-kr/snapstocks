import React, { useEffect, useState } from 'react'
import Profile from './Profile'
import Dropdown from '../Common/Dropdown';
import FilterTabs from '../Common/FilterTabs';
import { FaRegImage } from 'react-icons/fa6'
import { FaHeart } from "react-icons/fa";
import { RiFolderImageLine } from 'react-icons/ri'
import { IoMdMail } from 'react-icons/io';
import { IoEllipsisHorizontalSharp } from 'react-icons/io5';
import { Outlet, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showToast } from '../../redux/reducers/ToastReducer';
import Toast from '../Common/Toast';
import Spinner from '../Common/Spinner';

// const initialUser = {
//   name: 'John Doe',
//   username: 'username',
//   profilePic: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&q=80&w=800",
//   bio: 'Always put credits for the photographer. Your donation is very welcome. - Lifestyle photographer based in Brazil.',
//   hireable: false,
//   mail: 'john@mail.com',
//   location: 'India',
//   socials: [{ "name": 'instagram', url: 'insta.com/john' }],
//   interests: ['technology', 'water', 'computers', 'development',]
// }
const initialUser = {
  name: '',
  username: '',
  profilePic: "",
  bio: '',
  hireable: false,
  mail: '',
  location: '',
  socials: [],
  interests: []
}

function UserDashboard() {
  const { username } = useParams()
  const [user, setUser] = useState(initialUser)
  const [isLoading, setIsLoading] = useState(true)

  const dispatch = useDispatch()

  // tabs array 
  const filterItems = [
    {
      path: `/${username}`,
      text: 'Photos',
      icon: <FaRegImage />,
      count: user?.imagesCount
    },
    {
      path: `/${username}/likes`,
      text: 'Likes',
      icon: <FaHeart />,
      count: user?.imageLikeCount
    },
    {
      path: `/${username}/collections`,
      text: 'Collections',
      icon: <RiFolderImageLine />,
      count: user?.collectionsCount
    },
  ]

  const getUser = async (username) => {
    setIsLoading(true)
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/users/username/${username}`)
      const responseData = await response.json()

      if (!response.ok) {
        throw new Error(responseData?.error || response.statusText)
      }

      return responseData.data

    } catch (error) {
      console.error("Error while getting user by username: ", error.message)
      dispatch(showToast({message: error.message, type: 'error'}))
      return {}
    } finally {
      setIsLoading(false) 
    }
  }

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUser(username);
      setUser(userData);
    };
    fetchUser();
  }, [])

  if(isLoading) {
    return (<div className='flex items-center justify-center my-32'>
      <Spinner variant={'green'}/>
    </div>)
  }

  return (
    <div>
      <Profile user={user} />
      <div className='sticky top-0 z-50'>
      <FilterTabs tabs={filterItems}>
        <ul className='hidden ms-auto gap-2 items-center md:flex'>
          <li className='bg-gray-200 h-6 w-6 rounded-full flex items-center justify-center'>
            {user?.profilePic ? <img src={user.profilePic} className='h-6 w-6 rounded-full object-cover' alt="" />
            : <p className='text-sm font-medium text-gray-700'>{user.name[0]}</p>}
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
      </div>      
      <div className='py-2 pt-6'>
        <Outlet context={[user?._id]} />
      </div>
      <Toast/>
    </div>
  )
}

export default UserDashboard 