import React from 'react';
import DashboadrdSideBar from '../../layouts/dashboadrdSideBar';


const SalesReport = () => {
  return (
    <>
        <DashboadrdSideBar />
        <div className="p-4 sm:ml-64">
            <div className="p-4">
                <div className='w-full'>
                    <h1 className='mb-4 text-3xl text-gray-800 font-semibold'>Monthly Sales</h1>
                    <div className='w-full mt-10'>
                        <div className='w-full flex justify-between'>
                            <div>
                                <button className='bg-green-800 hover:bg-green-950 text-white font-semibold px-3 py-1 rounded'>Download PDF</button>
                            </div>
                            <div className='flex'>
                                <div className='text-gray-800 ml-4'>
                                    showing results <span className='text-blue-950 font-bold'>{}</span>
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