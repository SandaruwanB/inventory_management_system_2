import React, { useEffect, useState } from 'react';
import DashboadrdSideBar from '../../../layouts/dashboadrdSideBar';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { apiConfig } from '../../../../apiConfig';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PaymentPDF from '../../../components/paymentPDF';

const EditSuplierPayment = () => {
    document.title = "Stockify | Suplier Payments";

    const [payslipcode, setPayslipcode] = useState("");
    const [status, setStatus] = useState("");
    const [note, setNote] = useState("");
    const [date, setDate] = useState("");
    const [paymentmethod, setPaymentMethod] = useState("");
    const [accountnumber, setAccountnumber] = useState("");
    const [accountholder, setAccountholder] = useState("");
    const [bank, setBank] = useState("");
    const [amount, setAmount] = useState("");
    const [paymenttype, setPaymenttype] = useState("");
    const [customer, setCustomer] = useState("");
    const [suplier, setSuplier] = useState("");

    const [docCustomer, setDocCustomer] = useState([]);
    const [docSuplier, setDocSuplier] = useState([]);    
    const [company, setCompany] = useState([]);
    const [payment, setPayment] = useState([]);

    const [supliers, setSupliers] = useState([]);

    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        axios.get(`${apiConfig.url}/api/supliers/all`).then(result=>{
            setSupliers(result.data);
        });
        axios.get(`${apiConfig.url}/api/payments/get/${id}`).then(result=>{
            setPayslipcode(result.data.payslipcode);
            setStatus(result.data.status);
            setNote(result.data.note ? result.data.note : "");
            setDate(result.data.date);
            setPaymentMethod(result.data.paymentmethod);
            setAccountnumber(result.data.accountnumber);
            setAccountholder(result.data.accountholder);
            setBank(result.data.bank);
            setAmount(result.data.amount);
            setPaymenttype(result.data.paymenttype);
            setCustomer(result.data.customer ? result.data.customer.id : 0);
            setPayment(result.data);
            setDocCustomer(result.data.customer);
            setDocSuplier(result.data.suplier);
        });
        axios.get(`${apiConfig.url}/api/company/all`).then(result=>{
            setCompany(result.data[0]);
        })
    },[id]);

    const updatePayment = async ()=>{
        if (status === "" || date === "" || paymentmethod === "" || amount === ""){
            toast.error('You missed some required fields !', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        else if (paymentmethod === "bank" && accountholder === "" && accountnumber === "" && bank === ""){
            toast.error('Please provide bank details !', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        else if (customer === ""){
            toast.error('Please choose payment type !', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        else{
            await axios.put(`${apiConfig.url}/api/payments/update/${id}`,{
                payslipcode : payslipcode,
                status : status,
                note : note,
                date : date,
                paymentmethod : paymentmethod,
                paymenttype : paymenttype,
                accountnumber : accountnumber,
                accountholder : accountholder,
                bank : bank,
                amount : amount,
                customer : {
                    id : parseInt(customer)
                },
                suplier : {
                    id : parseInt(suplier)
                },
            }).then(result=>{
                if (result.status === 200){
                    toast.success('Successfully Created!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    setPayment(result.data);
                    setDocCustomer(result.data.customer);
                    setDocSuplier(result.data.suplier);
                }
            })
        }
    }

    const cancelEntry = async ()=>{
        await axios.put(`${apiConfig.url}/api/payments/entry/cancel/${id}`).then(result=>{
            if (result.status === 200){
                toast.info('Entry canceled!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setStatus("canceled");
            }
        })
    }

  return (
    <>
        <DashboadrdSideBar />
        <div className="p-4 sm:ml-64">
            <div className="p-4">
                <div className='w-full'>
                    <h1 className=' mb-4 text-2xl text-gray-800 font-semibold'><span className='text-md text-blue-950 hover:underline cursor-pointer' onClick={()=>navigate("/user/suplier/payments")}>Suplier Payments</span> / Edit</h1>
                    <div className='mt-10 flex justify-between'>
                        <div className='text-gray-700'>
                            <h1 className='font-semibold'>Edit & view payment details</h1>
                        </div>
                        <div className='mr-2'>

                            <PDFDownloadLink document={<PaymentPDF payment={payment} company={company} suplier={docSuplier} customer={docCustomer} />} fileName='payment_receipt'>
                                {({loading})=>(loading ? "creating..." : <button className='mr-3 py-1 px-2 rounded mb-1 bg-gray-600 text-white font-semibold text-sm hover:bg-gray-950'>Download PDF</button>)}
                            </PDFDownloadLink>
                            {
                                status === "canceled" ? "" :
                                <button onClick={()=>cancelEntry()} className='py-1 px-2 rounded mb-1 bg-yellow-600 text-white font-semibold text-sm hover:bg-yellow-800'>Cancel Entry</button>
                            }
                        </div>
                    </div>
                    
                    <div className='w-full bg-gray-400 h-[2px]'></div>
                    <div className='w-full mt-10'>
                        <div className="w-full">
                            <div className='grid md:grid-cols-2 grid-cols-1 gap-2'>
                                <div className='w-full max-w-lg'>
                                    <div className="flex flex-wrap -mx-3 mb-6">
                                        <div className="w-full px-3">
                                            <input name='payslip' id='payslip' onChange={(e)=>setPayslipcode(e.target.value)} value={payslipcode} className="appearance-none block uppercase text-4xl w-full text-gray-700 py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" readOnly autoComplete='false'/>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap -mx-3 mb-6">
                                        <div className="w-full px-3">
                                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor='status'>
                                                Status <span className='text-red-400 text-xs'>*</span>
                                            </label>
                                            <select id='status' name='status' onChange={(e)=>setStatus(e.target.value)} value={status} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" >
                                                {
                                                    status === "canceled" ? 
                                                    <option>Canceled</option> :
                                                    <>
                                                        <option value="">None</option>
                                                        <option value="draft" >Draft</option>
                                                        <option value="posted" >Posted</option>
                                                    </>
                                                }
                                                {

                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap -mx-3 mb-6">
                                        <div className="w-full px-3">
                                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor='datefield'>
                                                Date <span className='text-red-400 text-xs'>*</span>
                                            </label>
                                            <input name='datefield' id='datefield' onChange={(e)=>setDate(e.target.value)} value={date} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"  type="date" />
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap -mx-3 mb-6">
                                        <div className="w-full px-3">
                                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor='paymentmethod'>
                                                Payment method <span className='text-red-400 text-xs'>*</span>
                                            </label>
                                            <select id='paymentmethod' name='paymentmethod' onChange={(e)=>{setPaymentMethod(e.target.value); if (e.target.value === "cash"){ setPayslipcode("CSH" + payslipcode.slice(3))}else{setPayslipcode("BNK" + payslipcode.slice(3)) }}} value={paymentmethod} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" >
                                                <option value="">None</option>
                                                <option value="cash">Cash</option>
                                                <option value="bank" >Bank</option>
                                            </select>
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
                                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor='paytype'>
                                                Payment type <span className='text-red-400 text-xs'>*</span>
                                            </label>
                                            <select id='paytype' name='paytype' onChange={(e)=>setPaymenttype(e.target.value)} value={paymenttype} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" >
                                                <option value="">None</option>
                                                <option value="suplier">Suplier payment</option>
                                                <option value="customer" >Customer payment</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className='w-full max-w-lg'>
                                        <div className="flex flex-wrap -mx-3 mb-6">
                                            <div className="w-full px-3">
                                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor='suplier'>
                                                    Suplier <span className='text-red-400 text-xs'>*</span>
                                                </label>
                                                <select id='suplier' name='suplier' onChange={(e)=>setSuplier(e.target.value)} value={suplier} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" >
                                                    <option value={0}>None</option>
                                                    {
                                                        supliers.map((value, index)=>{
                                                            return (
                                                                <option key={index} value={value.id}>{value.firstname + " " + value.lastname  + " " + value.companyname} </option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                    { paymentmethod === "bank" ?
                                        <> 
                                            <div className="flex flex-wrap -mx-3 mb-6">
                                                <div className="w-full px-3">
                                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor='accountholder' >
                                                        Account holder <span className='text-red-400 text-xs'>*</span>
                                                    </label>
                                                    <input name='accountholder' id='accountholder' onChange={(e)=>setAccountholder(e.target.value)} value={accountholder} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="John Won"/>
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap -mx-3 mb-6">
                                                <div className="w-full px-3">
                                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor='bank'>
                                                        Bank <span className='text-red-400 text-xs'>*</span>
                                                    </label>
                                                    <input name='bank' id='bank' onChange={(e)=>setBank(e.target.value)} value={bank} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"  type="text" placeholder="BOC"/>
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap -mx-3 mb-6">
                                                <div className="w-full px-3">
                                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor='accountnumber' >
                                                        Account number <span className='text-red-400 text-xs'>*</span>
                                                    </label>
                                                    <input name='accountnumber' id='accountnumber' onChange={(e)=>setAccountnumber(e.target.value)} value={accountnumber} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="xxx-xxx-xxxxxx-xx"/>
                                                </div>
                                            </div>
                                        </>
                                    : "" }
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
                                            {
                                                status === "canceled" ? "" : 
                                                <button className='bg-blue-700 hover:bg-blue-900 px-4 py-2 text-white rounded' onClick={()=>updatePayment()}>Update</button>
                                            }                                            
                                            <button className='bg-gray-700 hover:bg-gray-900 px-4 py-2 text-white rounded ml-4' onClick={()=>navigate('/user/suplier/payments')}>Cancel</button>
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

export default EditSuplierPayment