import React, { useEffect, useState } from 'react'
import DashboadrdSideBar from '../../layouts/dashboadrdSideBar';
import { confirmDialog, ConfirmDialog } from 'primereact/confirmdialog';
import { ToastContainer, toast } from 'react-toastify';
import { Icon } from '@iconify/react';
import axios from 'axios';
import { apiConfig } from '../../../apiConfig';
import { useNavigate } from 'react-router-dom';

const Supliers = () => {
    document.title = "Stockify | Supliers";
    const [supliers, setSupliers] = useState([]);
    const [popupvisibility, setPopupvisibility] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
        axios.get(`${apiConfig.url}/api/supliers/all`).then(result=>{
            setSupliers(result.data);
        });
    }, []);

    const editSuplier = (id)=>{
        console.log("Edit clicked" + id);
    }

    const removeSupllier = (id)=>{
        setPopupvisibility(true);
        confirmDialog({
            message : 'Are you sure you want to remove this suplier?',
            header : 'Confirmation',
            icon : 'pi pi-exclamation-triangle',
            accept : ()=>deleteSuplier(id),
            reject : ()=>{},
            rejectClassName : 'mr-2 bg-transparent',
            acceptClassName : 'bg-red-600 text-white px-3 py-1 hover:bg-red-700'
        });
    }

    const deleteSuplier = async (id)=>{
        setPopupvisibility(false);

        await axios.delete(`${apiConfig.url}/api/supliers/delete/${id}`).then((result)=>{
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
                const remainingSupliers = supliers.filter((result)=>result.id !== id);
                setSupliers(remainingSupliers); 
            }
        }).catch(err=>{
            toast.info('Cannot remove, This suplier related to other transactions.!', {
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
                    <h1 className=' mb-4 text-3xl text-gray-800 font-semibold'>Supliers</h1>
                    <div className='w-full mt-10'>
                        <div className='w-full flex justify-between'>
                            <div>
                                <button onClick={()=>navigate('/user/supliers/add')} className=' bg-green-800 hover:bg-green-950 text-white font-semibold px-3 py-1 rounded'>Add New</button>
                            </div>
                            <div className='flex'>
                                <div className=' text-gray-800 '>
                                    showing results <span className='text-blue-950 font-bold'>{supliers.length}</span>
                                </div>                       
                            </div>
                        </div>
                        <table className='w-full table-fixed border-collapse mt-3'>
                            <thead className='bg-gray-200 border-b-2 border-gray-400'>
                                <tr>
                                    <th className='p-3 text-sm font-semibold tracking-wide text-left w-10'>No.</th>
                                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Name</th>
                                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Email Address</th>
                                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Contact Number</th>
                                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Company Name</th>
                                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Location</th>
                                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className=' divide-y divide-gray-200'>
                                {
                                    supliers.length > 0 ?
                                    supliers.map((value, index)=>{
                                        return (
                                            <tr className={(index % 2) === 0 ? 'bg-white' : 'bg-gray-100'} key={index}>
                                                <td className='p-3 text-sm text-gray-700'>{index + 1}</td>
                                                <td className='p-3 text-sm text-gray-700'>{value.firstname + " " + value.lastname}</td>
                                                <td className='p-3 text-sm text-gray-700'>{value.email}</td>
                                                <td className='p-3 text-sm text-gray-700'>{value.contact}</td>
                                                <td className='p-3 text-sm text-gray-700'>{value.companyname}</td>
                                                <td className='p-3 text-sm text-gray-700'>{value.city}</td>
                                                <td className='p-3 text-sm text-gray-700'>
                                                    <button className='hover:text-green-500' onClick={()=>editSuplier(value.id)}><Icon icon="basil:edit-solid" width={26} /></button>
                                                    <button className='ml-4 hover:text-red-500' onClick={()=>removeSupllier(value.id)}><Icon icon="material-symbols-light:delete"  width={28}/></button>
                                                    <ConfirmDialog visible={popupvisibility} />
                                                </td>
                                            </tr>
                                        )
                                    })
                                :
                                <tr className='bg-white'>
                                    <td className='text-center text-blue-400 hover:underline cursor-pointer text-sm p-3' colSpan={7}>
                                        <p>No supliers found.</p>
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

export default Supliers
