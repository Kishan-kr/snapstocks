import React, { useEffect } from 'react'
import PhotosGrid from '../Common/PhotosGrid'
import Spinner from '../Common/Spinner'
import { useOutletContext } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getImages } from '../../redux/actions/DashboardAction'
import { showToast } from '../../redux/reducers/ToastReducer'
const items = 5

function UserPhotos() {
  const [userid] = useOutletContext()
  const dispatch = useDispatch()
  const { data, status, error, page } = useSelector(state => state.dashboard.images)

  useEffect(() => {
    if(userid)
      dispatch(getImages({ userid, items }))
  }, [userid])

  useEffect(() => {
    if (error && status === 'failed') {
      dispatch(showToast({ message: error, type: 'error' }))
    }
  }, [error, status])

  const handleLoadMore = () => {
    dispatch(getImages({ userid, items, page: page + 1 }))
  }

  let imagesArea = null
  if (status === 'pending') {
    imagesArea = <div className='text-center my-16'><Spinner variant={'green'} /></div>
  }
  else if (status === 'completed' && !data.length) {
    imagesArea = <p className='px-2 text-gray-light text-xl max-w-[460px] text-wrap text-center my-16'>It looks like there are no images user has uploaded!</p>
  }
  else {
    imagesArea = <PhotosGrid images={data} />
  }

  let loadMoreButton = null

  if (status === 'pending_next') {
    loadMoreButton = <div className='text-center mb-8'><Spinner variant={'green'} /></div>
  }
  else if (status === 'completed' && data.length) {
    loadMoreButton = <button
      className='px-3 py-2 mb-8 border border-green-300 bg-green-50 rounded-md text-primary hover:border-green-400 hover:text-green-700 hover:shadow disabled:border-gray-300 disabled:text-gray-300 disabled:shadow-none'
      onClick={handleLoadMore}
      disabled={data.length < items * page}
    >Load more</button>
  }

  return (
    <div className='flex flex-col items-center'>
      {imagesArea}
      {loadMoreButton}
    </div>
  )
}

export default UserPhotos