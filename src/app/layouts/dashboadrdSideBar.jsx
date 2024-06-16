import React, { useState } from 'react'
import { Icon } from '@iconify/react'
import { useNavigate } from 'react-router-dom';

const DashboadrdSideBar = () => {
  const [sidebarActive, setSidebarActive] = useState(true);
  const navigate = useNavigate();

  const navLinks = [
    {
      title : "Dashboard",
      icon : "ic:baseline-dashboard",
      path : "/user/dashboard"
    },
    {
      title : "Employees",
      icon : "clarity:employee-group-solid",
      path : "/user/employees",
    },
    {
      title : "Customers",
      icon : "streamline:information-desk-customer-solid",
      path : "/user/customers",
    },
    {
      title : "Supliers",
      icon : "mdi:users-switch",
      path : "/user/supliers",
    },
    {
      title : "Inventory",
      icon : "ic:baseline-inventory-2",
      path : "/user/inventory",
    },
    {
      title : "Invoicing",
      icon : "mdi:invoice-check",
      path : "/user/invoicing",
    },
    {
      title : "Payments",
      icon : "streamline:payment-10-solid",
      path : "/user/payments",
    },
    {
      title : "Users",
      icon : "raphael:users",
      path : "/user/users",
    },
    {
      title : "Settings",
      icon : "ic:round-settings",
      path : "/user/settings",
    }
  ]

  return (
    <div className={`bg-gradient-to-br from-green-950 to-blue-950 h-screen p-5 pt-8 w-72 ${sidebarActive ? 'w-72' : 'w-20'} relative duration-300`}>
      <Icon icon="ic:twotone-chevron-left" className={`bg-white text-gray-950 text-4xl rounded-full absolute -right-4 top-10 border border-blue-800 cursor-pointer rotate-180 duration-200 ${!sidebarActive ? 'rotate-180' : 'rotate-0'}` } onClick={()=>setSidebarActive(!sidebarActive)}/>
      <div className='inline-flex'>
        <Icon icon="dashicons:admin-site" className='bg-amber-400 text-4xl rounded cursor-pointer block float-left p-1 mr-3' />
        <h1 className={`text-white origin-left font-medium text-2xl duration-300 ${!sidebarActive && "scale-0"}`}>Stockify</h1>
      </div>

      <ul className=' pt-20'>
        {navLinks.map((value, index)=>(
            <li key={index} className=' text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:backdrop-brightness-200 mt-2 rounded-md' onClick={()=>navigate(value.path)}>
              <span className='text-2xl block float-left'>
                <Icon icon={value.icon} />
              </span>
              <span className={`text-base font-medium flex-1 ${!sidebarActive && 'hidden'} `}>{value.title}</span>
            </li>
        ))}
      </ul>
    </div>
  )
}

export default DashboadrdSideBar