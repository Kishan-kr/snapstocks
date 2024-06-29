import React from "react";
import Masonry from "react-masonry-css";
import { FaHeart } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { IoChevronDown, IoArrowDown, IoCheckmarkCircleSharp } from "react-icons/io5";
import Dropdown from "./Dropdown";
import { Link } from "react-router-dom";
import Tooltip from "./Tooltip";
import ProfilePreview from "./ProfilePreview";

const images = [
  {
    user: {firstName: 'kishan', lastName: 'kumar', username: 'kishankumar', profilePic: ''}, imageUrl: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&q=80&w=800",
    width: 800,
  },
  {
    user: {firstName: 'kishan', lastName: 'kumar', username: 'kishankumar', profilePic: ''}, imageUrl: "https://images.unsplash.com/photo-1699794369704-bfdaa57cd8df?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHx8",
    width: 400,
  },
  {
    user: {firstName: 'kishan', lastName: 'kumar', username: 'kishankumar', profilePic: ''}, imageUrl: "https://images.unsplash.com/photo-1476657680631-c07285ff2581?auto=format&fit=crop&q=80&w=600",
    width: 600,
  },
  {
    user: {firstName: 'kishan', lastName: 'kumar', username: 'kishankumar', profilePic: ''}, imageUrl: "https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?auto=format&fit=crop&q=80&w=960",
    width: 960,
  },
  {
    user: {firstName: 'kishan', lastName: 'kumar', username: 'kishankumar', profilePic: ''}, imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=740",
    width: 740,
  },
  {
    user: {firstName: 'kishan', lastName: 'kumar', username: 'kishankumar', profilePic: ''}, imageUrl: "https://images.unsplash.com/photo-1535965128466-31ce8adc78ea?auto=format&fit=crop&q=80&w=420",
    width: 420,
  },
  {
    user: {firstName: 'kishan', lastName: 'kumar', username: 'kishankumar', profilePic: ''}, imageUrl: "https://images.unsplash.com/photo-1557862921-37829c790f19?auto=format&fit=crop&q=80&w=560",
    width: 560,
  },
  {
    user: {firstName: 'kishan', lastName: 'kumar', username: 'kishankumar', profilePic: ''}, imageUrl: "https://images.unsplash.com/photo-1525875975471-999f65706a10?auto=format&fit=crop&q=80&w=400",
    width: 400,
  },
  {
    user: {firstName: 'kishan', lastName: 'kumar', username: 'kishankumar', profilePic: ''}, imageUrl: "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?auto=format&fit=crop&q=80&w=800",
    width: 800,
  },
  {
    user: {firstName: 'kishan', lastName: 'kumar', username: 'kishankumar', profilePic: ''}, imageUrl: "https://images.unsplash.com/photo-1507426946714-15f08a43d39e?auto=format&fit=crop&q=80&w=960",
    width: 960,
  },
];

function Photo({ image }) {
  let name = image.user?.firstName + ' ' + image.user?.lastName
  const {username, hireable, profilePic} = image.user

  return (
    <figure className="group relative mb-10 z-0 md:mb-4 md:text-xl">
      <div className="hidden absolute h-full w-full inset-0 z-10 bg-transparent md:rounded-md md:block group-hover:bg-gray-950/40 "></div>

      <div className="flex gap-2 mb-2 px-2 md:px-3 md:absolute bottom-1 z-30 md:hidden md:group-hover:flex">
        <Tooltip
          content={
            <ProfilePreview
              user={{ name, username, hireable }}
            />
          }
        >
          <Link
            to={`/${username}`}
            className="flex gap-2 mb-2"
          >
            <div className="w-8 h-8 rounded-full border border-primary">
              <img src={profilePic} alt="" />
            </div>

            <div className="text-start flex flex-col justify-center">
              <p className="tex text-base text-gray-dark leading-3 md:text-slate-100">
                {name}
              </p>
              {hireable && <p className="text-[10px] leading-4 text-gray-light md:text-slate-300 flex items-center gap-x-px">
                <span>Available for hire</span> <i className="text-xs"><IoCheckmarkCircleSharp /></i>
              </p>}
            </div>
          </Link>
        </Tooltip>
      </div>

      <div className="hidden absolute p-2 px-3 bottom-1 right-0 z-20 md:group-hover:inline">
        <button
          title="Download this image"
          className="px-2 py-1 rounded text-gray-light border border-none md:bg-white hover:text-black"
        >
          <IoArrowDown />
        </button>
      </div>

      <img
        src={image.imageUrl}
        alt=""
        className="md:rounded-md w-full h-full object-cover z-20 "
      />

      <div className="flex py-2 px-1 md:absolute top-1 right-0 z-20 md:hidden md:group-hover:flex">
        <button
          title="Like this image"
          className={`px-2 py-1 rounded ${image.isLiked? 'text-primary': 'text-gray-light'} border border-gray-light hover:text-black hover:border-black md:bg-white md:border-none`}
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
    </figure>
  );
}

function PhotosGrid({images}) {
  const breakpoints = {
    default: 3,
    992: 2,
    768: 1,
  };



  return (
    <section>
      <Masonry
        className="masonry-grid md:gap-5 md:mx-5"
        breakpointCols={breakpoints}
        columnClassName="masonry-grid-col"
      >
        {images.map((image) => (
          <Photo image={image} key={image._id} />
        ))}
      </Masonry>
    </section>
  );
}

export default PhotosGrid;
