import React from 'react'
import DashboadrdSideBar from '../../layouts/dashboadrdSideBar';
import { Icon } from '@iconify/react';

const Customers = () => {
    document.title = "Stockify | Customers";


    const customers = [
        {
            "name": "Alexandra Johnson",
            "address": "999 Willow Dr, Anywhere City",
            "email": "alexandrajohnson@example.com",
            "contact": "456-789-0123",
            "image": "/assets/images/defaultUser.png"
        },
        {
            "name": "Christopher Lee",
            "address": "777 Birch Ln, Another Town",
            "email": "christopherlee@example.com",
            "contact": "789-012-3456",
            "image": "/assets/images/defaultUser.png"
        }
    ]

    const editCustomer = (id)=>{
        console.log("Edit clicked" + id);
    }

    const removeCustomer = (id)=>{
        console.log("Delete clicked" + id);
    }
  return (
    <div className='flex w-screen'>
    <DashboadrdSideBar />
    <div className='p-7 w-full'>
        <h1 className=' mb-4 text-3xl text-gray-800 font-semibold ml-10'>Customers</h1>
        <div className='w-full mt-10'>
            <div className='w-full flex justify-between'>
                <div>
                    <button className=' bg-green-800 hover:bg-green-950 text-white font-semibold px-3 py-1 rounded'>Add New</button>
                </div>
                <div className='flex'>
                    <div className=' text-gray-800 '>
                        showing results <span className='text-blue-950 font-bold'>{customers.length}</span>
                    </div>                       
                </div>
            </div>
            <table className='w-full table-fixed border-collapse mt-3'>
                <thead className='bg-gray-200 border-b-2 border-gray-400'>
                    <tr>
                        <th className='p-3 text-sm font-semibold tracking-wide text-left w-10'>No.</th>
                        <th className='p-3 text-sm font-semibold tracking-wide text-left'>Name</th>
                        <th className='p-3 text-sm font-semibold tracking-wide text-left'>Email Address</th>
                        <th className='p-3 text-sm font-semibold tracking-wide text-left'>Contact</th>
                        <th className='p-3 text-sm font-semibold tracking-wide text-left'>Location</th>
                        <th className='p-3 text-sm font-semibold tracking-wide text-left'>Actions</th>
                    </tr>
                </thead>
                <tbody className=' divide-y divide-gray-200'>
                    {
                        customers.length > 0 ?
                        customers.map((value, index)=>{
                            return (
                                <tr className={(index % 2) === 0 ? 'bg-white' : 'bg-gray-100'} key={index}>
                                    <td className='p-3 text-sm text-gray-700'>{index + 1}</td>
                                    <td className='p-3 text-sm text-gray-700'>{value.name}</td>
                                    <td className='p-3 text-sm text-gray-700'>{value.email}</td>
                                    <td className='p-3 text-sm text-gray-700'>{value.contact}</td>
                                    <td className='p-3 text-sm text-gray-700'>{value.address}</td>
                                    <td className='p-3 text-sm text-gray-700'>
                                        <button className='hover:text-green-500' onClick={()=>editCustomer(index)}><Icon icon="basil:edit-solid" width={26} /></button>
                                        <button className='ml-4 hover:text-red-500' onClick={()=>removeCustomer(index)}><Icon icon="material-symbols-light:delete"  width={28}/></button>
                                    </td>
                                </tr>
                            )
                        })
                    :
                    <tr className='bg-white'>
                        <td className='text-center text-blue-400 hover:underline cursor-pointer text-sm p-3' colSpan={6}>
                            <p>No emplooyes found. <span className='text-sm hover:underline ml-2'>Add Employee</span></p>
                        </td>
                    </tr>
                    }
                </tbody>
            </table>
        </div>
    </div>
</div>
  )
}

export default Customers
