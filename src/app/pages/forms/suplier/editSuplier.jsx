import React, { useEffect, useState } from 'react';
import DashboadrdSideBar from '../../../layouts/dashboadrdSideBar';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { apiConfig } from '../../../../apiConfig';
import validator from 'validator';

const EditSuplier = () => {
    document.title = "Stockify | Supliers";

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");
    const [companyname, setCompanyname] = useState("");
    const [addressline1, setAddressline1] = useState("");
    const [addressline2, setAddressline2] = useState("");
    const [city, setCity] = useState("");
    const [postalcode, setPostalcode] = useState("");

    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        axios.get(`${apiConfig.url}/api/supliers/get/${id}`).then(result=>{
            setFirstname(result.data.firstname);
            setLastname(result.data.lastname);
            setEmail(result.data.email);
            setContact(result.data.contact);
            setCompanyname(result.data.companyname);
            setAddressline1(result.data.addressline1);
            setAddressline2(result.data.addressline2);
            setCity(result.data.city);
            setPostalcode(result.data.postalcode);
        });
    },[id]);

    const updateSuplier = async ()=>{
        if (firstname === "" || lastname === "" || email === "" || city === ""){
            toast.error('You missed some required fields!', {
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
        else if (!validator.isEmail(email)){
            toast.error('Please check email address again!', {
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
            await axios.put(`${apiConfig.url}/api/supliers/update/${id}`, {
                firstname : firstname,
                lastname : lastname,
                email : email,
                contact : contact,
                companyname : companyname,
                addressline1 : addressline1,
                addressline2 : addressline2,
                city : city,
                postalcode : postalcode
            }).then(result=>{
                if (result.status === 200){
                    toast.success('Succesfully Updated.!', {
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
            })
        }
    }

  return (
    <>
        <DashboadrdSideBar />
        <div className="p-4 sm:ml-64">
            <div className="p-4">
                <div className='w-full'>
                    <h1 className=' mb-4 text-2xl text-gray-800 font-semibold'><span className='text-md text-blue-950 hover:underline cursor-pointer' onClick={()=>navigate("/user/supliers")}>Supliers</span> / Edit</h1>
                    <h1 className='font-semibold text-gray-700 mt-10'>Edit suplier details</h1>
                    <div className='w-full bg-gray-400 h-[2px]'></div>
                    <div className='w-full mt-10'>
                        <div className="w-full">
                            <div className='grid md:grid-cols-2 grid-cols-1 gap-2'>
                                <div className='w-full max-w-lg'>
                                    <div className="flex flex-wrap -mx-3 mb-6">
                                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor='firstname'>
                                                First Name <span className='text-red-400 text-xs'>*</span>
                                            </label>
                                            <input onChange={(e)=>setFirstname(e.target.value)} value={firstname} name='firstname' id='firstname' className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"  type="text" placeholder="first name"/>
                                            {/*<p class="text-red-500 text-xs italic">* Please fill out this field.</p>*/}
                                        </div>
                                        <div className="w-full md:w-1/2 px-3">
                                            <label  htmlFor='lastname' className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                                Last Name <span className='text-red-400 text-xs'>*</span>
                                            </label>
                                            <input onChange={(e)=>setLastname(e.target.value)} value={lastname} name='lastname' id='lastname' className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="last name"/>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap -mx-3 mb-6">
                                        <div className="w-full px-3">
                                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor='email' >
                                                Email <span className='text-red-400 text-xs'>*</span>
                                            </label>
                                            <input name='email' id='email' onChange={(e)=>setEmail(e.target.value)} value={email} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="email" placeholder="example@gmail.com" autoComplete='1'/>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap -mx-3 mb-6">
                                        <div className="w-full px-3">
                                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor='companyname' >
                                                Company Name
                                            </label>
                                            <input name='companyname' id='companyname' onChange={(e)=>setCompanyname(e.target.value)} value={companyname} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="abc (Pvt) Ltd."/>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap -mx-3 mb-6">
                                        <div className="w-full px-3">
                                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor='contact'>
                                                Contact
                                            </label>
                                            <input name='contact' id='contact' onChange={(e)=>setContact(e.target.value)} value={contact} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"  type="text" placeholder="+947512314412"/>
                                        </div>
                                    </div>
                                </div>
                                <div className='w-full max-w-lg'>
                                    <div className="flex flex-wrap -mx-3 mb-6">
                                        <div className="w-full px-3">
                                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor='al1'>
                                                Address line 1
                                            </label>
                                            <input name='al1' id='al1' onChange={(e)=>setAddressline1(e.target.value)} value={addressline1} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"  type="text" placeholder="No.85/C"/>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap -mx-3 mb-6">
                                        <div className="w-full px-3">
                                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor='al2'>
                                                Address Line 2
                                            </label>
                                            <input name='al2' id='al2' onChange={(e)=>setAddressline2(e.target.value)} value={addressline2} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"  type="text" placeholder="Colombo"/>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap -mx-3 mb-6">
                                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"  htmlFor='city'>
                                                City <span className='text-red-400 text-xs'>*</span>
                                            </label>
                                            <input name='city' id='city' onChange={(e)=>setCity(e.target.value)} value={city} className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="text" placeholder="colombo"/>
                                            {/*<p class="text-red-500 text-xs italic">* Please fill out this field.</p>*/}
                                        </div>
                                        <div className="w-full md:w-1/2 px-3">
                                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor='zip'>
                                                Zip
                                            </label>
                                            <input onChange={(e)=>setPostalcode(e.target.value)} value={postalcode} name='zip' id='zip' className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="21000"/>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap w-full -mx-3 mb-6">
                                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                            <button className='bg-blue-700 hover:bg-blue-900 px-4 py-2 text-white rounded' onClick={()=>updateSuplier()}>Update</button>
                                            <button className='bg-gray-700 hover:bg-gray-900 px-4 py-2 text-white rounded ml-4' onClick={()=>navigate('/user/supliers')}>Cancel</button>
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

export default EditSuplier
