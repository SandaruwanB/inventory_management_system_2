import React from 'react'
import { Icon } from '@iconify/react'

const HomeHeader = () => {
    const burgerClicked = ()=>{
        console.log("clicked");
    }

  return (
    <nav className='fixed w-full z-20 top-0 start-0'>
        <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
            <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                <span className="self-center text-2xl font-semibold text-blue-950 whitespace-nowrap hover:tracking-wider transition-all delay-150">Stockify</span>
            </a>
            <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                <button className='bg-transparent text-blue-950 md:text-white hover:ring-2 rounded-lg' onClick={()=>burgerClicked()}>
                    <Icon icon="solar:hamburger-menu-bold" fontSize={35}/>
                </button>                
            </div>
        </div>
    </nav>
  )
}

export default HomeHeader