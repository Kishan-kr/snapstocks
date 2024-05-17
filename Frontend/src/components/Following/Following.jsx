import React, { useState } from 'react'
import Tabs from '../Common/Tabs';
import PhotosGrid from '../Common/PhotosGrid';

function Following() {
  const [loggedIn, setLoggedIn] = useState(true);

  // tabs array 
  const tabItems = [{
    path: '/',
    text: 'Editorial'
  }, {
    path: '/following',
    text: 'Following'
  }]

  return (
    <>
    <Tabs items={tabItems}/>
    <PhotosGrid/>
    </>
  )
}

export default Following