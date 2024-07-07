import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboadrdSideBar from '../../../layouts/dashboadrdSideBar';
import { ToastContainer, toast } from 'react-toastify';


const AddOrder = () => {

    const [ordername, setOrdername] = useState("");
    const [note, setNote] = useState("");
    const [date, setDate] = useState("");
    const [customer, setCustomer] = useState("");

    const navigate = useNavigate();

    const saveOrder = ()=>{

    }
  return (
    <>
    <DashboadrdSideBar />
        <div className="p-4 sm:ml-64">
            <div className="p-4">
                <div className='w-full'>
                    <h1 className=' mb-4 text-2xl text-gray-800 font-semibold'><span className='text-md text-blue-950 hover:underline cursor-pointer' onClick={()=>navigate("/user/orders")}>Orders</span> / Add</h1>
                    <h1 className='font-semibold text-gray-700 mt-10'>Add new order</h1>
                    <div className='w-full bg-gray-400 h-[2px]'></div>
                    <div className='w-full mt-10'>
                        <div className="w-full">
                            <div className='grid md:grid-cols-2 grid-cols-1 gap-2'>
                                <div className='w-full max-w-lg'>
                                    <div className="flex flex-wrap -mx-3 mb-6">
                                        <div className="w-full px-3">
                                            <input name='ordername' id='ordername' onChange={()=>setOrdername()} value={ordername} className="appearance-none block w-full text-4xl text-gray-700 py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="text" placeholder="ORDER1213" />
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap -mx-3 mb-6">
                                        <div className="w-full px-3">
                                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor='date' >
                                                date
                                            </label>
                                            <input name='date' id='date'  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="date" placeholder="120"/>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap -mx-3 mb-6">
                                        <div className="w-full px-3">
                                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor='customer'>
                                                Customer
                                            </label>
                                            <select id='customer' name='customer' className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" >
                                                <option value={0}>None</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className='w-full max-w-lg'>
                                    <div className="flex flex-wrap -mx-3 mb-6">
                                        <div className="w-full px-3">
                                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor='note' >
                                                Note
                                            </label>
                                            <textarea rows={5} onChange={(e)=>setNote(e.target.value)} value={note} name='note' id='note' className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"  type="text" placeholder="note">{note}</textarea>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap w-full -mx-3 mb-6">
                                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                            <button className='bg-blue-700 hover:bg-blue-900 px-4 py-2 text-white rounded' onClick={()=>saveOrder()}>Save</button>
                                            <button className='bg-gray-700 hover:bg-gray-900 px-4 py-2 text-white rounded ml-4' onClick={()=>navigate('/user/orders')}>Cancel</button>
                                        </div>
                                    </div>
                                </div>
                            </div>                       
                        </div>
                    </div>
                    <h1 className='font-semibold text-gray-700 mt-10'>Order lines</h1>
                    <div className='w-full bg-gray-400 h-[2px]'></div>
                </div>
            </div>
        </div>
        <ToastContainer />
    </>
  )
}

export default AddOrder
