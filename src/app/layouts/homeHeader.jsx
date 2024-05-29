import React from 'react'
import { Icon } from '@iconify/react'

const HomeHeader = () => {
    const burgerClicked = ()=>{
        console.log("clicked");
    }

  return (
    <nav className='fixed backdrop-blur-xl w-full z-20 top-0 start-0 bg-transparent opacity-70'>
        <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-8 px-5'>
            <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse hover-animated-text hover:text-sky-200">
                <span className="self-center text-2xl uppercase hover:text-sky-200 font-semibold text-white whitespace-nowrap tracking-wider transition-all delay-150">Stockify</span>
            </a>
            <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                <a href="/login" className='bg-transparent px-4 py-2 text-white border-2 hover:font-semibold border-sky-200 hover:ring-2 rounded-lg'>Sign In</a>
            </div>
        </div>
    </nav>
  )
}

export default HomeHeader