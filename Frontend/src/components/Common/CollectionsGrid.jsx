import React from 'react'
import { Link } from 'react-router-dom'

function Collections(props) {
  const { collecionName, photos, author, thumbnail } = props;
  return (
    <figure className='text-start basis-full md:basis-[calc(50%-12px)] slg:basis-[calc(33.33%-16px)]'>
      <Link to={''}>
        <div className='mb-3 grid gap-[2px] grid-cols-3 grid-rows-2 aspect-[10/7]'>
          <div className='bg-gray-100 col-span-2 row-span-2 rounded-md rounded-e-none overflow-hidden'>
            <img src={thumbnail[0] || ''} loading='lazy'  alt="" />
          </div>
          <div className='bg-gray-100 rounded-se-md overflow-hidden'>
            <img src={thumbnail[1] || ''} loading='lazy'  alt="" />
          </div>
          <div className='bg-gray-100 rounded-ee-md overflow-hidden'>
            <img src={thumbnail[2] || ''} loading='lazy' alt="" />
          </div>
        </div>
      </Link>
      <Link to={''} className='text-lg font-semibold text-black'>{collecionName}</Link>
      <p className='flex items-center text-base gap-x-1 text-gray-light'>
        <span>{photos} photos</span>
        <span>&#128900;</span>
        <span>curated by</span>
        <Link to={''} className='hover:underline hover:text-gray-dark'>{author}</Link>
      </p>
    </figure>
  )
}

function CollectionsGrid({collectionsArray}) {

  return (
    <div className='flex flex-wrap px-2 gap-x-6 gap-y-8 md:px-4'>{
      collectionsArray?.map(collection => (
        <Collections 
          key={collection._id} 
          collecionName={collection.name} 
          photos={collection.imageCount} 
          author={collection.user?.name}
          thumbnail={collection.thumbnail}
        />
      ))
    }</div>
  )
}

export default CollectionsGrid