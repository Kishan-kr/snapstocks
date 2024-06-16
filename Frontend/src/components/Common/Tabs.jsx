import React from 'react'
import { NavLink } from 'react-router-dom'

function Tabs({items}) {
  return (
    <nav className='tabs border-b px-2 pt-4 flex gap-4 text-gray-dark md:px-4'> {items.map(item => (
      <NavLink key={item.path} to={item.path} className={({ isActive }) =>
        isActive ? "border-b-2 pb-3 border-primary text-primary" : "border-b-2 pb-3 border-white text-gray-light"
      }>
        {item.text}
      </NavLink>
    ))}
    </nav>
  )
}

export default Tabs