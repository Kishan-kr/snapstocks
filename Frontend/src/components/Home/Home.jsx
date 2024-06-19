import React, { useEffect, useState } from 'react'
import Tabs from '../Common/Tabs'
import Hero from './Hero';
import PhotosGrid from '../Common/PhotosGrid';
import TagsField from '../Common/TagsField';
import { useDispatch, useSelector } from 'react-redux';
import Toast from '../Common/Toast';
import { showToast, resetToast } from '../../redux/reducers/ToastReducer';
import Spinner from '../Common/Spinner';
import { getLatestImages } from '../../redux/actions/ImageAction';
const items = 5

function Home() {
  const { loggedIn } = useSelector(state => state.user);
  const { images, page, error, status } = useSelector(state => state.images);
  const dispatch = useDispatch()

  // tabs array 
  const tabItems = [{
    path: '/',
    text: 'Editorial'
  }]

  // Show Following tab if user is logged in 
  if (loggedIn) {
    tabItems.push({
      path: '/following',
      text: 'Following'
    })
  }

  useEffect(() => {
    if(!page)
      dispatch(getLatestImages({items}))
  }, [page])

  useEffect(() => {
    if (error && status === 'failed') {
      dispatch(showToast({ message: error, type: 'error' }))
    }
    else {
      dispatch(resetToast())
    }
  }, [error, dispatch])

  const handleLoadMore = () => {
    dispatch(getLatestImages({items, page: page + 1}))
  }

  return (
    <>
      <Tabs items={tabItems} />
      <Hero />
      {status === 'pending' ?
        <div className='text-center mt-8'><Spinner variant={'green'} /></div> :
        status === 'completed' ?
        <div className='flex flex-col items-center gap-y-4'>
          <PhotosGrid images={images} />

          {status === 'pending_next' ?
            <div className='text-center mb-8'><Spinner variant={'green'} /></div> :
            <button 
              className='px-3 py-2 mb-8 border border-green-300 bg-green-50 rounded-md text-primary hover:border-green-400 hover:text-green-700 hover:shadow'
              onClick={handleLoadMore}
            >Load more</button>
          }
        </div> : null
      }
      <Toast />
    </>
  )
}

export default Home