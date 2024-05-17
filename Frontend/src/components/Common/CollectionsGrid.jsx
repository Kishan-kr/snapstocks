import React from 'react'
import { Link } from 'react-router-dom'

function Collections(props) {
  const { collecionName, photos, author } = props;
  return (
    <figure className='text-start basis-full md:basis-[calc(50%-12px)] slg:basis-[calc(33.33%-16px)]'>
      <Link to={''}>
        <div className='mb-3 grid gap-[2px] grid-cols-3 grid-rows-2 aspect-[10/7]'>
          <div className='border border-indigo-700 col-span-2 row-span-2 rounded-md rounded-e-none'>
            <img src=""  alt="" />
          </div>
          <div className='border border-indigo-700 rounded-se-md'>
            <img src=""  alt="" />
          </div>
          <div className='border border-indigo-700 rounded-ee-md'>
            <img src="" alt="" />
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

function CollectionsGrid() {
  const collectionsArray = [
    {collecionName: 'Collection 1', photos: 10, authorName: 'John'},
    {collecionName: 'Collection 2', photos: 12, authorName: 'Wick'},
    {collecionName: 'Collection 3', photos: 30, authorName: 'Antonio'},
    {collecionName: 'Collection 4', photos: 16, authorName: 'Lucifer'},
  ]

  return (
    <div className='flex flex-wrap px-2 gap-x-6 gap-y-8 md:px-4'>{
      collectionsArray.map(collection => (
        <Collections 
          key={collection.collecionName} 
          collecionName={collection.collecionName} 
          photos={collection.photos} 
          author={collection.authorName}
        />
      ))
    }</div>
  )
}

export default CollectionsGrid