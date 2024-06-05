import React from 'react';
import { Icon } from '@iconify/react';

const NotFound = () => {
  return (
    <div className='h-screen w-full bg-gradient-to-br from-green-950 to-blue-950'>
        <div className='flex h-full flex-col items-center justify-center'>
            <h1 className='font-extrabold text-white text-[5rem] md:text-[10rem]'>404</h1>
            <p className='text-cyan-200 text-[1rem] text-center'>Oops! something went wrong. page cannot found.</p>

            <a href="/" className='border-1 border-red-300 mt-5 px-6 py-2 text-white'><span className='inline-block'><Icon icon="tabler:home-filled" fontSize={22} /></span>  Go back to home </a>
        </div>
    </div>
  )
}

export default NotFound