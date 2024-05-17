import React from 'react'
import { Link } from 'react-router-dom';

function UserProfile(props) {
  const { name, username, hireable } = props.user;

  return (
    <div className='flex flex-col gap-y-6 p-3 text-start border rounded-md basis-full md:basis-[calc(50%-12px)] slg:basis-[calc(33.33%-16px)] hover:border-gray-500'>
      <div className="flex items-center gap-3">
        <Link to={''} className='flex items-center gap-3 w-full'>
          <div className="w-14 h-14 rounded-full overflow-hidden border border-indigo-500">
            <img src="" alt="" />
          </div>
          <div className="flex flex-col">
            <p className="text-black font-semibold text-lg leading-5">{name}</p>
            <p className="text-gray-light text-base">{username}</p>
          </div>
        </Link>
        {hireable && <button className='rounded px-2 py-1 bg-blue-500 text-slate-100 text-sm ms-auto hover:bg-blue-600'>Hire</button>}
      </div>
      <Link to={''} className="flex gap-1 items-center aspect-[37/9]">
        <div className='aspect-[4/3] bg-gray-100 h-full'>
          <img src="" alt="" />
        </div>
        <div className='aspect-[4/3] bg-gray-100 h-full'>
          <img src="" alt="" />
        </div>
        <div className='aspect-[4/3] bg-gray-100 h-full'>
          <img src="" alt="" />
        </div>
      </Link>
      <Link to={''} className='border rounded w-full text-gray-light text-center py-1 hover:text-gray-dark hover:border-gray-500'>View profile</Link>
    </div>
  )
}

export default UserProfile