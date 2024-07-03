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
      title : "GRN",
      icon : "ep:goods-filled",
      path : "/user/grn",
    },
    {
      title : "Orders",
      icon : "material-symbols:orders-rounded",
      path : "/user/orders",
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
    <>
      <button data-drawer-target="separator-sidebar" data-drawer-toggle="separator-sidebar" aria-controls="separator-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-900 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200">
        <span className="sr-only">Open sidebar</span>
        <Icon icon="pepicons-pop:menu" width={30} />
      </button>

      <aside id="separator-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
        <div className="h-full px-3 py-4 overflow-y-auto bg-gradient-to-br from-green-950 to-blue-950">
          <ul className="space-y-2 font-medium">
            <li className='mb-28'>
              <button onClick={()=>navigate('/')} className="flex w-full items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <div className="w-5 h-5 text-gray-500 transition duration-75">
                  <Icon icon="icon-park-outline:dashboard" width={25} />
                </div>
                <span className="ms-3 ml-8 mt-2 font-semibold">STOCKIFY</span>
              </button>                      
            </li>

            {
              navLinks.map((item, index)=>{
                return (
                  <li key={index}>
                    <button onClick={()=>navigate(item.path)} className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-700 hover:backdrop-brightness-125 group w-full">
                      <div className="flex-shrink-0 w-5 h-5 text-gray-300 transition duration-75" >
                        <Icon icon={item.icon} width={22}/>
                      </div>
                      <div className='text-left ml-4'>
                        <span className="flex-1 text-gray-300 ms-3 whitespace-nowrap">{item.title}</span>
                      </div>
                    </button>
                  </li>
                )
              })
            }
          </ul>
        </div>
      </aside>
    </>
  )
}

export default DashboadrdSideBar