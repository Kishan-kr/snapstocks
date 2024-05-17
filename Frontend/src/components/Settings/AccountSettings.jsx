import React from 'react'
import SettingNav from './SettingNav'
import { Outlet } from 'react-router-dom'

function AccountSettings() {
  return (
    <div className='grid grid-cols-12 gap-y-12 py-2 pt-8 px-2 md:px-4 md:pt-12'>
      <div className='col-span-12 md:col-span-3'>
        <h3 className='text-start font-bold text-lg'>Account settings</h3>
        <SettingNav />
      </div>
      <div className='col-span-12 md:col-span-9'>
        <Outlet />
      </div>
    </div>
  )
}

export default AccountSettings