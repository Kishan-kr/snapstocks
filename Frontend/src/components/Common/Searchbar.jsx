import React from 'react'
import {IoSearchOutline} from 'react-icons/io5'

function Searchbar(props) {
  return (
    <form>
      <div className='flex items-center bg-slate-100 px-3 py-1 rounded-full border-2 border-slate-100 focus-within:bg-white'>
        <button type='submit' className='p-2 text-gray-light focus:text-gray-dark hover:text-gray-dark'>
        <IoSearchOutline />
        </button>
        <input className='outline-none border-none bg-transparent w-full' type="search" name="" id="" placeholder={props.placeholder} />
      </div>
    </form>
  )
}

export default Searchbar