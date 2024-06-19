import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getLikedImages } from '../../redux/actions/DashboardAction'
import { showToast } from '../../redux/reducers/ToastReducer'
import Spinner from '../Common/Spinner'
import PhotosGrid from '../Common/PhotosGrid'
import { useOutletContext } from 'react-router-dom'
const items = 5

function UsersLikes() {
  const [userid] = useOutletContext()
  const dispatch = useDispatch()
  const { data, status, error, page } = useSelector(state => state.dashboard.likedImages)

  useEffect(() => {
    if(userid)
      dispatch(getLikedImages({ userid, items }))
  }, [userid])

  useEffect(() => {
    if (error && status === 'failed') {
      dispatch(showToast({ message: error, type: 'error' }))
    }
  }, [error, status])

  const handleLoadMore = () => {
    dispatch(getLikedImages({ userid, items, page: page + 1 }))
  }

  let imagesArea = null
  if (status === 'pending') {
    imagesArea = <div className='text-center my-16'><Spinner variant={'green'} /></div>
  }
  else if (status === 'completed' && !data.length) {
    imagesArea = <p className='px-2 text-gray-light text-xl max-w-[460px] text-wrap text-center my-16'>It looks like there are no images user has liked!</p>
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

export default UsersLikes