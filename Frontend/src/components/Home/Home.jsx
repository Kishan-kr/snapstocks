import React, { useState } from 'react'
import Tabs from '../Common/Tabs'
import Hero from './Hero';
import PhotosGrid from '../Common/PhotosGrid';
import TagsField from '../Common/TagsField';

function Home() {
  const [loggedIn, setLoggedIn] = useState(true);

  // tabs array 
  const tabItems = [{
    path: '/',
    text: 'Editorial'
  }]

  // Show Following tab if user is logged in 
  if(loggedIn) {
    tabItems.push({
      path: '/following',
      text: 'Following'
    })
  }
  return (
    <>
    <Tabs items={tabItems}/>
    <Hero/>
    <PhotosGrid/>
    </>
  )
}

export default Home