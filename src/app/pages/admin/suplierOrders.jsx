import React, { useEffect, useState } from 'react';
import DashboadrdSideBar from '../../layouts/dashboadrdSideBar';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { confirmDialog, ConfirmDialog } from 'primereact/confirmdialog';
import axios from 'axios';
import { apiConfig } from '../../../apiConfig';


const SuplierOrders = () => {
    document.title = "Stockify | Suplier Orders";

    const [orders, setOrders] = useState([]);
    const [popupvisibility, setPopupvisibility] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [token, setToken] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        setToken(`Bearer ${sessionStorage.getItem('session')}`);
        const getData = ()=>{
            axios.get(`${apiConfig.url}/api/orders/suplier`, {
                headers : {
                    Authorization : token
                }
            }).then(result => {
                setOrders(result.data);
                setFilteredOrders(result.data);
            });
        }
        if (token){
            getData();
        }
    }, [token]);

    const editOrder = (id) => {
        navigate(`/user/suplier/orders/edit/${id}`);
    }
    const removeOrder = (id) => {
        setPopupvisibility(true);
        confirmDialog({
            message: 'Are you sure you want to remove this Order?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => deleteOrder(id),
            reject: () => { setPopupvisibility(false) },
            rejectClassName: 'mr-2 bg-transparent',
            acceptClassName: 'bg-red-600 text-white px-3 py-1 hover:bg-red-700'
        });
    }

    const deleteOrder = async (id) => {
        setPopupvisibility(false);
        await axios.delete(`${apiConfig.url}/api/orders/delete/${id}`).then(() => {
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

            const existingOrders = orders.filter((result) => result.id !== id);
            setOrders(existingOrders);
            setFilteredOrders(existingOrders);
        });
    }

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        if (query === "") {
            setFilteredOrders(orders);
        } else {
            setFilteredOrders(orders.filter(order =>
                order.ordername.toLowerCase().includes(query)
                || `${order.customer.firstname} ${order.customer.lastname}`.toLowerCase().includes(query)
                || order.date.toLowerCase().includes(query)
            ));
        }
    };

    return (
        <>
            <DashboadrdSideBar />
            <div className="p-4 sm:ml-64">
                <div className="p-4">
                    <div className='w-full'>
                        <h1 className=' mb-4 text-3xl text-gray-800 font-semibold'>Suplier Orders</h1>
                        <div className='w-full mt-10'>
                            <div className='w-full flex justify-between'>
                                <div>
                                    <button onClick={() => navigate('/user/suplier/orders/add')} className=' bg-green-800 hover:bg-green-950 text-white font-semibold px-3 py-1 rounded'>Add New</button>
                                </div>
                                <div className='flex'>
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={handleSearch}
                                        className="p-2 border border-gray-300 rounded"
                                        placeholder="Search Orders..."
                                    />
                                    <div className='text-gray-800 ml-4'>
                                        showing results <span className='text-blue-950 font-bold'>{filteredOrders.length}</span>
                                    </div>
                                </div>
                            </div>
                            <table className='w-full table-fixed border-collapse mt-3'>
                                <thead className='bg-gray-200 border-b-2 border-gray-400'>
                                    <tr>
                                        <th className='p-3 text-sm font-semibold tracking-wide text-left w-10'>No.</th>
                                        <th className='p-3 text-sm font-semibold tracking-wide text-left'>Order Number</th>
                                        <th className='p-3 text-sm font-semibold tracking-wide text-left'>Customer</th>
                                        <th className='p-3 text-sm font-semibold tracking-wide text-left'>Total Products</th>
                                        <th className='p-3 text-sm font-semibold tracking-wide text-left'>Date</th>
                                        <th className='p-3 text-sm font-semibold tracking-wide text-left'>Actions</th>
                                    </tr>
                                </thead>
                                <tbody className='divide-y divide-gray-200'>
                                    {
                                        filteredOrders.length > 0 ?
                                            filteredOrders.map((value, index) => {
                                                return (
                                                    <tr className={(index % 2) === 0 ? 'bg-white' : 'bg-gray-100'} key={index}>
                                                        <td className='p-3 text-sm text-gray-700'>{index + 1}</td>
                                                        <td className='p-3 text-sm text-gray-700'>{value.ordername}</td>
                                                        <td className='p-3 text-sm text-gray-700'>{value.customer.firstname + " " + value.customer.lastname}</td>
                                                        <td className='p-3 text-sm text-gray-700'>{value.ordermove ? (value.ordermove).length : 0}</td>
                                                        <td className='p-3 text-sm text-gray-700'>{value.date}</td>
                                                        <td className='p-3 text-sm text-gray-700'>
                                                            <button className='hover:text-green-500' onClick={() => editOrder(value.id)}><Icon icon="ion:open" width={26} /></button>
                                                            <button className='ml-4 hover:text-red-500' onClick={() => removeOrder(value.id)}><Icon icon="material-symbols-light:delete" width={28} /></button>
                                                            <ConfirmDialog visible={popupvisibility} />
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                            :
                                            <tr className='bg-white'>
                                                <td className='text-center text-blue-400 hover:underline cursor-pointer text-sm p-3' colSpan={6}>
                                                    <p>No orders found.</p>
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

export default SuplierOrders