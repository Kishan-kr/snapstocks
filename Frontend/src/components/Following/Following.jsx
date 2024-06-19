import React, { useEffect, useState } from 'react'
import Tabs from '../Common/Tabs';
import PhotosGrid from '../Common/PhotosGrid';
import Spinner from '../Common/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { resetToast, showToast } from '../../redux/reducers/ToastReducer';
import { getFolloweesImages } from '../../redux/actions/ImageAction';
import Toast from '../Common/Toast';
const items = 3

// tabs array 
const tabItems = [{
  path: '/',
  text: 'Editorial'
}, {
  path: '/following',
  text: 'Following'
}]

function Following() {
  const { images, page, error, status } = useSelector(state => state.followeesImages)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!page)
      dispatch(getFolloweesImages({ items }))
  }, [])

  useEffect(() => {
    if (error && status === 'failed') {
      dispatch(showToast({ message: error, type: 'error' }))
    }
    else {
      dispatch(resetToast())
    }
  }, [error, dispatch])

  const handleLoadMore = () => {
    console.log('page: ', page) //test
    dispatch(getFolloweesImages({ items, page: page + 1 }))
  }

  let imagesArea = null
  if (status === 'pending') { 
    imagesArea = <div className='text-center mb-8 mt-36'><Spinner variant={'green'} /></div>
  }
  else if (status === 'completed' && !images.length) {
    imagesArea = <p className='px-2 text-gray-light text-xl max-w-[460px] text-wrap text-center mb-8 mt-16'>It looks like there are no images from the people you follow. Start following more users to see their updates here!</p>
  }
  else {
    imagesArea = <PhotosGrid images={images} />
  } 

  let loadMoreButton = null

  if (status === 'pending_next') {
    loadMoreButton = <div className='text-center mb-8'><Spinner variant={'green'} /></div>
  }
  else if (status === 'completed' && images.length) {
    loadMoreButton = <button
      className='px-3 py-2 mb-8 border border-green-300 bg-green-50 rounded-md text-primary hover:border-green-400 hover:text-green-700 hover:shadow disabled:border-gray-300 disabled:text-gray-300 disabled:shadow-none'
      onClick={handleLoadMore}
      disabled={images.length < items * page}
    >Load more</button>
  }

  return (
    <>
      <Tabs items={tabItems} />
      <div className='flex flex-col items-center justify-center gap-y-4 pt-8'>
        {imagesArea}
        {loadMoreButton}
      {/* {status === 'pending' ?
        <div className='text-center mt-8'><Spinner variant={'green'} /></div> :
        status === 'completed' ?
            <PhotosGrid images={images} />

            {status === 'pending_next' ?
              <div className='text-center mb-8'><Spinner variant={'green'} /></div> :
              <button
                className='px-3 py-2 mb-8 border border-green-300 bg-green-50 rounded-md text-primary hover:border-green-400 hover:text-green-700 hover:shadow'
                onClick={handleLoadMore}
              >Load more</button>
            }
          </div> : null
      } */}
      </div>
      <Toast />
    </>
  )
}

export default Following