import React from 'react';
import { Icon } from '@iconify/react';
import DashboadrdSideBar from '../../layouts/dashboadrdSideBar';

const Payments = () => {
    document.title = "Stockify | Payments";

    const payments = [
        {
            "name" : "CSH123456",
            "suplier" : "Nimal Shantha",
            "amount" : "12700.00",
            "contact" : "07611562233",
            "status" : "draft",
            "date" : "2024-06-23",
            "image" : "/assets/images/defaultUser.png"
        },
        {
            "name": "BNK123457",
            "suplier": "Kasun Nishantha",
            "amount": "22500.00",
            "contact": "123-456-7890",
            "status" : "posted",
            "date" : "2024-06-23",
            "image": "/assets/images/defaultUser.png"
        },
        {
            "name": "CSH123458",
            "suplier": "Nimal Susantha",
            "amount": "23450.00",
            "contact": "987-654-3210",
            "status" : "canceled",
            "date" : "2024-06-23",
            "image": "/assets/images/defaultUser.png"
        }
    ];

    const editEmployee = (id)=>{
        console.log("Edit clicked" + id);
    }

    const removeEmployee = (id)=>{
        console.log("Delete clicked" + id);
    }

    return (
    <div className='flex w-screen'>
        <DashboadrdSideBar />
        <div className='p-7 w-full'>
            <h1 className=' mb-4 text-3xl text-gray-800 font-semibold ml-10'>Payments</h1>
            <div className='w-full mt-10'>
                <div className='w-full flex justify-between'>
                    <div>
                        <button className=' bg-green-800 hover:bg-green-950 text-white font-semibold px-3 py-1 rounded'>Add New</button>
                    </div>
                    <div className='flex'>
                        <div className=' text-gray-800 '>
                            showing results <span className='text-blue-950 font-bold'>{payments.length}</span>
                        </div>                       
                    </div>
                </div>
                <table className='w-full table-fixed border-collapse mt-3'>
                    <thead className='bg-gray-200 border-b-2 border-gray-400'>
                        <tr>
                            <th className='p-3 text-sm font-semibold tracking-wide text-left w-10'>No.</th>
                            <th className='p-3 text-sm font-semibold tracking-wide text-left'>Payment Voucher</th>
                            <th className='p-3 text-sm font-semibold tracking-wide text-left'>Suplier</th>
                            <th className='p-3 text-sm font-semibold tracking-wide text-left'>Amount</th>
                            <th className='p-3 text-sm font-semibold tracking-wide text-left'>Status</th>
                            <th className='p-3 text-sm font-semibold tracking-wide text-left'>Date</th>
                            <th className='p-3 text-sm font-semibold tracking-wide text-left'>Actions</th>
                        </tr>
                    </thead>
                    <tbody className=' divide-y divide-gray-200'>
                        {
                            payments.length > 0 ?
                            payments.map((value, index)=>{
                                return (
                                    <tr className={(index % 2) === 0 ? 'bg-white' : 'bg-gray-100'} key={index}>
                                        <td className='p-3 text-sm text-gray-700'>{index + 1}</td>
                                        <td className='p-3 text-sm text-gray-700'>{value.name}</td>
                                        <td className='p-3 text-sm text-gray-700'>{value.suplier}</td>
                                        <td className='p-3 text-sm text-gray-700'>Rs. {value.amount}</td>
                                        <td className='p-3 text-sm text-white'>
                                            <span className={`${value.status === "posted" ? "bg-green-500" : value.status === "canceled" ? "bg-red-500" : "bg-yellow-500"} px-2 py-[3px] rounded-md`}>
                                                {value.status}
                                            </span>
                                        </td>
                                        <td className='p-3 text-sm text-gray-700'>{value.date}</td>
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
                                <p>No payments found.</p>
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

export default Payments
