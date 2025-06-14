import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboadrdSideBar from '../../../layouts/dashboadrdSideBar';
import { ToastContainer, toast } from 'react-toastify';
import { Icon } from '@iconify/react';
import axios from 'axios';
import { apiConfig } from '../../../../apiConfig';
import validator from 'validator';

const AddOrder = () => {
    document.title = "New Invent Technologies | Suplier Orders";

    const [ordername, setOrdername] = useState("");
    const [note, setNote] = useState("");
    const [date, setDate] = useState("");
    const [customer, setCustomer] = useState(0);
    const [product, setProduct] = useState(0);
    const [count, setCount] = useState("");
    const [orderlines, setOrderlines] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    
    const [showmenu, setShowmenu] = useState(false);
    const [products, setProducts] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [token, setToken] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const calculateTotal = () => {
            const total = orderlines.reduce((sum, item) => {
                return sum + (parseFloat(item.product.unitprice) * parseFloat(item.itemcount));
            }, 0);
            setTotalAmount(total);
        };
        calculateTotal();
    }, [orderlines]);
    
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
            axios.get(`${apiConfig.url}/api/inventory/all`, {
                headers : {
                  Authorization : token
                }
              }).then(result=>{
                setProducts(result.data);
            });
        }
        setOrdername("ORDER" + Math.floor((Math.random() * (99999 - 10000) + 10000 )));
        if (token){
            getData();
        }
    },[token]);

    const saveOrder = async ()=>{
        if (date === "" || customer === 0){
            toast.error('You missed some required files!', {
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
        else if (orderlines.length === 0){
            toast.error('Please provide products and counts!', {
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
        else if (isDateLessThanToday(date)){
            toast.error('Cannot create back dated orders!', {
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
            await axios.post(`${apiConfig.url}/api/orders/add`, {
                ordername : ordername,
                note : note,
                date : date,
                type : "suplier",
                customer : {
                    id : customer
                },
                ordermove : orderlines
            },{
                headers : {
                  Authorization : token
                }
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
                    setNote("");setDate("");setCustomer(0);setOrderlines([]);
                }
            })
        }
    }

    const isDateLessThanToday = (inputDate) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
      
        const selectedDate = new Date(inputDate);
        selectedDate.setHours(0, 0, 0, 0);
      
        return selectedDate < today;
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
            await axios.get(`${apiConfig.url}/api/inventory/get/${product}`, {
                headers : {
                  Authorization : token
                }
              }).then(result=>{
                const array = {
                    "product" : {
                        "id" : product,
                        "prodctname" : result.data.prodctname,
                        "unitprice" : parseFloat(result.data.unitprice),
                        "availability" : result.data.onhandqty > 20 ? "available" : "low stock",
                        "onhandqty" : parseFloat(result.data.onhandqty) - parseFloat(count),
                        "inqty" : parseFloat(result.data.inqty) - parseFloat(count),
                    },
                    "itemcount" : parseFloat(count),
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
                        <h1 className=' mb-4 text-2xl text-gray-800 font-semibold'><span className='text-md text-blue-950 hover:underline cursor-pointer' onClick={()=>navigate("/user/suplier/orders")}>Orders</span> / </h1>
                        <h1 className='font-semibold text-gray-700 mt-10'>Order details</h1>
                        <div className='w-full bg-gray-400 h-[2px]'></div>
                        <div className='w-full mt-10'>
                            <div className="w-full">
                                <div className='grid md:grid-cols-2 grid-cols-1 gap-2'>
                                    <div className='w-full max-w-lg'>
                                        <div className="flex flex-wrap -mx-3 mb-6">
                                            <div className="w-full px-3">
                                                <input name='ordername' id='ordername' onChange={()=>setOrdername()} value={ordername} className="appearance-none block w-full text-4xl text-gray-700 py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="text" placeholder="ORDER1213" readOnly/>
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap -mx-3 mb-6">
                                            <div className="w-full px-3">
                                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor='date' >
                                                    date <span className='text-red-400 text-xs'>*</span>
                                                </label>
                                                <input name='date' id='date' onChange={(e)=>setDate(e.target.value)} value={date} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="date" placeholder="120"/>
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap -mx-3 mb-6">
                                            <div className="w-full px-3">
                                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor='customer'>
                                                    Customer <span className='text-red-400 text-xs'>*</span>
                                                </label>
                                                <select id='customer' onChange={(e)=>setCustomer(e.target.value)} value={customer} name='customer' className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" >
                                                    <option value={0}>None</option>
                                                    {
                                                        customers.map((value,index)=>(
                                                            <option key={index} value={value.id}>{value.firstname + " " + value.lastname + " " + value.city}</option>
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
                                        <th className='p-1 text-sm font-semibold tracking-wide text-end'>Unit price</th>
                                        <th className='p-1 text-sm font-semibold tracking-wide text-end'>Sub total</th>
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
                                                <td className='p-1 text-sm font-semibold tracking-wide text-end'>Rs.{value.product.unitprice}</td>
                                                <td className='p-1 text-sm font-semibold tracking-wide text-end'>Rs.{parseFloat(value.product.unitprice * value.itemcount).toFixed(2)}</td>
                                                <td>
                                                    <button className='ml-4 hover:text-red-500' onClick={()=>removeItem(index)}><Icon icon="material-symbols-light:delete"  width={28}/></button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                                {orderlines.length > 0 && (
                                    <tfoot className='bg-gray-100 border-t-2 border-gray-400'>
                                        <tr>
                                            <td colSpan={4} className='p-3 text-lg font-bold text-gray-800 text-right'>Total Amount:</td>
                                            <td className='p-3 text-lg font-bold text-gray-800 text-end'>Rs.{totalAmount.toFixed(2)}</td>
                                            <td></td>
                                        </tr>
                                    </tfoot>
                                )}
                            </table>
                            <div className='text-center w-full'>
                                <div className='text-center w-full text-blue-800 hover:underline cursor-pointer text-md p-3' colSpan={4}>
                                    <p onClick={()=>setShowmenu(true)}>Add Item</p>
                                </div>
                            </div>
                            <div className='mt-10 w-100'>
                                <button onClick={()=>saveOrder()} className='bg-blue-700 hover:bg-blue-900 px-4 py-2 text-white rounded'>Complete</button>
                                <button onClick={()=>navigate('/user/suplier/orders')} className='ml-4 bg-gray-700 hover:bg-gray-900 px-4 py-2 text-white rounded'>Cancel</button>
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
