import React, { useEffect, useState } from 'react';
import DashboadrdSideBar from '../../layouts/dashboadrdSideBar';
import { ToastContainer, toast } from 'react-toastify';
import { confirmDialog, ConfirmDialog } from 'primereact/confirmdialog';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import axios from 'axios';
import { apiConfig } from '../../../apiConfig';

const Grn = () => {
    document.title = "Stockify | GRN";

    const [grns, setGrns] = useState([]);
    const [popupvisibility, setPopupvisibility] = useState(false);

    const navigate = useNavigate();
    
    useEffect(()=>{
        axios.get(`${apiConfig.url}/api/grn/all`).then(result=>{
            setGrns(result.data);
        });
    },[]);
    
    const editGrn = (id)=>{

    }
    const removeGrn = (id)=>{
        setPopupvisibility(true);
        confirmDialog({
            message : 'Are you sure you want to remove this grn?',
            header : 'Confirmation',
            icon : 'pi pi-exclamation-triangle',
            accept : ()=>deleteGrn(id),
            reject : ()=>{setPopupvisibility(false)},
            rejectClassName : 'mr-2 bg-transparent',
            acceptClassName : 'bg-red-600 text-white px-3 py-1 hover:bg-red-700'
        });
    }

    const deleteGrn = async (id)=>{
        setPopupvisibility(false);
    
        axios.delete(`${apiConfig.url}/api/grn/delete/${id}`).then(()=>{
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

            const existingGrns = grns.filter(((result)=>result.id !== id));
            setGrns(existingGrns);
        });
    }


  return (
    <>
        <DashboadrdSideBar />
        <div className="p-4 sm:ml-64">
            <div className="p-4">
                <div className='w-full'>
                    <h1 className=' mb-4 text-3xl text-gray-800 font-semibold'>Good Recieve Note</h1>
                    <div className='w-full mt-10'>
                        <div className='w-full flex justify-between'>
                            <div>
                                <button onClick={()=>navigate('/user/employees/add')} className=' bg-green-800 hover:bg-green-950 text-white font-semibold px-3 py-1 rounded'>Add New</button>
                            </div>
                            <div className='flex'>
                                <div className=' text-gray-800 '>
                                    showing results <span className='text-blue-950 font-bold'>{grns.length}</span>
                                </div>                       
                            </div>
                        </div>
                        <table className='w-full table-fixed border-collapse mt-3'>
                            <thead className='bg-gray-200 border-b-2 border-gray-400'>
                                <tr>
                                    <th className='p-3 text-sm font-semibold tracking-wide text-left w-10'>No.</th>
                                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>GRN Code</th>
                                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Suplier</th>
                                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Date</th>
                                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className=' divide-y divide-gray-200'>
                                {
                                    grns.length > 0 ?
                                    grns.map((value, index)=>{
                                        return (
                                            <tr className={(index % 2) === 0 ? 'bg-white' : 'bg-gray-100'} key={index}>
                                                <td className='p-3 text-sm text-gray-700'>{index + 1}</td>
                                                <td className='p-3 text-sm text-gray-700'>{value.grncode}</td>
                                                <td className='p-3 text-sm text-gray-700'>{value.suplier.firstname + " " + value.suplier.lastname}</td>
                                                <td className='p-3 text-sm text-gray-700'>{value.date}</td>
                                                <td className='p-3 text-sm text-gray-700'>
                                                    <button className='hover:text-green-500' onClick={()=>editGrn(value.id)}><Icon icon="basil:edit-solid" width={26} /></button>
                                                    <button className='ml-4 hover:text-red-500' onClick={()=>removeGrn(value.id)}><Icon icon="material-symbols-light:delete"  width={28}/></button>
                                                    <ConfirmDialog visible={popupvisibility} />
                                                </td>
                                            </tr>
                                        )
                                    })
                                :
                                <tr className='bg-white'>
                                    <td className='text-center text-blue-400 hover:underline cursor-pointer text-sm p-3' colSpan={5}>
                                        <p>No GRNs found.</p>
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

export default Grn
