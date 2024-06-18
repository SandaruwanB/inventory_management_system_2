import React from 'react'
import DashboadrdSideBar from '../../layouts/dashboadrdSideBar';
import { Icon } from '@iconify/react';

const Supliers = () => {
    document.title = "Stockify | Supliers";

    const employees = [
        {
            "name": "Jessica Miller",
            "address": "666 Oak St, Anyplace",
            "email": "jessicamiller@example.com",
            "contact": "012-345-6789",
            "image": "/assets/images/defaultUser.png"
        },
        {
            "name": "Ryan Davis",
            "address": "333 Pine Ave, Somecity",
            "email": "ryandavis@example.com",
            "contact": "901-234-5678",
            "image": "/assets/images/defaultUser.png"
        },
        {
            "name": "Melissa Martinez",
            "address": "222 Elm Rd, Elsewhere",
            "email": "melissamartinez@example.com",
            "contact": "678-901-2345",
            "image": "/assets/images/defaultUser.png"
        }
    ]

    const editSuplier = (id)=>{
        console.log("Edit clicked" + id);
    }

    const removeSupllier = (id)=>{
        console.log("Delete clicked" + id);
    }

    return (
    <>
        <DashboadrdSideBar />
        <div className="p-4 sm:ml-64">
            <div className="p-4">
                <div className='w-full'>
                    <h1 className=' mb-4 text-3xl text-gray-800 font-semibold'>Supliers</h1>
                    <div className='w-full mt-10'>
                        <div className='w-full flex justify-between'>
                            <div>
                                <button className=' bg-green-800 hover:bg-green-950 text-white font-semibold px-3 py-1 rounded'>Add New</button>
                            </div>
                            <div className='flex'>
                                <div className=' text-gray-800 '>
                                    showing results <span className='text-blue-950 font-bold'>{employees.length}</span>
                                </div>                       
                            </div>
                        </div>
                        <table className='w-full table-fixed border-collapse mt-3'>
                            <thead className='bg-gray-200 border-b-2 border-gray-400'>
                                <tr>
                                    <th className='p-3 text-sm font-semibold tracking-wide text-left w-10'>No.</th>
                                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Name</th>
                                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Email Address</th>
                                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Contact Number</th>
                                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Address</th>
                                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className=' divide-y divide-gray-200'>
                                {
                                    employees.length > 0 ?
                                    employees.map((value, index)=>{
                                        return (
                                            <tr className={(index % 2) === 0 ? 'bg-white' : 'bg-gray-100'} key={index}>
                                                <td className='p-3 text-sm text-gray-700'>{index + 1}</td>
                                                <td className='p-3 text-sm text-gray-700'>{value.name}</td>
                                                <td className='p-3 text-sm text-gray-700'>{value.email}</td>
                                                <td className='p-3 text-sm text-gray-700'>{value.contact}</td>
                                                <td className='p-3 text-sm text-gray-700'>{value.address}</td>
                                                <td className='p-3 text-sm text-gray-700'>
                                                    <button className='hover:text-green-500' onClick={()=>editSuplier(index)}><Icon icon="basil:edit-solid" width={26} /></button>
                                                    <button className='ml-4 hover:text-red-500' onClick={()=>removeSupllier(index)}><Icon icon="material-symbols-light:delete"  width={28}/></button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                :
                                <tr className='bg-white'>
                                    <td className='text-center text-blue-400 hover:underline cursor-pointer text-sm p-3' colSpan={6}>
                                        <p>No supliers found.</p>
                                    </td>
                                </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Supliers
