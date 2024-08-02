import React from 'react'

const MonthlyPurchasesReport = () => {
    document.title = "Stokify | Monthly Purchases"
    
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
                            <div className='grid grid-cols-2 gap-10'>
                                <div className='h-full'>
                                    <table className='w-full table-fixed border-collapse mt-3'>
                                        <thead className='bg-gray-200 border-b-2 border-gray-400'>
                                            <tr>
                                                <th className='p-3 text-sm font-semibold tracking-wide text-left w-10'>No.</th>
                                                <th className='p-3 text-sm font-semibold tracking-wide text-left'>Suplier</th>
                                                <th className='p-3 text-sm font-semibold tracking-wide text-left'>Date</th>
                                                <th className='p-3 text-sm font-semibold tracking-wide text-right'>Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody className=' divide-y divide-gray-200'>

                                        </tbody>
                                    </table>
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

export default MonthlyPurchasesReport