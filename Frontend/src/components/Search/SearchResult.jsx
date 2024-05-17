import React, { useEffect, useState } from 'react'
import FilterTabs from '../Common/FilterTabs'
import CustomSelect from './CustomSelect';
import { Outlet, useLocation } from 'react-router-dom'
import { FaRegImage } from "react-icons/fa6";
import { RiFolderImageLine } from "react-icons/ri";
import { HiMiniUsers } from "react-icons/hi2";
import { HiOutlineSquares2X2, HiMiniChevronUpDown } from "react-icons/hi2";

function SearchResult() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const breakpoint = 768;
  const location = useLocation();
  const pathname = location.pathname;

  // states to manage selectMenu 
  const [selectOrientation, setSelectOrientation] = useState('all');
  const [selectSortBy, setSelectSortBy] = useState('relevance')

  // tabs array 
  const filterItems = [
    {
      path: '/search/photos',
      text: 'Photos',
      icon: <FaRegImage />,
      count: 25
    },
    {
      path: '/search/collections',
      text: 'Collections',
      icon: <RiFolderImageLine />,
      count: 10
    },
    {
      path: '/search/users',
      text: 'Users',
      icon: <HiMiniUsers />,
      count: 4
    },
  ]

  // method to update orientation selectMenu 
  const handleOrientation = (selectedValue) => {
    setSelectOrientation(selectedValue);
  };

  // method to update sortBy selectMenu 
  const handleSortBy = (selectedValue) => {
    setSelectSortBy(selectedValue);
  };

  useEffect(() => {
    console.log(pathname);
    const handleResizeWindow = () => { setScreenWidth(window.innerWidth) }

    // subsribe to window resize event 
    window.addEventListener('resize', handleResizeWindow);
    console.log(screenWidth)

    // unsubscribe to window resize event 
    return () => { window.removeEventListener('resize', handleResizeWindow) }

  })

  return (
    <div className='pb-4'>
      <FilterTabs tabs={filterItems} >{
        screenWidth >= breakpoint && pathname.includes('/search/photos') &&
        <>
        <li className='ms-auto hidden md:inline'>
          <CustomSelect
            filterId='orientation'
            filterName='Orientation'
            filterIcon={<HiOutlineSquares2X2 />}
            options={[
              { label: 'All', value: 'all' },
              { label: 'Landscape', value: 'landscape' },
              { label: 'Portrait', value: 'portrait' },
            ]}
            onSelect={handleOrientation}
          />
        </li>
        <li className='hidden md:inline'>
          <CustomSelect
            filterId='sort'
            filterName='Sort by'
            filterIcon={<HiMiniChevronUpDown />}
            options={[
              { label: 'Relevance', value: 'relevance' },
              { label: 'Newest', value: 'newest' },
              { label: 'Curated', value: 'curated' },
            ]}
            onSelect={handleSortBy}
          />
        </li>
        </>
      }</FilterTabs>
      <h4 className='font-bold text-gray-900 text-2xl text-start px-2 md:px-4 mb-8'>Searched keyword </h4>
      <Outlet context={[screenWidth]} />
    </div>
  )
}

export default SearchResult