import React from 'react'
import { NavLink } from 'react-router-dom'

function SettingNav() {
  return (
    <ul className='flex flex-col items-start gap-4 mt-5'>
      <li>
        <NavLink 
          to='/account' 
          end 
          className={({isActive}) => 
            isActive ? 'text-primary underline' : 'text-gray-light underline'
          }
          >Edit profile
        </NavLink>
      </li> 

      <li>
        <NavLink 
          to='history' 
          end 
          className={({isActive}) => 
          isActive ? 'text-primary underline' : 'text-gray-light underline'
          }
          >Download history
        </NavLink>
      </li> 

      <li>
        <NavLink 
          to='password' 
          end 
          className={({isActive}) => 
          isActive ? 'text-primary underline' : 'text-gray-light underline'
          }
          >Change password
        </NavLink>
      </li> 

      <li>
        <NavLink 
          to='close' 
          end 
          className={({isActive}) => 
          isActive ? 'text-primary underline' : 'text-gray-light underline'
          }
          >Close account
        </NavLink>
      </li> 
    </ul>
  )
}

export default SettingNav