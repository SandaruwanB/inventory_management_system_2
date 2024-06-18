import React from 'react'
import DashboadrdSideBar from '../../layouts/dashboadrdSideBar'
import DashItem from '../../components/dashItem';

const Dashboard = () => {
    document.title = "Stockify | Dashboard";

    const items = [
        {name : "Total Customers", count : 20},
        {name : "Total Supliers", count : 12},
        {name : "Toatl Items", count : 200},
        {name : "Total Employees", count : 120}
    ];

  return (
    <>
        <DashboadrdSideBar />
        <div className="p-4 sm:ml-64">
            <div className="p-4">
                <div className='w-full'>
                    <h1 className='mb-8 text-3xl text-gray-800 font-semibold'>Dashboard</h1>
                    <div className='w-full grid lg:grid-cols-4 grid-cols-1 gap-5'>
                        {items.map((value, index)=>(
                            <DashItem key={index} name={value.name} count={value.count}/>
                        ))}
                    </div>
                    <div className='w-full mt-10'>
                        <h1>Recent Invoices</h1>
                        <table className='w-full table-fixed border-collapse mt-3'>
                            <thead className='bg-gray-200 border-b-2 border-gray-400'>
                                <tr>
                                    <th className='p-3 text-sm font-semibold tracking-wide text-left w-10'>No.</th>
                                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Invoice</th>
                                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Customer</th>
                                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Status</th>
                                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Date</th>
                                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Amount</th>
                                </tr>
                            </thead>
                            <tbody className=' divide-y divide-gray-200'>
                                <tr className='bg-white'>
                                    <td className='p-3 text-sm text-gray-700'>1</td>
                                    <td className='p-3 text-sm text-gray-700'>sdhgs</td>
                                    <td className='p-3 text-sm text-gray-700'>sdhgs</td>
                                    <td className='p-3 text-sm text-white'>
                                        <span className=' bg-yellow-500 px-4 py-1 rounded'>Draft</span>
                                    </td>
                                    <td className='p-3 text-sm text-gray-700'>2024-06-08</td>
                                    <td className='p-3 text-sm text-gray-700'>Rs.1345.98</td>
                                </tr>
                                <tr className='bg-gray-100'>
                                    <td className='p-3 text-sm text-gray-700'>2</td>
                                    <td className='p-3 text-sm text-gray-700'>sdhgs</td>
                                    <td className='p-3 text-sm text-gray-700'>sdhgs</td>
                                    <td className='p-3 text-sm text-white'>
                                        <span className=' bg-green-700 px-4 py-1 rounded'>Posted</span>
                                    </td>
                                    <td className='p-3 text-sm text-gray-700'>2024-05-01</td>
                                    <td className='p-3 text-sm text-gray-700'>Rs.1345.98</td>
                                </tr>
                                <tr className='bg-white'>
                                    <td className='p-3 text-sm text-gray-700'>3</td>
                                    <td className='p-3 text-sm text-gray-700'>sdhgs</td>
                                    <td className='p-3 text-sm text-gray-700'>sdhgs</td>
                                    <td className='p-3 text-sm text-white'>
                                        <span className=' bg-red-700 px-4 py-1 rounded'>Canceled</span>
                                    </td>
                                    <td className='p-3 text-sm text-gray-700'>2024-04-29</td>
                                    <td className='p-3 text-sm text-gray-700'>Rs.1345.98</td>
                                </tr>
                                <tr className='bg-gray-100'>
                                    <td className='p-3 text-sm text-gray-700'>4</td>
                                    <td className='p-3 text-sm text-gray-700'>sdhgs</td>
                                    <td className='p-3 text-sm text-gray-700'>sdhgs</td>
                                    <td className='p-3 text-sm text-white'>
                                        <span className=' bg-green-700 px-4 py-1 rounded'>Posted</span>
                                    </td>
                                    <td className='p-3 text-sm text-gray-700'>2024-04-28</td>
                                    <td className='p-3 text-sm text-gray-700'>Rs.1345.98</td>
                                </tr>
                                <tr className='bg-white'>
                                    <td className='text-center text-blue-400 hover:underline cursor-pointer text-sm p-3' colSpan={5}>Show More...</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className='w-full mt-3'>
                        <h1>Recent Payments</h1>
                        <table className='w-full table-fixed border-collapse mt-3'>
                            <thead className='bg-gray-200 border-b-2 border-gray-400'>
                                <tr>
                                    <th className='p-3 text-sm font-semibold tracking-wide text-left w-10'>No.</th>
                                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Pay Slip no.</th>
                                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Suplier</th>
                                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Status</th>
                                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Amount</th>
                                </tr>
                            </thead>
                            <tbody className=' divide-y divide-gray-200'>
                                <tr className='bg-white'>
                                    <td className='p-3 text-sm text-gray-700'>1</td>
                                    <td className='p-3 text-sm text-gray-700'>sdhgs</td>
                                    <td className='p-3 text-sm text-gray-700'>sdhgs</td>
                                    <td className='p-3 text-sm text-white'>
                                        <span className=' bg-yellow-500 px-4 py-1 rounded'>Draft</span>
                                    </td>
                                    <td className='p-3 text-sm text-gray-700'>Rs.1345.98</td>
                                </tr>
                                <tr className='bg-gray-100'>
                                    <td className='p-3 text-sm text-gray-700'>2</td>
                                    <td className='p-3 text-sm text-gray-700'>sdhgs</td>
                                    <td className='p-3 text-sm text-gray-700'>sdhgs</td>
                                    <td className='p-3 text-sm text-white'>
                                        <span className=' bg-green-700 px-4 py-1 rounded'>Posted</span>
                                    </td>
                                    <td className='p-3 text-sm text-gray-700'>Rs.1345.98</td>
                                </tr>
                                <tr className='bg-white'>
                                    <td className='p-3 text-sm text-gray-700'>3</td>
                                    <td className='p-3 text-sm text-gray-700'>sdhgs</td>
                                    <td className='p-3 text-sm text-gray-700'>sdhgs</td>
                                    <td className='p-3 text-sm text-white'>
                                        <span className=' bg-red-700 px-4 py-1 rounded'>Canceled</span>
                                    </td>
                                    <td className='p-3 text-sm text-gray-700'>Rs.1345.98</td>
                                </tr>
                                <tr className='bg-gray-100'>
                                    <td className='p-3 text-sm text-gray-700'>4</td>
                                    <td className='p-3 text-sm text-gray-700'>sdhgs</td>
                                    <td className='p-3 text-sm text-gray-700'>sdhgs</td>
                                    <td className='p-3 text-sm text-white'>
                                        <span className=' bg-green-700 px-4 py-1 rounded'>Posted</span>
                                    </td>
                                    <td className='p-3 text-sm text-gray-700'>Rs.1345.98</td>
                                </tr>
                                <tr className='bg-white'>
                                    <td className='text-center text-blue-400 hover:underline cursor-pointer text-sm p-3' colSpan={5}>Show More...</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    {/*
        */}
    </>
    
  )
}

export default Dashboard