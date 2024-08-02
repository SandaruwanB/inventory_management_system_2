import React, { useEffect, useState } from 'react';
import DashboadrdSideBar from '../../layouts/dashboadrdSideBar';
import axios from 'axios';
import { apiConfig } from '../../../apiConfig';


const SalesReport = () => {
    const [sales, setSales] = useState([]);

    useEffect(()=>{
        axios.get(`${apiConfig.url}/api/orders/customer`).then((result)=>{
            setSales(result.data);
            console.log(result.data);
        })
    },[])


  return (
    <>
        <DashboadrdSideBar />
        <div className="p-4 sm:ml-64">
            <div className="p-4">
                <div className='w-full'>
                    <h1 className='mb-4 text-3xl text-gray-800 font-semibold'>Sales Report</h1>
                    <div className='w-full mt-10'>
                        <div className='w-full flex justify-between'>
                            <div>
                                <button className='bg-green-800 hover:bg-green-950 text-white font-semibold px-3 py-1 rounded'>Download PDF</button>
                            </div>
                            <div className='flex'>
                                <div className='text-gray-800 ml-4'>
                                   
                                </div>
                            </div>
                        </div>
                        <div className='mt-10 w-full'>
                            <div className='grid grid-cols-3 gap-2'>
                                <div className='col-span-2 h-full'>
                                    <table className='w-full table-fixed border-collapse mt-3'>
                                        <thead className='bg-gray-200 border-b-2 border-gray-400'>
                                            <tr>
                                                <th className='p-3 text-sm font-semibold tracking-wide text-left w-10'>No.</th>
                                                <th className='p-3 text-sm font-semibold tracking-wide text-left'>Customer</th>
                                                <th className='p-3 text-sm font-semibold tracking-wide text-left'>Date</th>
                                                <th className='p-3 text-sm font-semibold tracking-wide text-right'>Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody className=' divide-y divide-gray-200'>
                                            {
                                                sales.length > 0 ?
                                                sales.map((value, index)=>{
                                                    return (
                                                        <tr className={(index % 2) === 0 ? 'bg-white' : 'bg-gray-100'} key={index}>
                                                            <td className='p-3 text-sm text-gray-700'>{index + 1}</td>
                                                            <td className='p-3 text-sm text-gray-700'>{value.customer.firstname + " " + value.customer.lastname}</td>
                                                            <td className='p-3 text-sm text-gray-700'>{value.date}</td>
                                                            <td className='p-3 text-sm text-gray-700 text-right'>{}</td>
                                                        </tr>
                                                    )
                                                })
                                                :
                                                <tr className='bg-white'>
                                                    <td className='text-center text-blue-400 hover:underline cursor-pointer text-sm p-3' colSpan={4}>No Sales Details Found</td>
                                                </tr>
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                <div>
                                    sdfsdf
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>   
        </div>
    </>
  )
}

export default SalesReport