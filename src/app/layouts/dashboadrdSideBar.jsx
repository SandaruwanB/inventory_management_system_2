import React, { useState } from 'react'
import { Icon } from '@iconify/react'

const DashboadrdSideBar = () => {
  const [sidebarActive, setSidebarActive] = useState(true);

  return (
    <div className={`bg-gradient-to-br from-green-950 to-blue-950 h-screen p-5 pt-8 w-72 ${sidebarActive ? 'w-72' : 'w-20'} relative duration-300`}>
      <Icon icon="ic:twotone-chevron-left" className={`bg-white text-gray-950 text-4xl rounded-full absolute -right-4 top-10 border border-blue-800 cursor-pointer rotate-180 duration-200 ${!sidebarActive ? 'rotate-180' : 'rotate-0'}` } onClick={()=>setSidebarActive(!sidebarActive)}/>
      <div className='inline-flex'>
        <Icon icon="dashicons:admin-site" className='bg-amber-400 text-4xl rounded cursor-pointer block float-left p-1 mr-3' />
        <h1 className={`text-white origin-left font-medium text-2xl duration-300 ${!sidebarActive && "scale-0"}`}>Stockify</h1>
      </div>
    </div>
  )
}

export default DashboadrdSideBar