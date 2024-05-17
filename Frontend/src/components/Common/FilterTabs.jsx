import React from 'react'
import { NavLink } from 'react-router-dom';


function FilterTabs(props) {
  const {tabs, children} = props;

  return (
    <ul className='tabs border-b px-2 pt-4 mb-7 flex gap-5 items-start text-gray-dark md:px-4'> {tabs.map(item => (
      <li key={item.text}><NavLink to={item.path} end className={({ isActive }) =>
        isActive ? "flex items-center gap-1 border-b-2 pb-3 border-primary text-primary" : "flex items-center gap-1 border-b-2 pb-3 border-white text-gray-light"
      }>
        {item.icon} {item.text} <span className='hidden md:inline'>{item.count}</span>
      </NavLink></li>
      ))}

      {children}
    </ul>
  )
}

export default FilterTabs