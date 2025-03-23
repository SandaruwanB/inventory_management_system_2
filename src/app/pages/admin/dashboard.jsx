import React, { useEffect, useState } from 'react'
import DashboadrdSideBar from '../../layouts/dashboadrdSideBar'
import DashItem from '../../components/dashItem';
import axios from 'axios';
import { apiConfig } from '../../../apiConfig';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    document.title = "Stockify | Dashboard";

    const [customers, setCustomers] = useState([]);
    const [supliers, setSupliers] = useState([]);
    const [items, setItems] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [finalinvoices, setFinalinvoices] = useState([]);
    const [finalpayments, setFinalpaymanets] = useState([]);
    const [token, setToken] = useState("");

    const navigate = useNavigate();

    useEffect(()=>{
        setToken(`Bearer ${sessionStorage.getItem('session')}`);
        const getData = ()=>{
            axios.get(`${apiConfig.url}/api/customers/all`, {
                headers : {
                    Authorization : token
                }
            }).then(result=>{
                setCustomers(result.data);
            });
            axios.get(`${apiConfig.url}/api/supliers/all`, {
                headers : {
                    Authorization : token
                }
            }).then(result=>{
                setSupliers(result.data);
            });
            axios.get(`${apiConfig.url}/api/inventory/all`, {
                headers : {
                    Authorization : token
                }
            }).then(result=>{
                setItems(result.data);
            });
            axios.get(`${apiConfig.url}/api/employees/all`, {
                headers : {
                    Authorization : token
                }
            }).then(result=>{
                setEmployees(result.data);
            });
            axios.get(`${apiConfig.url}/api/payments/all/desc`, {
                headers : {
                    Authorization : token
                }
            }).then(result=>{
                setFinalpaymanets(result.data);
            });
            axios.get(`${apiConfig.url}/api/invoicing/all/desc`, {
                headers : {
                    Authorization : token
                }
            }).then(result=>{
                setFinalinvoices(result.data);
            });
        }
        if (token){
            getData();
        }
    },[token]);


  return (
    <>
        <DashboadrdSideBar />
        <div className="p-4 sm:ml-64">
            <div className="p-4">
                <div className='w-full'>
                    <h1 className='mb-8 text-3xl text-gray-800 font-semibold'>Dashboard</h1>
                    <div className='w-full grid lg:grid-cols-4 grid-cols-1 gap-5'>
                        <DashItem name={"Customers"} count={customers.length}/>
                        <DashItem name={"Supliers"} count={supliers.length}/>
                        <DashItem name={"Products"} count={items.length}/>
                        <DashItem name={"Employees"} count={employees.length}/>                        
                    </div>
                    <div className='w-full mt-10'>
                        <h1>Recent Invoices</h1>
                        <table className='w-full table-fixed border-collapse mt-3'>
                            <thead className='bg-gray-200 border-b-2 border-gray-400'>
                                <tr>
                                    <th className='p-3 text-sm font-semibold tracking-wide text-left w-10'>No.</th>
                                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Invoice</th>
                                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Customer</th>
                                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Status</th>
                                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Date</th>
                                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Amount</th>
                                </tr>
                            </thead>
                            <tbody className=' divide-y divide-gray-200'>
                                {
                                    finalinvoices.map((value, index)=>(
                                        index < 4 ?
                                        <tr className={ index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                                            <td className='p-3 text-sm text-gray-700'>{index + 1}</td>
                                            <td className='p-3 text-sm text-gray-700'>{value.invoicenumber}</td>
                                            <td className='p-3 text-sm text-gray-700'>{value.customer.firstname + " " + value.customer.lastname}</td>
                                            <td className='p-3 text-sm text-white'>
                                                <span className={value.status === "draft" ? 'bg-yellow-500 px-4 py-1 rounded' : value.status === "posted" ? 'bg-green-500 px-4 py-1 rounded' : 'bg-red-500 px-4 py-1 rounded'}>{value.status}</span>
                                            </td>
                                            <td className='p-3 text-sm text-gray-700'>{value.date}</td>
                                            <td className='p-3 text-sm text-gray-700'>Rs.{value.amount}</td>
                                        </tr>
                                        : ''
                                    ))
                                }
                                <tr className='bg-white'>
                                    <td onClick={()=>navigate('/user/invoicing')} className='text-center text-blue-400 hover:underline cursor-pointer text-sm p-3' colSpan={6}>Show More...</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className='w-full mt-3'>
                        <h1>Recent Payments</h1>
                        <table className='w-full table-fixed border-collapse mt-3'>
                            <thead className='bg-gray-200 border-b-2 border-gray-400'>
                                <tr>
                                    <th className='p-3 text-sm font-semibold tracking-wide text-left w-10'>No.</th>
                                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Pay Slip no.</th>
                                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Suplier/Customer</th>
                                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Status</th>
                                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Amount</th>
                                </tr>
                            </thead>
                            <tbody className=' divide-y divide-gray-200'>
                                {
                                    finalpayments.map((value,index)=>(

                                        index < 4 ? 
                                        <tr className={ index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                                            <td className='p-3 text-sm text-gray-700'>{index + 1}</td>
                                            <td className='p-3 text-sm text-gray-700'>{value.payslipcode}</td>
                                            <td className='p-3 text-sm text-gray-700'>{value.suplier ? value.suplier.firstname + " " + value.suplier.lastname : value.customer.firstname + " " + value.customer.lastname }</td>
                                            <td className='p-3 text-sm text-white'>
                                                <span className={value.status === "draft" ? 'bg-yellow-500 px-4 py-1 rounded' : value.status === "posted" ? 'bg-green-500 px-4 py-1 rounded' : 'bg-red-500 px-4 py-1 rounded'}>{value.status}</span>
                                            </td>
                                            <td className='p-3 text-sm text-gray-700'>Rs.{value.amount}</td>
                                        </tr> : ''
                                    ))
                                }
                                <tr className='bg-white'>
                                    <td onClick={()=>navigate('/user/payments')} className='text-center text-blue-400 hover:underline cursor-pointer text-sm p-3' colSpan={5}>Show More...</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    {/*
        */}
    </>
    
  )
}

export default Dashboard