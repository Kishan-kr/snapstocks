import React, { useState } from 'react'
import PhotosGrid from '../Common/PhotosGrid'
import FilterModal from './FilterModal'
import { BsSliders2 } from "react-icons/bs";
import { useOutletContext } from 'react-router-dom';

function SearchPhotos() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const breakpoint = 768;
  const [screenWidth] = useOutletContext();

  const openModal = () => { 
    setIsModalOpen(true);
  }
  const dismissModal = () => {
    setIsModalOpen(false);
  }
  
  return (
    <div>
      <PhotosGrid />
      {screenWidth < breakpoint && <button 
        className='fixed left-1/2 -translate-x-1/2 bottom-3 border rounded-md px-3 py-0 inline-flex items-center gap-2 bg-white text-gray-dark' 
        onClick={openModal}
        >
        <BsSliders2/>
        Filters
      </button>}
      {screenWidth < breakpoint && <FilterModal isOpen={isModalOpen} onClose={dismissModal}/>}

    </div>
  )
}

export default SearchPhotos