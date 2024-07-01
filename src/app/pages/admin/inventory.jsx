import React, { useEffect, useState } from 'react';
import DashboadrdSideBar from '../../layouts/dashboadrdSideBar';
import { confirmDialog, ConfirmDialog } from 'primereact/confirmdialog';
import { Icon } from '@iconify/react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { apiConfig } from '../../../apiConfig';
import { useNavigate } from 'react-router-dom';

const Inventory = () => {
    document.title = "Stockify | Inventory";
    
    const [inventory, setInventory] = useState([]);
    const [popupvisibility, setPopupvisibility] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
        axios.get(`${apiConfig.url}/api/inventory/all`).then(result=>{
            setInventory(result.data);
        });
    },[])


    const addNew = ()=>{
        navigate("/user/inventory/add");
    }

    const editProduct = (id)=>{
        navigate(`/user/inventory/edit/${id}`);
    }

    const removeProduct = (id)=>{
        setPopupvisibility(true);
        confirmDialog({
            message : 'Are you sure you want to remove this product?',
            header : 'Confirmation',
            icon : 'pi pi-exclamation-triangle',
            accept : ()=>deleteProduct(id),
            reject : ()=>{},
            rejectClassName : 'mr-2 bg-transparent',
            acceptClassName : 'bg-red-600 text-white px-3 py-1 hover:bg-red-700'
        });
    }

    const deleteProduct = async (id)=>{
        setPopupvisibility(false);
        await axios.delete(`${apiConfig.url}/api/inventory/delete/${id}`).then((result)=>{
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
                const remainingProducts = inventory.filter((result)=>result.id !== id);
                setInventory(remainingProducts);
            }
        }).catch(err=>{
            toast.info('Cannot remove, This product related to other transactions.!', {
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
                    <h1 className=' mb-4 text-3xl text-gray-800 font-semibold'>Inventory</h1>
                    <div className='w-full mt-10'>
                        <div className='w-full flex justify-between'>
                            <div>
                            </div>
                            <div className='flex'>
                                <div className=' text-gray-800 '>
                                    showing results <span className='text-blue-950 font-bold'>{inventory.length}</span>
                                </div>                       
                            </div>
                        </div>
                        <div className='grid lg:grid-cols-8 gap-5 mt-5 w-full md:grid-cols-3 sm:grid-cols-2 grid-cols-1'>
                            <div className='bg-gray-200 w-full p-4 cursor-pointer rounded hover:bg-gray-300' onClick={()=>addNew()}>
                                <div className='text-center w-full flex justify-center items-center text-gray-600'>
                                    <Icon icon="icon-park-solid:add" width={150} />
                                </div>
                                <div className='text-center font-semibold mt-2'>
                                    Add New
                                </div>
                            </div>
                            {
                                inventory.map((value, index)=>{
                                    return (
                                        <div className='bg-gray-200 w-full p-4 cursor-pointer rounded hover:bg-gray-300'>
                                            <div className='text-center w-full flex justify-center items-center text-gray-600'>
                                                <img src={value.image ? value.image : "/assets/images/productSample.png"} alt="pro_image" className='rounded-md' />
                                            </div>
                                            <div className='flex justify-between font-semibold mt-4 text-gray-800'>
                                                <div>{value.prodctname}</div>                                                
                                            </div>
                                            <div className='flex justify-between text-sm mb-3'>
                                                <div className={`${value.onhandqty > 0 ? 'text-green-700' : 'text-red-700'}`}>{value.onhandqty + " " + value.unitofmesure}</div>
                                            </div>                                            
                                            <div className='flex justify-between mt-3 text-white'>
                                                <button className='bg-gray-600 p-1 rounded-md hover:bg-gray-800' onClick={()=>editProduct(value.id)}><Icon icon="basil:edit-solid" width={24} /></button>
                                                <button className='bg-red-600 p-1 rounded-md hover:bg-red-800' onClick={()=>removeProduct(value.id)}><Icon icon="material-symbols-light:delete" width={26}/></button>
                                                <ConfirmDialog visible={popupvisibility} />
                                            </div>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <ToastContainer />
    </>
    )
}

export default Inventory
