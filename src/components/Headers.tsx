import React from 'react'

export default function Headers() {
  return (
    <div className='min-h-screen w-full flex flex-col justify-center items-center'>
      <div className='block'>
        <h1>Discover and Explore</h1>
        <h2>Stunning Images</h2>
      </div>
      <div className='flex flex-col text-gray-300 mt-5 md:mt-12'>
        <p>Welcome to my image gallery, where you can</p>
        <p>effortlessly search and explore a vast collection of </p>
        <p>stunning visuals from Pixabay.</p>
      </div>
    </div>
  )
}
