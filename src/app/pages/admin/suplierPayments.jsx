import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import DashboadrdSideBar from '../../layouts/dashboadrdSideBar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { apiConfig } from '../../../apiConfig';
import { ToastContainer, toast } from 'react-toastify';
import { confirmDialog, ConfirmDialog } from 'primereact/confirmdialog';

const SuplierPayments = () => {
    document.title = "Stockify | Suplier Payments";

    const [payments, setPayments] = useState([]);
    const [popupvisibility, setPopupvisibility] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredPayments, setFilteredPayments] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${apiConfig.url}/api/payments/suplier`).then(result => {
            setPayments(result.data);
            setFilteredPayments(result.data);
        });
    }, []);

    const editPayment = (id) => {
        navigate(`/user/suplier/payments/edit/${id}`);
    }

    const removePayment = (id) => {
        setPopupvisibility(true);
        confirmDialog({
            message: 'Are you sure you want to remove this payment?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => deletePayment(id),
            reject: () => { setPopupvisibility(false) },
            rejectClassName: 'mr-2 bg-transparent',
            acceptClassName: 'bg-red-600 text-white px-3 py-1 hover:bg-red-700'
        });
    }

    const deletePayment = async (id) => {
        setPopupvisibility(false);
        await axios.delete(`${apiConfig.url}/api/payments/delete/${id}`).then(result => {
            if (result.status === 200) {
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
                const remainingPayments = payments.filter((result) => result.id !== id);
                setPayments(remainingPayments);
                setFilteredPayments(remainingPayments);
            }
        });
    }

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        if (query === "") {
            setFilteredPayments(payments);
        } else {
            setFilteredPayments(payments.filter(payment =>
                payment.payslipcode.toLowerCase().includes(query)
                || `${payment.suplier.firstname} ${payment.suplier.lastname}`.toLowerCase().includes(query)
                || payment.paymentmethod.toLowerCase().includes(query)
                || payment.date.toLowerCase().includes(query)
            ));
        }
    };

    return (
        <>
            <DashboadrdSideBar />
            <div className="p-4 sm:ml-64">
                <div className="p-4">
                    <div className='w-full'>
                        <h1 className='mb-4 text-3xl text-gray-800 font-semibold'>Suplier Payments</h1>
                        <div className='w-full mt-10'>
                            <div className='w-full flex justify-between'>
                                <div>
                                    <button onClick={() => navigate('/user/suplier/payments/add')} className='bg-green-800 hover:bg-green-950 text-white font-semibold px-3 py-1 rounded'>Add New</button>
                                </div>
                                <div className='flex'>
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={handleSearch}
                                        className="p-2 border border-gray-300 rounded"
                                        placeholder="Search Payments..."
                                    />
                                    <div className='text-gray-800 ml-4'>
                                        showing results <span className='text-blue-950 font-bold'>{filteredPayments.length}</span>
                                    </div>
                                </div>
                            </div>
                            <table className='w-full table-fixed border-collapse mt-3'>
                                <thead className='bg-gray-200 border-b-2 border-gray-400'>
                                    <tr>
                                        <th className='p-3 text-sm font-semibold tracking-wide text-left w-10'>No.</th>
                                        <th className='p-3 text-sm font-semibold tracking-wide text-left'>Payment Voucher</th>
                                        <th className='p-3 text-sm font-semibold tracking-wide text-left'>Supplier</th>
                                        <th className='p-3 text-sm font-semibold tracking-wide text-left'>Amount</th>
                                        <th className='p-3 text-sm font-semibold tracking-wide text-left'>Payment Method</th>
                                        <th className='p-3 text-sm font-semibold tracking-wide text-left'>Status</th>
                                        <th className='p-3 text-sm font-semibold tracking-wide text-left'>Date</th>
                                        <th className='p-3 text-sm font-semibold tracking-wide text-left'>Actions</th>
                                    </tr>
                                </thead>
                                <tbody className='divide-y divide-gray-200'>
                                    {
                                        filteredPayments.length > 0 ?
                                            filteredPayments.map((value, index) => {
                                                return (
                                                    value.paymenttype === "suplier" ?
                                                        <tr className={(index % 2) === 0 ? 'bg-white' : 'bg-gray-100'} key={index}>
                                                            <td className='p-3 text-sm text-gray-700'>{index + 1}</td>
                                                            <td className='p-3 text-sm text-gray-700'>{value.payslipcode}</td>
                                                            <td className='p-3 text-sm text-gray-700'>{value.suplier ? value.suplier.firstname + " " + value.suplier.lastname : value.customer.firstname + " " + value.customer.lastname}</td>
                                                            <td className='p-3 text-sm text-gray-700'>Rs. {value.amount}</td>
                                                            <td className='p-3 text-sm text-gray-700'>{value.paymentmethod}</td>
                                                            <td className='p-3 text-sm text-white'>
                                                                <span className={`${value.status === "posted" ? "bg-green-500" : value.status === "canceled" ? "bg-red-500" : "bg-yellow-500"} px-2 py-[3px] rounded-md`}>
                                                                    {value.status}
                                                                </span>
                                                            </td>
                                                            <td className='p-3 text-sm text-gray-700'>{value.date}</td>
                                                            <td className='p-3 text-sm text-gray-700'>
                                                                <button className='hover:text-green-500' onClick={() => editPayment(value.id)}><Icon icon="basil:edit-solid" width={26} /></button>
                                                                <button className='ml-4 hover:text-red-500' onClick={() => removePayment(value.id)}><Icon icon="material-symbols-light:delete" width={28} /></button>
                                                                <ConfirmDialog visible={popupvisibility} />
                                                            </td>
                                                        </tr>
                                                        : ""
                                                )
                                            })
                                            :
                                            <tr className='bg-white'>
                                                <td className='text-center text-blue-400 hover:underline cursor-pointer text-sm p-3' colSpan={9}>
                                                    <p>No payments found.</p>
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

export default SuplierPayments;
