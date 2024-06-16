import React, { useEffect, useState } from 'react'
import loginPageImage from '../../assets/loginPage_640.jpg'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import { Link, redirect, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signup } from '../../redux/actions/UserActions'
import Spinner from '../Common/Spinner'
import Toast from '../Common/Toast'
import { resetToast, showToast } from '../../redux/reducers/ToastReducer'

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  username: '',
  password: '',
}

function Signup() {
  const [formData, setFormData] = useState(initialState)
  const [showPassword, setShowPassword] = useState(false)
  const { status, error } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSignup = (e) => {
    e.preventDefault()
    dispatch(signup(formData)).then(result => {console.log(result)})
  }

  useEffect(() => {
    if(error) {
      dispatch(showToast({message: error, type: 'error'}))
    }
    else {dispatch(resetToast())}
  }, [error, dispatch])

  useEffect(() => {
    if(status === 'failed') {
      setFormData(initialState)
      navigate('/login')
    }
  }, [status])

  return (
    <div className='flex font-comfortaa min-h-screen'>
      <p className='md:hidden block w-fit text-2xl font-bold text-primary mb-16 absolute top-1 left-3'>snapstocks.</p>
      <section className='relative hidden w-full md:w-[40%] md:flex items-center justify-center'>
        <figure style={{ backgroundImage: `url(${loginPageImage})` }} className='-z-10 absolute object-cover inset-0'></figure>

        <div className='bg-gradient-to-tr from-green-700/10 to-indigo-700/10 backdrop-blur-md w-full h-full flex items-center justify-center'>

          <div className='w-96 h-96 border border-slate-300 bg-white/10 backdrop-blur-sm shadow-sm rounded px-6 py-4 flex flex-col justify-center items-start gap-y-6'>
            <p className='w-fit text-5xl font-bold text-gray-800'>snapstocks.</p>
            <p className='text-gray-100 text-sm text-left'>Every pixel tells a story; let our images be your storytellers.</p>
          </div>
        </div>
      </section>

      <section className='w-full md:w-[60%] flex flex-col items-center justify-center'>
        <form onSubmit={handleSignup} className='w-80 md:w-[428px] text-left'>

          <h3 className='text-3xl font-bold'>Sign Up</h3>
          <p className=' text-gray-light text-sm mt-1'>Step into the world of pixel stories.</p>

          <div className="flex flex-wrap gap-4 mt-8">

          <div className="flex flex-col basis-32 shrink grow">
            <label htmlFor="firstName" className='text-sm text-gray-dark mb-1'>First Name</label>
            <input 
              type="text" 
              name="firstName" 
              id="firstName" 
              required={true} 
              value={formData.firstName}
              onChange={(e) => setFormData(prevState => ({...prevState, firstName: e.target.value}))}
              className='rounded-lg bg-[#F6F6F4] border p-2 focus:outline-primary' 
            />
          </div>
          <div className="flex flex-col basis-32 shrink grow">
            <label htmlFor="lastName" className='text-sm text-gray-dark mb-1'>Last Name</label>
            <input 
              type="text" 
              name="lastName"
              id="lastName" 
              required={true} 
              value={formData.lastName}
              onChange={(e) => setFormData(prevState => ({...prevState, lastName: e.target.value}))}
              className='rounded-lg bg-[#F6F6F4] border p-2 focus:outline-primary' 
            />
          </div>
          </div>

          <div className="flex flex-col mt-4 w-full">
            <label htmlFor="email" className='text-sm text-gray-dark mb-1'>Email</label>
            <input 
              type="email" 
              name="email" 
              id="email" 
              required={true} 
              value={formData.email}
              onChange={(e) => setFormData(prevState => ({...prevState, email: e.target.value}))}
              className='rounded-lg bg-[#F6F6F4] border p-2 focus:outline-primary' 
            />
          </div>

          <div className="flex flex-col mt-4 w-full">
            <label htmlFor="username" className='text-sm text-gray-dark mb-1'>Username</label>
            <input 
              type="username" 
              name="username" 
              id="username" 
              required={true} 
              value={formData.username}
              onChange={(e) => setFormData(prevState => ({...prevState, username: e.target.value}))}
              className='rounded-lg bg-[#F6F6F4] border p-2 focus:outline-primary' 
            />
          </div>

          <div className="flex flex-col mt-4 w-full">
            <label htmlFor="password" className='text-sm text-gray-dark mb-1'>Password</label>

            <div className='relative m-0 p-0 pe-8 focus-within:outline focus-within:outline-primary rounded-lg bg-[#F6F6F4] border'>
              <input 
                type={showPassword ? "text" : "password"} 
                name="password" 
                id="password" 
                required={true} 
                value={formData.password}
                onChange={(e) => setFormData(prevState => ({...prevState, password: e.target.value}))}
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

            <Link to={'/login'} className='text-right text-gray-800 text-sm mt-1'>
              Already have an account? <strong className='underline'>Login</strong>
            </Link>
          </div>

          <button 
            disabled={status === 'pending'}
            className='bg-primary hover:bg-[#198670] text-gray-50 mt-8 w-80 py-2 flex items-center justify-center rounded-lg'
          >{status=== 'pending'? <Spinner height={'24px'}/> : "Submit"}</button>
        </form>
      </section>
      <Toast />
    </div>
  )
}

export default Signup