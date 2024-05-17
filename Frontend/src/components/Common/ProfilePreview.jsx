import React from 'react'
import { Link } from 'react-router-dom';

function ProfilePreview(props) {
    const { name, username, hireable } = props.user;

    return (
      <div className='flex flex-col gap-y-6 p-3 min-w-80 text-start border border-gray-500 rounded-md md:basis-[calc(50%-12px)] slg:basis-[calc(33.33%-16px)] hover:border-gray-300'>
        {!name ? <Loader/> :
          <>
        <div className="flex items-center gap-3">
          <Link to={''} className='flex items-center gap-3 w-full'>
            <div className="w-14 h-14 rounded-full overflow-hidden border border-indigo-500">
              <img src="" alt="" />
            </div>
            <div className="flex flex-col">
              <p className="text-gray-100 font-semibold text-lg leading-5">{name}</p>
              <p className="text-gray-300 text-base">{username}</p>
            </div>
          </Link>
          {hireable && <button className='rounded px-2 py-1 bg-blue-500 text-slate-100 text-sm ms-auto hover:bg-blue-600'>Hire</button>}
        </div>
        <Link to={''} className="flex gap-2 items-center aspect-[38/9]">
          <div className='aspect-[4/3] bg-gray-400/15 h-full'>
            <img src="" alt="" />
          </div>
          <div className='aspect-[4/3] bg-gray-400/15 h-full'>
            <img src="" alt="" />
          </div>
          <div className='aspect-[4/3] bg-gray-400/15 h-full'>
            <img src="" alt="" />
          </div>
        </Link>
        <Link to={''} className='border border-gray-400 rounded w-full text-gray-300 text-center py-1 hover:text-gray-100 hover:border-gray-200'>View profile</Link>
        </>
        }
      </div>
    )
}

function Loader() {
  return (
    <div className='h-[228px] flex items-center justify-center'>
      <div className='w-10 h-10 rounded-full animate-spin border-4 border-gray-500 border-r-white'></div>
    </div>
  )
}

export default ProfilePreview