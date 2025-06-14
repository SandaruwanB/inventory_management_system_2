import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { apiConfig } from '../../../../apiConfig';
import DashboadrdSideBar from '../../../layouts/dashboadrdSideBar';
import OrderPDF from '../../../components/orderPDF';
import { PDFDownloadLink } from '@react-pdf/renderer';

const EditOrder = () => {
    document.title = "New Invent Technologies | Orders";

    const [order, setOrder] = useState([]);
    const [ordermove, setOrdermove] = useState([]);
    const [customer, setCustomer] = useState([]);
    const [company, setCompany] = useState([]);
    const [total, setTotal] = useState(0);
    const [token, setToken] = useState("");

    const { id } = useParams();

    const navigate = useNavigate();

    useEffect(()=>{
        setToken(`Bearer ${sessionStorage.getItem('session')}`);
        const getData = ()=>{
            axios.get(`${apiConfig.url}/api/orders/get/${id}`,{
                headers : {
                Authorization : token
                }
            }).then(result=>{
                setOrder(result.data);
                setOrdermove(result.data.ordermove);
                setCustomer(result.data.customer);
            });
            axios.get(`${apiConfig.url}/api/company/all`,{
                headers : {
                Authorization : token
                }
            }).then(result=>{
                setCompany(result.data[0]);
            });

            let total = 0;
            ordermove.map((value,index)=>{
                total += value.itemcount * value.product.unitprice;
                return 0;
            });
            setTotal(total);
        }
        if (token){
            getData();
        }
    },[id, ordermove, token])

    return (
        <>
            <DashboadrdSideBar />
            <div className="p-4 sm:ml-64">
                <div className="p-4">
                    <div className='w-full'>
                        <h1 className=' mb-4 text-2xl text-gray-800 font-semibold'><span className='text-md text-blue-950 hover:underline cursor-pointer' onClick={()=>navigate("/user/customer/orders")}>Orders</span> / {order.ordername}</h1>
                            <div className='mt-10 flex justify-between'>
                                <div>
                                  <h1 className='font-semibold text-gray-700'>View order details</h1>
                                </div>
                            <div className='mr-2'>
                                <PDFDownloadLink document={<OrderPDF total={total} customer={customer} orderlines={ordermove} company={company} order={order} />} fileName='order'>
                                    {({loading})=>(loading ? "creating..." : <button className='mr-3 py-1 px-2 rounded mb-1 bg-gray-600 text-white font-semibold text-sm hover:bg-gray-950'>Download PDF</button>)}
                                </PDFDownloadLink>
                            </div>
                        </div>
                        <div className='w-full bg-gray-400 h-[2px]'></div>
                        <div className='w-full mt-10'>
                            <div className="w-full">
                                <div className='grid md:grid-cols-2 grid-cols-1 gap-2'>
                                    <div className='w-full max-w-lg'>
                                        <div className="flex flex-wrap -mx-3 mb-6">
                                            <div className="w-full px-3">
                                                <input name='ordername' id='ordername' value={order.ordername} className="appearance-none block w-full text-4xl text-gray-700 py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="text" placeholder="ORDER1213" readOnly/>
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap -mx-3 mb-6">
                                            <div className="w-full px-3">
                                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor='date' >
                                                    date <span className='text-red-400 text-xs'>*</span>
                                                </label>
                                                <input name='date' id='date' value={order.date} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="date" placeholder="120" readOnly/>
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap -mx-3 mb-6">
                                            <div className="w-full px-3">
                                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor='customer'>
                                                    Customer <span className='text-red-400 text-xs'>*</span>
                                                </label>
                                                <select id='customer' value={0} name='customer' className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" readOnly>
                                                    <option value={0}>{order.customer ? order.customer.firstname + " " + order.customer.lastname : ""}</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='w-full max-w-lg'>
                                        <div className="flex flex-wrap -mx-3 mb-6">
                                            <div className="w-full px-3">
                                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor='note' >
                                                    Note
                                                </label>
                                                <textarea rows={5} value={order.note} name='note' id='note' className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"  type="text" placeholder="note" readOnly>{order.note}</textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>                       
                            </div>
                        </div>
                        <h1 className='font-semibold text-gray-700 mt-5'>Order lines</h1>
                        <div className='w-full bg-gray-400 h-[2px]'></div>
                        <div className='w-100'>
                            <table className='w-full table-fixed border-collapse mt-3'>
                                <thead className='bg-gray-200 border-b-2 border-gray-400'>
                                    <tr>
                                        <th className='p-1 text-sm font-semibold tracking-wide text-left pl-5'>Product</th>
                                        <th className='p-1 text-sm font-semibold tracking-wide text-left'>Count</th>
                                        <th className='p-1 text-sm font-semibold tracking-wide text-center'>Availability</th>
                                        <th className='p-1 text-sm font-semibold tracking-wide text-end'>Unit price</th>
                                        <th className='p-1 text-sm font-semibold tracking-wide text-end'>Sub total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        ordermove.map((value, index)=>(
                                            <tr key={index}>
                                                <td className='p-1 text-sm font-semibold tracking-wide text-left pl-5'>{value.product.prodctname}</td>
                                                <td className='p-1 text-sm font-semibold tracking-wide text-left'>{value.itemcount}</td>
                                                <td className='p-1 text-sm font-semibold tracking-wide text-center'>{value.product.onhandqty > 10 ? <p className='text-green-600'>available</p> : <p className='text-red-600'>Low stock</p>}</td>
                                                <td className='p-1 text-sm font-semibold tracking-wide text-end'>Rs.{value.product.unitprice}</td>
                                                <td className='p-1 text-sm font-semibold tracking-wide text-end'>Rs.{parseFloat(value.product.unitprice * value.itemcount).toFixed(2)}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                                {ordermove.length > 0 && (
                                    <tfoot className='bg-gray-100 border-t-2 border-gray-400'>
                                        <tr>
                                            <td colSpan={4} className='p-3 text-lg font-bold text-gray-800 text-right'>Total Amount:</td>
                                            <td className='p-3 text-lg font-bold text-gray-800 text-end'>Rs.{total.toFixed(2)}</td>
                                        </tr>
                                    </tfoot>
                                )}
                            </table>
                            <div className='mt-10 w-100'>
                                <button onClick={()=>navigate('/user/customer/orders')} className='ml-4 bg-gray-700 hover:bg-gray-900 px-4 py-2 text-white rounded'>Back</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditOrder
