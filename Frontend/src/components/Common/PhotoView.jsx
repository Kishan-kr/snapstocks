import React from 'react'
import Dropdown from './Dropdown'
import { IoCheckmarkCircleSharp, IoChevronDown } from 'react-icons/io5'
import { FaHeart, FaPlus } from 'react-icons/fa6'

function PhotoView() {
  const name = 'Anonymous'
  const profilePic = ''
  const hireable = true
  const image = { isLiked: true }

  return (
    <div className='flex gap-2 mb-2'>
      <div className="w-8 h-8 rounded-full border border-primary">
        <img src={profilePic} alt="" />
      </div>
      <div className="text-start flex flex-col justify-center">
        <p className="tex text-base text-gray-dark leading-3">
          {name}
        </p>
        {hireable && <p className="text-[10px] leading-4 text-blue-500 flex items-center gap-x-px">
          <span>Available for hire</span> <i className="text-xs"><IoCheckmarkCircleSharp /></i>
        </p>}
      </div>

      <div className="flex py-2 px-1 md:absolute top-1 right-0 z-20 md:hidden md:group-hover:flex">
        <button
          title="Like this image"
          className={`px-2 py-1 rounded ${image.isLiked ? 'text-primary' : 'text-gray-light'} border border-gray-light hover:text-black hover:border-black md:bg-white md:border-none`}
        >
          <FaHeart />
        </button>

        <button
          title="Add this image to a collection"
          className="px-2 py-1 mx-2 rounded text-gray-light border  border-gray-light hover:text-black hover:border-black md:bg-white md:border-none"
        >
          <FaPlus />
        </button>

        <button className="px-2 ms-auto py-0 rounded rounded-e-none text-gray-light border border-gray-light border-e-0 hover:text-black hover:border-black md:hidden">
          Download
        </button>

        <div className="md:hidden">
          <Dropdown
            toggleButton={
              <span className="py-1 px-1 border rounded rounded-s-none  text-gray-dark border-gray-light hover:border-gray-dark hover:text-black">
                <IoChevronDown />
              </span>
            }
          >
            <div>
              <ul className="py-1 text-start" role="none">
                <li
                  className="text-gray-dark block px-4 py-2 text-sm"
                  role="menuitem"
                  tabIndex="-1"
                >
                  Small <span className="text-gray-light">(640 X 920)</span>
                </li>
                <li
                  className="text-gray-dark block px-4 py-2 text-sm"
                  role="menuitem"
                  tabIndex="-1"
                >
                  Medium <span className="text-gray-light">(1920 X 920)</span>
                </li>
                <li
                  className="text-gray-dark block px-4 py-2 text-sm"
                  role="menuitem"
                  tabIndex="-1"
                >
                  Large <span className="text-gray-light">(2400 X 920)</span>
                </li>
              </ul>
              <hr />
              <ul className="py-2 text-start">
                <li
                  className="text-gray-dark block px-4 py-2 text-sm"
                  role="menuitem"
                  tabIndex="-1"
                >
                  Original <span className="text-gray-light">(640 X 920)</span>
                </li>
              </ul>
            </div>
          </Dropdown>
        </div>
      </div>
    </div>
  )
}

export default PhotoView