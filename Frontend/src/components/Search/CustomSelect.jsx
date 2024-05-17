import React, { useEffect, useRef, useState } from 'react';
import { IoChevronDown } from "react-icons/io5";

const CustomSelect = (props) => {
  const { filterName, filterId, filterIcon, options, onSelect } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState();
  const container = useRef();

  const handleSelectChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
    onSelect(value);
  };

  const toggleMenu = () => {
    setIsOpen(prevState => (!prevState))
  };

  const handleClickOutside = (e) => {
    if (container.current && !container.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  // attaches an eventListener to listen when componentDidMount
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    // set default option 
    setSelectedOption(options[0].value);
    // optionally returning a func in useEffect runs like componentWillUnmount to cleanup
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={container} className="relative inline-block text-left">
      <button className='px-3 flex gap-2 items-center py-1 text-gray-light border rounded-md focus:border-gray-400' onClick={toggleMenu}>
        {filterIcon}
        <span>{filterName}</span>
        <span className='w-16 text-start overflow-x-hidden text-gray-dark'>{selectedOption}</span>
        <IoChevronDown />
      </button>

      <ul className={`select-menu ${isOpen ? 'show' : 'hide'} absolute w-full bg-white border shadow-lg rounded-md mt-1 py-2 top-full right-0 origin-top-right z-50`}>{
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
            <label className='block py-1' htmlFor={option.value}>{option.label}</label>
          </li>
        ))}
      </ul>

    </div>
  );
};

export default CustomSelect;
