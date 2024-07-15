import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  getUserCollections } from '../../redux/actions/DashboardAction'
import { showToast } from '../../redux/reducers/ToastReducer'
import Spinner from '../Common/Spinner'
import { useOutletContext } from 'react-router-dom'
import CollectionsGrid from '../Common/CollectionsGrid'

function UserCollections() {
  const [userid] = useOutletContext()
  const dispatch = useDispatch()
  const { data, status, error } = useSelector(state => state.dashboard.collections)

  useEffect(() => {
    if(userid)
      dispatch(getUserCollections({ userid }))
  }, [userid])

  useEffect(() => {
    if (error && status === 'failed') {
      dispatch(showToast({ message: error, type: 'error' }))
    }
  }, [error, status])


  let content = null
  if (status === 'pending') {
    content = <div className='flex flex-col items-center'>
      <div className='text-center my-16'><Spinner variant={'green'} /></div>
    </div>
  }
  else if (status === 'completed' && !data.length) {
    content = <div className='flex flex-col items-center'>
      <p className='px-2 text-gray-light text-xl max-w-[460px] text-wrap text-center my-16'>It looks like there are no collections user has created!</p>
    </div>
  }
  else {
    content = <CollectionsGrid collectionsArray={data} />
  }

  return ( content )
}

export default UserCollections