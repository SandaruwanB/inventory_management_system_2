import React from 'react';
import DashboadrdSideBar from '../../layouts/dashboadrdSideBar';
import { Icon } from '@iconify/react';

const Employees = () => {

    document.title = "Stockify | Employees";

    const employees = [
        {
            "name" : "kasun Kumara",
            "job" : "manager",
            "address" : "Galewela",
            "email" : "test@gmail.com",
            "contact" : "07611562233",
            "image" : "/assets/images/defaultUser.png"
        },
        {
            "name": "John Doe",
            "job" : "salesman",
            "address": "123 Main St, Anytown",
            "email": "johndoe@example.com",
            "contact": "123-456-7890",
            "image": "/assets/images/defaultUser.png"
        },
        {
            "name": "Jane Smith",
            "job" : "worker",
            "address": "456 Elm St, Anycity",
            "email": "janesmith@example.com",
            "contact": "987-654-3210",
            "image": "/assets/images/defaultUser.png"
        },
        {
            "name": "Emily Brown",
            "job" : "salesman",
            "address": "321 Pine Rd, Anotherplace",
            "email": "emilybrown@example.com",
            "contact": "234-567-8901",
            "image": "/assets/images/defaultUser.png"
        },
        {
            "name": "Sarah Taylor",
            "job" : "manager",
            "address": "888 Maple Ave, Somewhereville",
            "email": "sarahtaylor@example.com",
            "contact": "345-678-9012",
            "image": "/assets/images/defaultUser.png"
        }
    ]

    const editEmployee = (id)=>{
        console.log("Edit clicked" + id);
    }

    const removeEmployee = (id)=>{
        console.log("Delete clicked" + id);
    }

    return (
    <>
        <DashboadrdSideBar />
        <div className="p-4 sm:ml-64">
            <div className="p-4">
                <div className='w-full'>
                    <h1 className=' mb-4 text-3xl text-gray-800 font-semibold'>Employees</h1>
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
                                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Job Position</th>
                                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Email Address</th>
                                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Contact</th>
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
                                                <td className='p-3 text-sm text-gray-700'>{value.job}</td>
                                                <td className='p-3 text-sm text-gray-700'>{value.email}</td>
                                                <td className='p-3 text-sm text-gray-700'>{value.contact}</td>
                                                <td className='p-3 text-sm text-gray-700'>{value.address}</td>
                                                <td className='p-3 text-sm text-gray-700'>
                                                    <button className='hover:text-green-500' onClick={()=>editEmployee(index)}><Icon icon="basil:edit-solid" width={26} /></button>
                                                    <button className='ml-4 hover:text-red-500' onClick={()=>removeEmployee(index)}><Icon icon="material-symbols-light:delete"  width={28}/></button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                :
                                <tr className='bg-white'>
                                    <td className='text-center text-blue-400 hover:underline cursor-pointer text-sm p-3' colSpan={6}>
                                        <p>No emplooyes found.</p>
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

export default Employees
