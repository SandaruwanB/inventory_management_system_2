import React from 'react'

const HomeHeader = () => {
  return (
    <div className='flex justify-between absolute w-screen left-0 top-0 lg:pl-64 lg:pr-64 lg:pt-12 pl-2 pr-2 pt-5'>
      <div className='h-auto'>
        <a href="/" className='flex items-center space-x-3 rtl:space-x-reverse hover-animated-text hover:text-sky-200'>
          <span className='self-center text-2xl uppercase hover:text-sky-200 font-semibold text-white whitespace-nowrap tracking-wider transition-all delay-150'>New Invent Technologies</span>
        </a>
      </div>
      <div className='h-auto'>
        <a href="/login" className='bg-transparent px-4 py-2 text-white border-2 border-sky-200 hover:ring-2 rounded-lg'>
          Sign In
        </a>
      </div>
    </div>
  );
}

export default HomeHeader