import React, { useState } from 'react'
import DashboadrdSideBar from '../../../layouts/dashboadrdSideBar'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import validator from 'validator';
import axios from 'axios';
import { apiConfig } from '../../../../apiConfig';


const AddProduct = () => {

    const [productname, setProductname] = useState("");
    const [onhandqty, setOnhandqty] = useState("");
    const [unitprice, setUnitprice] = useState("");
    const [unitofmesure, setUnitofmesure] = useState("");

    const navigate = useNavigate();

    const saveProduct = async ()=>{
        if (productname === "" || onhandqty === "" || unitprice === "" || unitofmesure === ""){
            toast.error('All fields are required !', {
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
        else if (!validator.isFloat(unitprice) || !validator.isInt(unitprice)){
            toast.error('Invalid unit price !', {
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
        else if (!validator.isFloat(onhandqty) || !validator.isInt(onhandqty)){
            toast.error('Invalid quantity!', {
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
            await axios.post(`${apiConfig.url}/api/inventory/add`, {
                prodctname : productname,
                onhandqty : onhandqty,
                unitprice : unitprice,
                unitofmesure : unitofmesure
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
                    setProductname("");setOnhandqty("");setUnitprice("");setUnitofmesure("");
                }
            })
        }
    }

  return (
    <>
        <DashboadrdSideBar />
        <div className="p-4 sm:ml-64">
            <div className="p-4">
                <div className='w-full'>
                    <h1 className=' mb-4 text-2xl text-gray-800 font-semibold'><span className='text-md text-blue-950 hover:underline cursor-pointer' onClick={()=>navigate("/user/inventory")}>Inventory</span> / Add</h1>
                    <h1 className='font-semibold text-gray-700 mt-10'>Add new product</h1>
                    <div className='w-full bg-gray-400 h-[2px]'></div>
                    <div className='w-full mt-10'>
                        <div className="w-full">
                            <div className='grid md:grid-cols-2 grid-cols-1 gap-2'>
                                <div className='w-full max-w-lg'>
                                    <div className="flex flex-wrap -mx-3 mb-6">
                                        <div className="w-full px-3">
                                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor='productname' >
                                                Product Name <span className='text-red-400 text-xs'>*</span>
                                            </label>
                                            <input name='productname' id='productname' onChange={(e)=>setProductname(e.target.value)} value={productname} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="busicuits" />
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap -mx-3 mb-6">
                                        <div className="w-full px-3">
                                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor='onhandqty' >
                                                On Hand Quantity
                                            </label>
                                            <input name='onhandqty' id='onhandqty' onChange={(e)=>setOnhandqty(e.target.value)} value={onhandqty} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="120"/>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap -mx-3 mb-6">
                                        <div className="w-full px-3">
                                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor='unitprice'>
                                                Unit Price
                                            </label>
                                            <input name='unitprice' id='unitprice' onChange={(e)=>setUnitprice(e.target.value)} value={unitprice} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"  type="text" placeholder="1500.00"/>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap -mx-3 mb-6">
                                        <div className="w-full px-3">
                                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor='uom'>
                                                Unit of mesure
                                            </label>
                                            <select id='uom' name='uom' onChange={(e)=>setUnitofmesure(e.target.value)} value={unitofmesure} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" >
                                                <option>None</option>
                                                <option value="kilogram">Kilogram</option>
                                                <option value="gram">Gram</option>
                                                <option value="bundle" >Bundle</option>
                                                <option value="units">Units</option>
                                                <option value="packets">Packets</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap w-full -mx-3 mb-6">
                                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                            <button className='bg-blue-700 hover:bg-blue-900 px-4 py-2 text-white rounded' onClick={()=>saveProduct()}>Save</button>
                                            <button className='bg-gray-700 hover:bg-gray-900 px-4 py-2 text-white rounded ml-4' onClick={()=>navigate('/user/inventory')}>Cancel</button>
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

export default AddProduct
