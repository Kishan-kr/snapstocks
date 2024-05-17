import React from 'react'

function InputGroup(props) {
  const { label, id, icon, inputValue, handleInputChange } = props;

  return (
    <div className="flex flex-col items-start gap-2 basis-96 grow shrink">
      {label}
      <div className='flex '>
        {icon}
        <input 
          type="text"  
          name={id} 
          id={id} 
          className='block w-full rounded-md border-0 px-2 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset-1 focus:outline-none focus:ring-gray-dark sm:text-sm sm:leading-6'
          value={inputValue}
          onChange={handleInputChange}
        />
      </div>
    </div>
  )
}

export default InputGroup