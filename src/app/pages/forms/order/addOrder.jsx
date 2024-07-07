import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboadrdSideBar from '../../../layouts/dashboadrdSideBar';
import { ToastContainer, toast } from 'react-toastify';
import { Icon } from '@iconify/react';
import axios from 'axios';
import { apiConfig } from '../../../../apiConfig';
import validator from 'validator';


const AddOrder = () => {
    document.title = "Stockify | Orders";

    const [ordername, setOrdername] = useState("");
    const [note, setNote] = useState("");
    const [date, setDate] = useState("");
    const [customer, setCustomer] = useState("");
    const [product, setProduct] = useState(0);
    const [count, setCount] = useState("");
    const [orderlines, setOrderlines] = useState([]);
    
    const [showmenu, setShowmenu] = useState(false);
    const [products, setProducts] = useState([]);
    const [customers, setCustomers] = useState([]);

    const navigate = useNavigate();
    
    useEffect(()=>{
        axios.get(`${apiConfig.url}/api/customers/all`).then(result=>{
            setCustomers(result.data);
        });
        axios.get(`${apiConfig.url}/api/inventory/all`).then(result=>{
            setProducts(result.data);
        });
    },[]);

    const saveOrder = ()=>{

    }

    const removeItem = (index)=>{
        setOrderlines(orderlines.filter((value, ind)=>ind !== index));
    }

    const addNewItem = async ()=>{
        if (product === 0 || count === 0){
            toast.error('Please provide product and products count!', {
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
        else if (!validator.isInt(count) || !validator.isFloat(count)){
            toast.error('Invalid count number!', {
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
            await axios.get(`${apiConfig.url}/api/inventory/get/${product}`).then(result=>{
                const array = {
                    "product" : {
                        "id" : product,
                        "prodctname" : result.data.prodctname,
                        "availability" : result.data.onhandqty > 20 ? "available" : "low stock",
                        "onhandqty" : parseFloat(result.data.onhandqty) + parseFloat(count),
                        "inqty" : parseFloat(result.data.inqty) + parseFloat(count),
                    },
                    "itemcount" : count,
                };

                setOrderlines((previous)=>[...previous, array]);
                setShowmenu(false);
                setCount("");
                setProduct(0);
            })
        }
    }


  return (
    <>
    <DashboadrdSideBar />
        <div className="p-4 sm:ml-64">
            <div className="p-4">
                <div className='w-full'>
                    <h1 className=' mb-4 text-2xl text-gray-800 font-semibold'><span className='text-md text-blue-950 hover:underline cursor-pointer' onClick={()=>navigate("/user/orders")}>Orders</span> / Add</h1>
                    <h1 className='font-semibold text-gray-700 mt-10'>Add new order</h1>
                    <div className='w-full bg-gray-400 h-[2px]'></div>
                    <div className='w-full mt-10'>
                        <div className="w-full">
                            <div className='grid md:grid-cols-2 grid-cols-1 gap-2'>
                                <div className='w-full max-w-lg'>
                                    <div className="flex flex-wrap -mx-3 mb-6">
                                        <div className="w-full px-3">
                                            <input name='ordername' id='ordername' onChange={()=>setOrdername()} value={ordername} className="appearance-none block w-full text-4xl text-gray-700 py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="text" placeholder="ORDER1213" />
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap -mx-3 mb-6">
                                        <div className="w-full px-3">
                                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor='date' >
                                                date
                                            </label>
                                            <input name='date' id='date' onChange={(e)=>setDate(e.target.value)} value={date} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="date" placeholder="120"/>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap -mx-3 mb-6">
                                        <div className="w-full px-3">
                                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor='customer'>
                                                Customer
                                            </label>
                                            <select id='customer' onChange={(e)=>setCustomer(e.target.value)} value={customer} name='customer' className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" >
                                                <option value={0}>None</option>
                                                {
                                                    customers.map((value,index)=>(
                                                        <option key={index}>{value.firstname + " " + value.lastname + " " + value.city}</option>
                                                    ))
                                                }
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
                                            <textarea rows={5} onChange={(e)=>setNote(e.target.value)} value={note} name='note' id='note' className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"  type="text" placeholder="note">{note}</textarea>
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
                                    <th className='p-1 text-sm font-semibold tracking-wide'></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    orderlines.map((value, index)=>(
                                        <tr key={index}>
                                            <td className='p-1 text-sm font-semibold tracking-wide text-left pl-5'>{value.product.prodctname}</td>
                                            <td className='p-1 text-sm font-semibold tracking-wide text-left'>{value.itemcount}</td>
                                            <td className='p-1 text-sm font-semibold tracking-wide text-center'>{value.product.availability === "available" ? <p className='text-green-600'>available</p> : <p className='text-red-600'>Low stock</p>}</td>
                                            <td>
                                                <button className='ml-4 hover:text-red-500' onClick={()=>removeItem(index)}><Icon icon="material-symbols-light:delete"  width={28}/></button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                        <div className='text-center w-full'>
                            <div className='text-center w-full text-blue-800 hover:underline cursor-pointer text-md p-3' colSpan={4}>
                                <p onClick={()=>setShowmenu(true)}>Add Item</p>
                            </div>
                        </div>
                        <div className='mt-10 w-100'>
                            <button onClick={()=>saveOrder()} className='bg-blue-700 hover:bg-blue-900 px-4 py-2 text-white rounded'>Complete</button>
                            <button onClick={()=>navigate('/user/orders')} className='ml-4 bg-gray-700 hover:bg-gray-900 px-4 py-2 text-white rounded'>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {
            showmenu ? 
            <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-md flex justify-center items-center'>
                <div className='bg-white p-5 w-[600px] rounded'>
                    <div className='w-full'>
                        <th className='text-center w-full'>Add Product</th>
                        <div className="flex flex-wrap -mx-3 mb-6 mt-10">
                            <div className="w-full px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor='product'>
                                    Product <span className='text-red-400 text-xs'>*</span>
                                </label>
                                <select id='product' name='product' onChange={(e)=>setProduct(e.target.value)} value={product} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" >
                                    <option value={0}>None</option>
                                    {                                                  
                                        products.map((value, index)=>(
                                            <option key={index} value={value.id}>{value.prodctname}</option>
                                    ))                                              
                                    }
                                </select>
                            </div>
                            
                            <div className="w-full px-3 mt-5">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor='count'>
                                    Quantity <span className='text-red-400 text-xs'>*</span>
                                </label>
                                <input name='count' id='count' onChange={(e)=>setCount(e.target.value)} value={count} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"  type="text" />
                            </div>
                        </div>
                        <div className='mt-5 flex justify-end'>
                        <button onClick={()=>addNewItem()} className='bg-green-600 text-white text-sm px-3 py-1 rounded hover:bg-green-800'>Add</button>
                        <button onClick={()=>setShowmenu(false)} className='ml-4 bg-gray-600 text-white text-sm px-3 py-1 rounded hover:bg-gray-800'>Cancel</button>
                        </div>
                    </div>
                </div>
            </div> : ""
        }
        <ToastContainer />
    </>
  )
}

export default AddOrder
