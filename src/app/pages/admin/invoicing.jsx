import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import DashboadrdSideBar from '../../layouts/dashboadrdSideBar';
import { confirmDialog, ConfirmDialog } from 'primereact/confirmdialog';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { apiConfig } from '../../../apiConfig';
import { useNavigate } from 'react-router-dom';

const Invoicing = () => {
    document.title = "Stockify | Invoicing";

    const [invoices, setInvoices] = useState([]);
    const [popupvisibility, setPopupvisibility] = useState(false);

    const navigate = useNavigate();

    useEffect(()=>{
        axios.get(`${apiConfig.url}/api/invoicing/all`).then(result=>{
            setInvoices(result.data);
            console.log(result.data);
        })
    },[]);

    const editInvoice = (id)=>{
        console.log("Edit clicked" + id);
    }

    const removeInvoice = (id)=>{
        setPopupvisibility(true);
        confirmDialog({
            message : 'Are you sure you want to remove this invoice?',
            header : 'Confirmation',
            icon : 'pi pi-exclamation-triangle',
            accept : ()=>deleteInvoice(id),
            reject : ()=>{setPopupvisibility(false)},
            rejectClassName : 'mr-2 bg-transparent',
            acceptClassName : 'bg-red-600 text-white px-3 py-1 hover:bg-red-700'
        });
    }

    const deleteInvoice = async (id)=>{
        setPopupvisibility(false);
        console.log(id);
        await axios.delete(`${apiConfig.url}/api/invoicing/delete/${id}`).then(()=>{
            toast.info('Successfully Removed!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            const remainingInvoices = invoices.filter((result)=>result.id !== id);
            setInvoices(remainingInvoices);
        });
    }

    return (
    <>
        <DashboadrdSideBar />
        <div className="p-4 sm:ml-64">
            <div className="p-4">
                <div className='w-full'>
                    <h1 className=' mb-4 text-3xl text-gray-800 font-semibold'>Invoicing</h1>
                    <div className='w-full mt-10'>
                        <div className='w-full flex justify-between'>
                            <div>
                                <button onClick={()=>navigate('/user/invoicing/add')} className=' bg-green-800 hover:bg-green-950 text-white font-semibold px-3 py-1 rounded'>Add New</button>
                            </div>
                            <div className='flex'>
                                <div className=' text-gray-800 '>
                                    showing results <span className='text-blue-950 font-bold'>{invoices.length}</span>
                                </div>                       
                            </div>
                        </div>
                        <table className='w-full table-fixed border-collapse mt-3'>
                            <thead className='bg-gray-200 border-b-2 border-gray-400'>
                                <tr>
                                    <th className='p-3 text-sm font-semibold tracking-wide text-left w-10'>No.</th>
                                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Invoice Number</th>
                                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Customer</th>
                                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Amount</th>
                                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Status</th>
                                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Date</th>
                                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className=' divide-y divide-gray-200'>
                                {
                                    invoices.length > 0 ?
                                    invoices.map((value, index)=>{
                                        return (
                                            <tr className={(index % 2) === 0 ? 'bg-white' : 'bg-gray-100'} key={index}>
                                                <td className='p-3 text-sm text-gray-700'>{index + 1}</td>
                                                <td className='p-3 text-sm text-gray-700'>{value.invoicenumber}</td>
                                                <td className='p-3 text-sm text-gray-700'>{value.customer.firstname + " " + value.customer.lastname}</td>
                                                <td className='p-3 text-sm text-gray-700'>Rs. {value.amount}</td>
                                                <td className={`p-3 text-sm text-white`}> 
                                                    <span className={`${value.status === "posted" ? "bg-green-500" : value.status === "canceled" ? "bg-red-500" : "bg-yellow-500"} px-2 py-[3px] rounded-md`}>
                                                        {value.status}
                                                    </span>
                                                </td>
                                                <td className='p-3 text-sm text-gray-700'>{value.date}</td>
                                                <td className='p-3 text-sm text-gray-700'>
                                                    <button className='hover:text-green-500' onClick={()=>editInvoice(value.id)}><Icon icon="basil:edit-solid" width={26} /></button>
                                                    <button className='ml-4 hover:text-red-500' onClick={()=>removeInvoice(value.id)}><Icon icon="material-symbols-light:delete"  width={28}/></button>
                                                    <ConfirmDialog visible={popupvisibility} />
                                                </td>
                                            </tr>
                                        )
                                    })
                                :
                                <tr className='bg-white'>
                                    <td className='text-center text-blue-400 hover:underline cursor-pointer text-sm p-3' colSpan={7}>
                                        <p>No invoices found.</p>
                                    </td>
                                </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <ToastContainer />
    </>
  )
}

export default Invoicing
