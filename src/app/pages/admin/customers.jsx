import React, { useEffect, useState } from 'react'
import DashboadrdSideBar from '../../layouts/dashboadrdSideBar';
import { Icon } from '@iconify/react';
import axios from 'axios';
import { apiConfig } from '../../../apiConfig';
import { confirmDialog, ConfirmDialog } from 'primereact/confirmdialog';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Customers = () => {
    document.title = "Stockify | Customers";

    const [customers, setCustomers] = useState([]);
    const [popupvisibility, setPoupvisibility] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
        axios.get(`${apiConfig.url}/api/customers/all`).then(result=>{
            setCustomers(result.data); 
        }); 
    },[])

    const editCustomer = (id)=>{
        navigate(`/user/customers/edit/${id}`);
    }

    const removeCustomer = (id)=>{
        setPoupvisibility(true);
        confirmDialog({
            message : 'Are you sure you want to remove this customer?',
            header : 'Confirmation',
            icon : 'pi pi-exclamation-triangle',
            accept : ()=>deleteCustomer(id),
            reject : ()=>{},
            rejectClassName : 'mr-2 bg-transparent',
            acceptClassName : 'bg-red-600 text-white px-3 py-1 hover:bg-red-700'
        });
    }

    const deleteCustomer = async (id)=>{
        setPoupvisibility(false);

        await axios.delete(`${apiConfig.url}/api/customers/delete/${id}`).then((result)=>{
            if (result.status === 200){
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
                const remainingCustomers = customers.filter((result)=>result.id !== id);
                setCustomers(remainingCustomers); 
            }
        }).catch(err=>{
            toast.info('Cannot remove, This customer related to other transactions.!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        });
    }


  return (
    <>
        <DashboadrdSideBar />
        <div className="p-4 sm:ml-64">
            <div className="p-4">
                <div className='w-full'>
                    <h1 className=' mb-4 text-3xl text-gray-800 font-semibold'>Customers</h1>
                    <div className='w-full mt-10'>
                        <div className='w-full flex justify-between'>
                            <div>
                                <button onClick={()=>navigate('/user/customers/add')} className=' bg-green-800 hover:bg-green-950 text-white font-semibold px-3 py-1 rounded'>Add New</button>
                            </div>
                            <div className='flex'>
                                <div className=' text-gray-800 '>
                                    showing results <span className='text-blue-950 font-bold'>{customers.length}</span>
                                </div>                       
                            </div>
                        </div>
                        <table className='w-full table-fixed border-collapse mt-3'>
                            <thead className='bg-gray-200 border-b-2 border-gray-400'>
                                <tr>
                                    <th className='p-3 text-sm font-semibold tracking-wide text-left w-10'>No.</th>
                                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Name</th>
                                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Email Address</th>
                                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Contact</th>
                                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Company Name</th>
                                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Location</th>
                                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className=' divide-y divide-gray-200'>
                                {
                                    customers.length > 0 ?
                                    customers.map((value, index)=>{
                                        return (
                                            <tr className={(index % 2) === 0 ? 'bg-white' : 'bg-gray-100'} key={index}>
                                                <td className='p-3 text-sm text-gray-700'>{index + 1}</td>
                                                <td className='p-3 text-sm text-gray-700'>{value.firstname + " " + value.lastname}</td>
                                                <td className='p-3 text-sm text-gray-700'>{value.email}</td>
                                                <td className='p-3 text-sm text-gray-700'>{value.contact}</td>
                                                <td className='p-3 text-sm text-gray-700'>{value.companyname}</td>
                                                <td className='p-3 text-sm text-gray-700'>{value.city}</td>
                                                <td className='p-3 text-sm text-gray-700'>
                                                    <button className='hover:text-green-500' onClick={()=>editCustomer(value.id)}><Icon icon="basil:edit-solid" width={26} /></button>
                                                    <button className='ml-4 hover:text-red-500' onClick={()=>removeCustomer(value.id)}><Icon icon="material-symbols-light:delete"  width={28}/></button>
                                                    <ConfirmDialog visible={popupvisibility} />
                                                </td>
                                            </tr>
                                        )
                                    })
                                :
                                <tr className='bg-white'>
                                    <td className='text-center text-blue-400 hover:underline cursor-pointer text-sm p-3' colSpan={6}>
                                        <p>No customers found.</p>
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

export default Customers
