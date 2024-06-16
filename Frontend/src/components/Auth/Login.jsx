import React, { useEffect, useState } from 'react'
import loginPageImage from '../../assets/loginPage_640.jpg'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { resetToast, showToast } from '../../redux/reducers/ToastReducer';
import Spinner from '../Common/Spinner';
import { login } from '../../redux/actions/UserActions';
import Toast from '../Common/Toast';

const initialState = {
  email: '',
  password: ''
}

function Login() {
  const [formData, setFormData] = useState(initialState)
  const [showPassword, setShowPassword] = useState(false)
  const { loggedIn, error, status } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (error) {
      dispatch(showToast({ message: error, type: 'error' }))
    }
    else {
      dispatch(resetToast())
    }
  }, [error, dispatch])

  useEffect(() => {
    if (status === 'completed' && loggedIn) {
      setFormData(initialState)
      navigate('/')
    }
  }, [status, loggedIn, navigate])

  const handleSubmit = (e) => {
    e.preventDefault()

    dispatch(login(formData))
  }

  return (
    <div className='flex font-comfortaa min-h-screen'>
      <form onSubmit={handleSubmit} className='w-full md:w-1/2 flex flex-col items-center justify-center'>

        <p className='md:hidden w-fit text-2xl font-bold text-primary mb-16 absolute top-1 left-3'>snapstocks.</p>
        <div className='w-80 text-left'>

          <h3 className='text-2xl'>Hello, <strong>Welcome back!</strong></h3>
          <p className=' text-gray-light text-sm mt-1'>We're happy to see you again.</p>

          <div className="flex flex-col mt-10 w-80">
            <label htmlFor="email" className='text-sm text-gray-dark mb-1'>Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData(prevState => ({ ...prevState, email: e.target.value }))}
              className='rounded-lg bg-[#F6F6F4] border p-2 focus:outline-primary'
            />
          </div>

          <div className="flex flex-col mt-6 w-80">
            <label htmlFor="password" className='text-sm text-gray-dark mb-1'>Password</label>

            <div className='relative m-0 p-0 pe-8 focus-within:outline focus-within:outline-primary rounded-lg bg-[#F6F6F4] border'>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                value={formData.password}
                onChange={(e) => setFormData(prevState => ({ ...prevState, password: e.target.value }))}
                className='w-full rounded-lg bg-[#F6F6F4] p-2 outline-none'
              />
              <button
                type='button'
                className='absolute right-2 top-1/2 -translate-y-1/2'
                onClick={() => setShowPassword(prevState => !prevState)}
              >
                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </button>
            </div>

            <Link to={'/signup'} className='text-right hover:underline text-gray-800 text-sm font-semibold mt-1'>Forgot password?</Link>
          </div>

          <button 
            disabled={status === 'pending'}
            className='bg-primary hover:bg-[#198670] text-gray-50 mt-8 w-80 py-2 rounded-lg'
          >{status === 'pending'? <Spinner height={'24px'} /> : "Submit"}</button>
        </div>
      </form>
      <section className='hidden md:flex w-1/2 relative'>
        <figure className='w-full h-full object-cover absolute inset-0' style={{ backgroundImage: `url(${loginPageImage})` }}>

          <div className='w-full h-full bg-gradient-to-b from-black/30 to-black/90 flex flex-col items-center justify-center gap-y-6'>
            <p className='w-fit text-4xl font-bold text-gray-100'>snapstocks.</p>
            <p className='text-gray-100 text-sm'>Every pixel tells a story; let our images be your storytellers.</p>
          </div>
        </figure>
      </section>
      <Toast />
    </div>
  )
}

export default Login