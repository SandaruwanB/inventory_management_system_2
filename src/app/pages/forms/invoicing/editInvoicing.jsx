import React, { useState } from 'react';
import DashboadrdSideBar from '../../../layouts/dashboadrdSideBar';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { apiConfig } from '../../../../apiConfig';

const EditInvoicing = () => {

    document.title = "Stockify | Invoicing";

    const [invoicenumber, setInvoicenumber] = useState("");
    const [note, setNote] = useState("");
    const [date, setDate] = useState("");
    const [amount, setAmount] = useState("");
    const [status, setStatus] = useState("");
    const [customer, setCustomer] = useState("");
    const [customers, setCustomers] = useState([]);

    const {id} = useParams();

    const navigate = useNavigate();

    useState(()=>{
        axios.get(`${apiConfig.url}/api/customers/all`).then(result=>{
            setCustomers(result.data);
        });

        axios.get(`${apiConfig.url}/api/invoicing/get/${id}`).then(result=>{
            setInvoicenumber(result.data.invoicenumber);
            setNote(result.data.note);
            setDate(result.data.date);
            setAmount(result.data.amount);
            setCustomer(result.data.customer.id);
            setStatus(result.data.status);
        });
    },[id])

    const updateInvoice = ()=>{

    }

  return (
    <>
        <DashboadrdSideBar />
        <div className="p-4 sm:ml-64">
            <div className="p-4">
                <div className='w-full'>
                    <h1 className=' mb-4 text-2xl text-gray-800 font-semibold'><span className='text-md text-blue-950 hover:underline cursor-pointer' onClick={()=>navigate("/user/invoicing")}>Invoices</span> / Edit</h1>
                    <h1 className='font-semibold text-gray-700 mt-10'>Edit & view invoice</h1>
                    <div className='w-full bg-gray-400 h-[2px]'></div>
                    <div className='w-full mt-10'>
                        <div className="w-full">
                            <div className='grid md:grid-cols-2 grid-cols-1 gap-2'>
                                <div className='w-full max-w-lg'>
                                    <div className="flex flex-wrap -mx-3 mb-6">
                                        <div className="w-full px-3">
                                            <input name='payslip' id='username' onChange={(e)=>setInvoicenumber(e.target.value)} value={invoicenumber} className="appearance-none block uppercase text-4xl w-full text-gray-700 py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" readOnly/>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap -mx-3 mb-6">
                                        <div className="w-full px-3">
                                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor='status'>
                                                Status <span className='text-red-400 text-xs'>*</span>
                                            </label>
                                            <select id='status' name='status' onChange={(e)=>setStatus(e.target.value)} value={status} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" >
                                                <option >None</option>
                                                <option value="draft">Draft</option>
                                                <option value="posted" >Posted</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap -mx-3 mb-6">
                                        <div className="w-full px-3">
                                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor='datefild'>
                                                Date <span className='text-red-400 text-xs'>*</span>
                                            </label>
                                            <input name='datefield' id='datefield' onChange={(e)=>setDate(e.target.value)} value={date} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"  type="date" />
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap -mx-3 mb-6">
                                        <div className="w-full px-3">
                                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor='amount'>
                                                Amount <span className='text-red-400 text-xs'>*</span>
                                            </label>
                                            <input name='amount' id='amount' onChange={(e)=>setAmount(e.target.value)} value={amount} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"  type="text" placeholder="1500.00"/>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap -mx-3 mb-6">
                                        <div className="w-full px-3">
                                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor='customer'>
                                                Customer <span className='text-red-400 text-xs'>*</span>
                                            </label>
                                            <select id='customer' name='customer' onChange={(e)=>setCustomer(e.target.value)} value={customer} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" >
                                                <option value={0}>None</option>
                                                {
                                                    customers.map((value, index)=>{
                                                        return (
                                                            <option key={index} value={value.id}>{value.firstname + " " + value.lastname + " " + value.city}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
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
                                            <button className='bg-blue-700 hover:bg-blue-900 px-4 py-2 text-white rounded' onClick={()=>updateInvoice()}>Save</button>
                                            <button className='bg-gray-700 hover:bg-gray-900 px-4 py-2 text-white rounded ml-4' onClick={()=>navigate('/user/invoicing')}>Cancel</button>
                                        </div>
                                    </div>
                                </div>
                            </div>                       
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <ToastContainer /> 
    </>
  )
}

export default EditInvoicing
