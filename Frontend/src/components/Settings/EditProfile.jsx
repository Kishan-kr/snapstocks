import React from 'react'
import TagsField from '../Common/TagsField'
import InputGroup from '../Common/InputGroup'
import { MdOutlineAlternateEmail } from "react-icons/md";

function Profile(props) {

  return (
    <fieldset>
      <legend className='font-semibold text-lg text-left'>Edit profile</legend>
      <div className='grid grid-cols-3 gap-8 mt-8 md:flex-row'>
        <div className='col-span-3 md:col-span-1'>
          <div className='mx-auto w-36 h-36 rounded-full overflow-hidden'>
            <img src="" alt="" className='w-36 h-36 rounded-full border' />
          </div>
        </div>
        <div className='col-span-3 flex flex-wrap w-full gap-6 md:col-span-2'>
          <div className="flex flex-col items-start gap-2 basis-72 grow shrink">
            <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-light">First name</label>
            <input type="text" maxLength='30' name="first-name" id="first-name" autoComplete="given-name" className="block w-full rounded-md border-0 px-2 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset-1 focus:outline-none focus:ring-gray-dark sm:text-sm sm:leading-6" />
          </div>
          <div className="flex flex-col items-start gap-2 basis-72 grow shrink">
            <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-light">Last name</label>
            <input type="text" maxLength='30' name="last-name" id="last-name" autoComplete="given-name" className="block w-full rounded-md border-0 px-2 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset-1 focus:outline-none focus:ring-gray-dark sm:text-sm sm:leading-6" />
          </div>
          <div className="flex flex-col items-start gap-2  w-full">
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-light">Email address</label>
            <input id="email" name="email" type="email" autoComplete="email" className="block w-full rounded-md border-0 px-2 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset-1 focus:outline-none focus:ring-gray-dark sm:text-sm sm:leading-6" />
          </div>
          <div className="flex flex-col items-start gap-2  w-full">
            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-light">Username</label>
            <input id="username" name="username" type="text" autoComplete='off' className="block w-full rounded-md border-0 px-2 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset-1 focus:outline-none focus:ring-gray-dark sm:text-sm sm:leading-6" />
          </div>
        </div>
      </div>
    </fieldset>
  )
}

function About(props) {

  return (
    <fieldset className='mt-8'>
      <legend className='font-semibold text-lg text-left'>About</legend>
      <div className='flex flex-wrap w-full gap-6 mt-6'>
        <div className="flex flex-col items-start gap-2 basis-96 grow shrink">
          <label htmlFor="about-location" className="block text-sm font-medium leading-6 text-gray-light">Location</label>
          <input type="text" name="about-location" id="about-location" autoComplete="location" className="block w-full rounded-md border-0 px-2 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset-1 focus:outline-none focus:ring-gray-dark sm:text-sm sm:leading-6" />
        </div>
        <div className="flex flex-col items-start gap-2 basis-96 grow shrink">
          <label htmlFor="about-site" className="block text-sm font-medium leading-6 text-gray-light">Personal site/portfolio</label>
          <input type="url" name="about-site" id="about-site" autoComplete="url" placeholder='https://' className="block w-full rounded-md border-0 px-2 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset-1 focus:outline-none focus:ring-gray-dark sm:text-sm sm:leading-6" />
        </div>
        <div className="flex flex-col items-start gap-2 basis-96 grow shrink w-full">
          <label htmlFor="about-bio" className="block text-sm font-medium leading-6 text-gray-light">Bio</label>
          <textarea id="about-bio" name="about-bio" autoComplete="bio" rows='4' maxLength='250' className="block w-full rounded-md border-0 px-2 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset-1 focus:outline-none focus:ring-gray-dark sm:text-sm sm:leading-6" />
        </div>
        <div className="flex flex-col items-start gap-2 basis-96 grow shrink w-full">
          <TagsField
            id='interest'
            label={<label htmlFor='interest' className="block text-sm font-medium leading-6 text-gray-light">Interests <span className='text-gray-400'>(maximum 5)</span></label>}
          />
        </div>
      </div>
    </fieldset>
  )
}

function Socials(props) {

  return (
    <fieldset className='mt-8'>
      <legend className='font-semibold text-lg text-left'>Socials</legend>
      <div className='flex flex-wrap w-full gap-6 mt-6'>

        <div className='flex flex-col items-start gap-2 basis-96 grow shrink'>
          <label htmlFor="update-instagram" className="block text-sm font-medium leading-6 text-gray-light">Bio</label>
          <div class="relative">
            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <span class=" text-gray-dark sm:text-sm">
                <MdOutlineAlternateEmail />
              </span>
            </div>
            <input
              type="text"
              name="instagram"
              id="update-instagram"
              className="block w-full rounded-md border-0 pl-8 pr-2 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset-1 focus:outline-none focus:ring-gray-dark sm:text-sm sm:leading-66"
            />
          </div>
        </div>

        <div class="relative flex flex-col items-start gap-2 basis-96 grow shrink">
          <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span class=" text-gray-dark sm:text-sm">
              <MdOutlineAlternateEmail />
            </span>
          </div>
          <input
            type="text"
            name="instagram"
            id="update-instagram"
            className="block w-full rounded-md border-0 pl-8 pr-2 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset-1 focus:outline-none focus:ring-gray-dark sm:text-sm sm:leading-66"
          />
        </div>
      </div>
    </fieldset>
  )
}

function EditProfile() {
  return (
    <form onSubmit={(e) => { e.preventDefault() }}>
      <Profile />
      <About />
      <Socials />

      <input type='submit' value={'submit'} />
    </form>
  )
}

export default EditProfile