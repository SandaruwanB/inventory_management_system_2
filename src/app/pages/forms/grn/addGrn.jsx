import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboadrdSideBar from '../../../layouts/dashboadrdSideBar';

const AddGrn = () => {
  document.title = "GRN | Add";

  const [grncode, setGrncode] = useState("");
  
  const navigate = useNavigate();

  return (
    <>
        <DashboadrdSideBar />
        <div className="p-4 sm:ml-64">
            <div className="p-4">
                <div className='w-full'>
                    <h1 className=' mb-4 text-2xl text-gray-800 font-semibold'><span className='text-md text-blue-950 hover:underline cursor-pointer' onClick={()=>navigate("/user/payments")}>Payments</span> / Add</h1>
                    <h1 className='font-semibold text-gray-700 mt-10'>Create payment</h1>
                    <div className='w-full bg-gray-400 h-[2px]'></div>
                    <div className='w-full mt-10'>
                        <div className="w-full">
                            <div className='grid md:grid-cols-2 grid-cols-1 gap-2'>
                                <div className='w-full max-w-lg'>
                                    <div className="flex flex-wrap -mx-3 mb-6">
                                        <div className="w-full px-3">
                                            <input name='payslip' id='username' onChange={(e)=>setGrncode(e.target.value)} value={grncode} className="appearance-none block uppercase text-4xl w-full text-gray-700 py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" readOnly/>
                                        </div>
                                    </div>
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

export default AddGrn
