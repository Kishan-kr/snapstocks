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


function Home() {
  const { loggedIn } = useSelector(state => state.user);
  const { images, error, status } = useSelector(state => state.images);
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

  // useEffect(() => {
  //   dispatch(getLatestImages({items: 5}))
  // }, [])

  useEffect(() => {
    if (error && status === 'failed') {
      dispatch(showToast({ message: error, type: 'error' }))
    }
    else {
      dispatch(resetToast())
    }
  }, [error, dispatch])

  return (
    <>
      <Tabs items={tabItems} />
      <Hero />
      {status === 'pending' ?
        <div className='text-center mt-8'><Spinner variant={'green'} /></div> :
        <div className='flex flex-col items-center gap-y-4'>
          <PhotosGrid images={images} />

          {status === 'pending_next' ?
            <div className='text-center mb-8'><Spinner variant={'green'} /></div> :
            <button className='px-3 py-2 mb-8 border border-green-300 bg-green-50 rounded-md text-primary hover:border-green-400 hover:text-green-700 hover:shadow'>Load more</button>
          }
        </div>
      }
      <Toast />
    </>
  )
}

export default Home