import React, { useEffect, useState } from 'react'
import logo from '../../snapstocks-bg.svg';
import Searchbar from './Searchbar';
import Dropdown from './Dropdown';
import Toast from './Toast'
import { HiBars3CenterLeft } from 'react-icons/hi2'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/actions/UserActions';
import { showToast } from '../../redux/reducers/ToastReducer';

function Navbar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loggedIn, profilePic, username, error, status } = useSelector(state => state.user);
  const handleLogout = () => {
    dispatch(logout())
  }

  useEffect(() => {
    if(error && status === 'failed') {
      dispatch(showToast({message: error, type: 'error'}))
    }
    else if(status === 'completed') {
      navigate('/', {replace: true})
      dispatch(showToast({message: 'successfully logged out', type: 'success'}))
    }
  }, [error, status])

  return (
    <nav className=''>
      <ul className='flex list-none items-center gap-2 p-2 md:px-4'>
        <li className='w-36 overflow-hidden'>
          <Link to={'/'}>
          <img className='object-cover' src={logo} alt="snapstocks" />
          </Link>
        </li>

        <li className='w-full'><Searchbar placeholder='Search images' /></li>

        <li className='hidden text-primary border border-primary rounded-md px-3 py-1  whitespace-nowrap hover:bg-primary hover:text-white md:inline'>
          <Link to={'/upload'}>Submit a photo</Link>
        </li>

        {loggedIn ? <Dropdown 
            toggleButton={<span className='w-8 h-8 aspect-square rounded-full border'> <img src={profilePic} alt="" /> </span>}>
            <div className='w-48'>
              <ul className="py-1 px-2 text-start" role="none">
                <li><Link to={username} className="text-gray-light block px-4 py-2 text-sm hover:text-gray-dark" role="menuitem" tabIndex="-1">View profile</Link></li>
                {/* <li><Link to="/" className="text-gray-light block px-4 py-2 text-sm hover:text-gray-dark" role="menuitem" tabIndex="-1">Stats</Link></li> */}
                <li><Link to="/" className="text-gray-light block px-4 py-2 text-sm hover:text-gray-dark" role="menuitem" tabIndex="-1">Account settings</Link></li>
                <li><button onClick={handleLogout} className="text-gray-light block px-4 py-2 text-sm hover:text-gray-dark" role="menuitem" tabIndex="-1">Logout</button></li>
              </ul>
              {/* <hr /> */}
              {/* <ul className='py-1 px-2 text-start'> */}
                {/* <li><Link to="/" className="text-gray-light block px-4 py-2 text-sm hover:text-gray-dark" role="menuitem" tabIndex="-1">Logout</Link></li> */}
              {/* </ul> */}
            </div>
          </Dropdown> :
          <li className='hidden md:block'>
            <Link to="/login" className='text-gray-light text rounded-md border border-gray-light px-3 py-[6px] hover:text-gray-dark'>Login</Link>
          </li>}

        <li>
          <Dropdown 
            toggleButton={<span className='px-1 py-1 text-2xl'> <HiBars3CenterLeft /></span>}>
            <div className='w-52'>
              <ul className="py-1" role="none">
                <li><Link to="/" className="text-gray-light block px-4 py-2 text-sm hover:text-gray-dark" role="menuitem" tabIndex="-1">About</Link></li>
                <li><Link to="/" className="text-gray-light block px-4 py-2 text-sm hover:text-gray-dark" role="menuitem" tabIndex="-1">Contact us</Link></li>
                <li><Link to="/" className="text-gray-light block px-4 py-2 text-sm hover:text-gray-dark" role="menuitem" tabIndex="-1">Privace policy</Link></li>
                <li><Link to="/" className="text-gray-light block px-4 py-2 text-sm hover:text-gray-dark" role="menuitem" tabIndex="-1">Terms</Link></li>
              </ul>
              <hr className={`${loggedIn? 'md:hidden': ''}`}/>
              <div className={`py-3 ${loggedIn? 'md:py-0': ''}`}>
              <div className='flex gap-2 items-center justify-center '>
                <li className='text-primary border border-primary rounded-md px-3 py-1 text-sm hover:bg-primary hover:text-white md:hidden'><Link to={'/upload'}>Submit a photo</Link></li>
                {!loggedIn && <li className='text-gray-light border border-gray-light rounded-md px-4 py-1 text-sm hover:text-gray-dark md:hidden'><Link to={'/login'}>Login</Link></li>}
              </div>
              {!loggedIn && <div className='text-gray-light text-sm px-2 my-1 mt-2'><span>New to snapstocks? </span><Link to={'/signup'} className='underline'>Sign up</Link></div>}

              </div>
            </div>
          </Dropdown>
        </li>
      </ul>
      <Toast/>
    </nav>
  )
}

export default Navbar