import React, { useState } from 'react'
import Tabs from '../Common/Tabs';
import PhotosGrid from '../Common/PhotosGrid';

// tabs array 
const tabItems = [{
  path: '/',
  text: 'Editorial'
}, {
  path: '/following',
  text: 'Following'
}]

function Following() {

  return (
    <>
    <Tabs items={tabItems}/>
    <PhotosGrid/>
    </>
  )
}

export default Following