import React from 'react'
import { IoMdMail } from "react-icons/io";
import { IoEllipsisHorizontalSharp, IoCloseSharp, IoCheckmarkCircleSharp } from "react-icons/io5";
import { FaLink, FaLocationDot, FaCaretDown } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import Dropdown from '../Common/Dropdown';

function Profile(props) {
  const { user } = props;

  return (
    <section>
      <div className='relative flex flex-col gap-x-14 gap-y-6 px-2 py-14 items-start md:flex-row md:px-4'>
        <div className='md:max-w-sm basis-32 grow'>
        <div className="ms-auto bg-gray-200 flex items-center justify-center h-32 w-32 aspect-square rounded-full overflow-hidden sm:h-36 sm:w-36">
          {user?.profilePic ? <img src={user.profilePic} className='h-32 w-32 rounded-full object-cover sm:h-36 sm:w-36' alt="" />
          : <p className='text-5xl font-medium text-gray-700'>{user?.firstName[0]}</p>}
        </div>
        </div>

        <div className="flex flex-col gap-y-4">
          <div className='flex gap-x-6'>
            <div>
              <p className='text-4xl font-semibold'>{user.name}</p>
            </div>

            <div className="absolute top-0 right-0 mt-16 me-2 flex gap-2 items-center py-1 md:static md:mt-0 md:me-0">
              {user.hireable && <button className='rounded px-2 py-1 bg-blue-500 text-slate-100 text-base ms-auto hover:bg-blue-600'>Hire</button>}

              <button className='rounded px-2 py-1 h-full text-gray-light text-xl border hover:text-gray-dark'>
                <IoMdMail />
              </button>

              <Dropdown
                  toggleButton={
                    <span className='rounded px-2 py-1 h-full text-gray-light text-xl border hover:text-gray-dark'>
                      <IoEllipsisHorizontalSharp/>
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
            </div>
          </div>

          <div className='flex flex-col gap-y-4'>
            <p className='slg:max-w-[70%] text-start'>{user.bio}</p>

            <div className='flex flex-col gap-y-1'>
              <div>{
                user?.hireable ?
                  <div className='flex items-center gap-2 text-blue-500'>
                    <span className='flex items-center justify-center text-base'><IoCheckmarkCircleSharp /></span>
                    <span>Available for hire</span>
                  </div> :
                  <div className='flex items-center gap-2 text-base text-gray-light'>
                    <span><IoCloseSharp /></span>
                    <span>Not available</span>
                  </div>
              }</div>

              <div>{
                user.location &&
                <Link to={`/search/photos/${user.location}`} className='w-fit flex items-center gap-2 text-gray-light hover:text-gray-dark'>
                  <span className='p- y-px flex items-center justify-center rounded-full text-base'><FaLocationDot /></span>
                  <span>{user.location}</span>
                </Link>
              }</div>

              <div className='w-max'>{
                user.socials &&
                <Dropdown
                  toggleButton={
                    <span className='flex gap-2 items-center text-base text-gray-light hover:text-gray-dark'>
                      <span><FaLink /></span>
                      <span>Connect with {user.name}</span>
                      <span><FaCaretDown /></span>
                    </span>
                  }>
                  <div className='w-48'>
                    <ul className="py-1 px-2 text-start" role="none"> {
                      user.socials.map((social) => (
                        <li key={social.url}><Link to={social.url} className="text-gray-light block px-4 py-2 text-sm hover:text-gray-dark" role="menuitem" tabIndex="-1">{social.name}</Link></li>
                      ))
                    }</ul>
                  </div>
                </Dropdown>
              }</div>
            </div>

            <div>{user?.interests && user.interests.length > 0 &&
              <>
                <div className='text-start mb-2'>Interests</div>
                <ul className="flex gap-2 flex-wrap">{
                  user.interests.map((interest, index) => (
                    <li key={index + interest} className='rounded border border-slate-100 bg-slate-100 text-gray-light leading-8 hover:text-gray-dark hover:border-slate-300'>
                      <Link to={`/search/photos?keyword=${interest}`} className='px-2'>{interest}</Link></li>
                  ))
                }</ul>
              </>
            }</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Profile