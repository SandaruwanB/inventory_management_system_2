import React, { useEffect, useState } from 'react';
import { confirmDialog, ConfirmDialog } from 'primereact/confirmdialog';
import { Button } from 'primereact/button';
import { ToastContainer, toast } from 'react-toastify';
import DashboadrdSideBar from '../../layouts/dashboadrdSideBar';
import { apiConfig } from '../../../apiConfig';
import { Icon } from '@iconify/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Employees = () => {
    document.title = "Stockify | Employees";

    const [employees, setEmployees] = useState([]);
    const [popupvisibility, setPopupvisibility] = useState(false);

    const navigate = useNavigate();

    useEffect(()=>{
        axios.get(`${apiConfig.url}/api/employees/all`, {responseType : 'json'}).then(data=>{
            setEmployees(data.data);
        });
    },[]);

    const editEmployee = (id)=>{
        navigate(`/user/employees/edit/${id}`);
    }

    const removeEmployee = (id)=>{
        setPopupvisibility(true);
        confirmDialog({
            message : 'Are you sure you want to remove this employee?',
            header : 'Confirmation',
            icon : 'pi pi-exclamation-triangle',
            accept : ()=>deleteEmployee(id),
            reject : ()=>{setPopupvisibility(false)},
            rejectClassName : 'mr-2 bg-transparent',
            acceptClassName : 'bg-red-600 text-white px-3 py-1 hover:bg-red-700'
        });
    }

    const deleteEmployee = async (id)=>{
        setPopupvisibility(false);
        await axios.delete(`${apiConfig.url}/api/employees/delete/${id}`).then(()=>{                    
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
            const remainingEmployees = employees.filter((result)=>result.id !== id);
            setEmployees(remainingEmployees); 
        });
    }

    return (
    <>
        <DashboadrdSideBar />
        <div className="p-4 sm:ml-64">
            <div className="p-4">
                <div className='w-full'>
                    <h1 className=' mb-4 text-3xl text-gray-800 font-semibold'>Employees</h1>
                    <div className='w-full mt-10'>
                        <div className='w-full flex justify-between'>
                            <div>
                                <button onClick={()=>navigate('/user/employees/add')} className=' bg-green-800 hover:bg-green-950 text-white font-semibold px-3 py-1 rounded'>Add New</button>
                            </div>
                            <div className='flex'>
                                <div className=' text-gray-800 '>
                                    showing results <span className='text-blue-950 font-bold'>{employees.length}</span>
                                </div>                       
                            </div>
                        </div>
                        <table className='w-full table-fixed border-collapse mt-3'>
                            <thead className='bg-gray-200 border-b-2 border-gray-400'>
                                <tr>
                                    <th className='p-3 text-sm font-semibold tracking-wide text-left w-10'>No.</th>
                                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Name</th>
                                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Job Position</th>
                                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Email Address</th>
                                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Contact</th>
                                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Location</th>
                                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className=' divide-y divide-gray-200'>
                                {
                                    employees.length > 0 ?
                                    employees.map((value, index)=>{
                                        return (
                                            <tr className={(index % 2) === 0 ? 'bg-white' : 'bg-gray-100'} key={index}>
                                                <td className='p-3 text-sm text-gray-700'>{index + 1}</td>
                                                <td className='p-3 text-sm text-gray-700'>{value.firstname + " " + value.lastname}</td>
                                                <td className='p-3 text-sm text-gray-700'>{value.jobtitle}</td>
                                                <td className='p-3 text-sm text-gray-700'>{value.email}</td>
                                                <td className='p-3 text-sm text-gray-700'>{value.contact}</td>
                                                <td className='p-3 text-sm text-gray-700'>{value.city}</td>
                                                <td className='p-3 text-sm text-gray-700'>
                                                    <Button className='hover:text-green-500' onClick={()=>editEmployee(value.id)}><Icon icon="basil:edit-solid" width={26} /></Button>
                                                    <Button className='ml-4 hover:text-red-500' onClick={()=>removeEmployee(value.id)}><Icon icon="material-symbols-light:delete"  width={28}/></Button>
                                                    <ConfirmDialog visible={popupvisibility} />
                                                </td>
                                            </tr>
                                        )
                                    })
                                :
                                <tr className='bg-white'>
                                    <td className='text-center text-blue-400 hover:underline cursor-pointer text-sm p-3' colSpan={7}>
                                        <p>No emplooyes found.</p>
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

export default Employees
