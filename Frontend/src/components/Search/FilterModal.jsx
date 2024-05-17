import React, { useEffect, useState } from 'react';
import { HiMiniChevronUpDown, HiOutlineSquares2X2 } from 'react-icons/hi2';
import { IoCloseSharp } from "react-icons/io5";

export const SelectMenu = (props) => {
  const { filterName, filterId, filterIcon, options, onSelect } = props;
  const [selectedOption, setSelectedOption] = useState('');

  const handleSelectChange = (event) => {
    console.log('select change')
    const value = event.target.value;
    setSelectedOption(value);
    onSelect(value);
  };

  // set default option
  useEffect(() => {
    setSelectedOption(options[0].value);
  }, []);

  return (
    <div className='my-2 pb-4 border-b'>
      <p className='flex items-center gap-2'>{filterIcon} {filterName}</p>
      <ul className={` mt-1 py-2 text-start`}>{
        options.map((option) => (
          <li key={option.value} className={`px-2 ${selectedOption === option.value ? 'bg-gray-200' : 'hover:bg-gray-100'}`}>
            <input
              type='radio'
              name={filterId}
              id={option.value}
              value={option.value}
              onChange={handleSelectChange}
              className='hidden'
            />
            <label className='block py-1 ps-5' htmlFor={option.value}>{option.label}</label>
          </li>
        ))}
      </ul>
    </div>
  )
}

const FilterModal = ({ isOpen, onClose }) => {
  const [selectOrientation, setSelectOrientation] = useState('all');
  const [selectSortBy, setSelectSortBy] = useState('relevance')

  const handleOrientation = (selectedValue) => {
    setSelectOrientation(selectedValue);
  };

  const handleSortBy = (selectedValue) => {
    setSelectSortBy(selectedValue);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex">
          <div className="p-8 bg-white max-h-screen w-full max-w-screen flex-col flex rounded shadow-md sm:max-w-[calc(100vw-8rem)] sm:m-auto sm:h-[calc(100vh-8rem)]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Filters</h2>
              <button className='text-2xl text-gray-light md:absolute top-3 left-3 md:text-white' onClick={onClose}>
                <IoCloseSharp />
              </button>
            </div>
            <hr className="border-t" />

            <div className="mb-4">
              <SelectMenu
                key={'orientaion'}
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
              <SelectMenu 
                key={'sort'}
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
            </div>

            <hr className="border-t mt-auto" />

            <div className="flex justify-center mt-4">
              <button
                className="w-full px-4 py-2 mr-2 bg-gray-300 hover:bg-gray-400 rounded"
                onClick={() => {
                  // Handle 'Clear' button click
                }}
              >
                Clear
              </button>
              <button
                className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FilterModal;
