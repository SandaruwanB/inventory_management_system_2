import React, { useEffect, useState } from 'react'
import DashboadrdSideBar from '../../layouts/dashboadrdSideBar';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { apiConfig } from '../../../apiConfig';

const Settings = () => {
    document.title = "New Invent Technologies | Settings";

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");
    const [username, setUsername] = useState("");
    const [address, setAddress] = useState("");

    const [comfound, setComfound] = useState(false);
    const [companyname, setCompanyname] = useState("");
    const [comaddress1, setComaddress1] = useState("");
    const [comaddress2, setComaddress2] = useState("");
    const [comcity, setComcity] = useState("");
    const [comcountry, setComcountry] = useState("");
    const [comweb, setComweb] = useState("");
    const [comemail, setComemail] = useState("");
    const [comcontact, setComcontact] = useState("");
    const [comid, setComid] = useState("");
    const [token, setToken] = useState("");

    const navigate = useNavigate();

    useEffect(()=>{
        setToken(`Bearer ${sessionStorage.getItem('session')}`);
        const getData = ()=>{
            axios.get(`${apiConfig.url}/api/company/all`, {
                headers : {
                    Authorization : token
                }
            }).then(result=>{
                if(result.data.length > 0){
                    setComfound(true);
                    setCompanyname(result.data[0].companyname);
                    setComaddress1(result.data[0].addressline1);
                    setComaddress2(result.data[0].addressline2);
                    setComcity(result.data[0].city);
                    setComcountry(result.data[0].country);
                    setComweb(result.data[0].web);
                    setComemail(result.data[0].email);
                    setComcontact(result.data[0].contactnumber);
                    setComid(result.data[0].id)
                }
            });
        }
        if (token){
            getData();
        }
    },[token]);

    const addCompany = async ()=>{
        await axios.post(`${apiConfig.url}/api/company/add`, {
            companyname : companyname,
            addressline1 : comaddress1,
            addressline2 : comaddress2,
            city : comcity,
            country : comcountry,
            web : comweb,
            email : comemail,
            contactnumber : comcontact
        }).then(result=>{
            if(result.status === 200){
                setComid(result.data.id);
                setComfound(true);
                toast.info('Company data created!', {
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
        });
    }

    const updateCompany = async ()=>{
        await axios.put(`${apiConfig.url}/api/company/update/${comid}`,{
            companyname : companyname,
            addressline1 : comaddress1,
            addressline2 : comaddress2,
            city : comcity,
            country : comcountry,
            web : comweb,
            email : comemail,
            contactnumber : comcontact
        }).then(result=>{
            if (result.status === 200){
                toast.info('Company data updated!', {
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

    const updateUserDetails = ()=>{

    }

    const changePassword = ()=>{

    }

    const logOut = ()=>{
        navigate('/');
    }

    const removeAccount = ()=>{

    }


    return (
        <>
            <DashboadrdSideBar />
            <div className="p-4 sm:ml-64">
                <div className="p-4">
                    <div className='w-full'>
                        <h1 className=' mb-4 text-3xl text-gray-800 font-semibold'>Settings</h1>
                        <h1 className='font-semibold text-gray-700 mt-10'>Personal details</h1>
                        <div className='w-full bg-gray-400 h-[2px]'></div>
                        <div className='w-full mt-10'>
                            <div className="w-full">
                                <div className='grid md:grid-cols-2 grid-cols-1 gap-2'>
                                    <div className='w-full max-w-lg'>
                                        <div className="flex flex-wrap -mx-3 mb-6">
                                            <div className="w-full px-3">
                                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor='uname' >
                                                    User Name
                                                </label>
                                                <input name='uname' id='uname' onChange={(e)=>setUsername(e.target.value)} value={username} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="example123" autoComplete='1'/>
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap -mx-3 mb-6">
                                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor='firstname'>
                                                    First Name
                                                </label>
                                                <input onChange={(e)=>setFirstname(e.target.value)} value={firstname} name='firstname' id='firstname' className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"  type="text" placeholder="first name"/>
                                                {/*<p class="text-red-500 text-xs italic">* Please fill out this field.</p>*/}
                                            </div>
                                            <div className="w-full md:w-1/2 px-3">
                                                <label  htmlFor='lastname' className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                                    Last Name
                                                </label>
                                                <input onChange={(e)=>setLastname(e.target.value)} value={lastname} name='lastname' id='lastname' className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="last name"/>
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap -mx-3 mb-6">
                                            <div className="w-full px-3">
                                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor='email' >
                                                    Email 
                                                </label>
                                                <input name='email' id='email' onChange={(e)=>setEmail(e.target.value)} value={email} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="email" placeholder="example@gmail.com" autoComplete='1'/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='w-full max-w-lg'>
                                        <div className="flex flex-wrap -mx-3 mb-6">
                                            <div className="w-full px-3">
                                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor='contact'>
                                                    Contact
                                                </label>
                                                <input name='contact' id='contact' onChange={(e)=>setContact(e.target.value)} value={contact} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"  type="text" placeholder="+947512314412"/>
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap -mx-3 mb-6">
                                            <div className="w-full px-3">
                                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor='address'>
                                                    Address
                                                </label>
                                                <input name='address' id='address' onChange={(e)=>setAddress(e.target.value)} value={address} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" autoComplete='True' type="text" placeholder="Kandy"/>
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap w-full -mx-3 mb-6">
                                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                                <button className='bg-blue-700 hover:bg-blue-900 px-4 py-2 text-white rounded' onClick={()=>updateUserDetails()}>Update</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>                       
                            </div>
                        </div>
                        <h1 className='font-semibold text-gray-700 mt-10'>Password details</h1>
                        <div className='w-full bg-gray-400 h-[2px]'></div>
                        <div className='w-full mt-10'>
                            <div className="w-full">
                                <div className='grid md:grid-cols-2 grid-cols-1 gap-2'>
                                    <div className='w-full max-w-lg'>
                                        <div className="flex flex-wrap -mx-3 mb-6">
                                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor='oldpw'>
                                                    Old password
                                                </label>
                                                <input onChange={(e)=>setFirstname(e.target.value)} value={firstname} name='oldpw' id='oldpw' className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"  type="text" placeholder="******************"/>
                                                {/*<p class="text-red-500 text-xs italic">* Please fill out this field.</p>*/}
                                            </div>
                                            <div className="w-full md:w-1/2 px-3">
                                                <label  htmlFor='newpw' className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                                    new password
                                                </label>
                                                <input onChange={(e)=>setLastname(e.target.value)} value={lastname} name='newpw' id='newpw' className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="******************"/>
                                            </div>
                                            <div className="w-full md:w-1/2 px-3">
                                                <label  htmlFor='conpw' className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                                    confirm password
                                                </label>
                                                <input onChange={(e)=>setLastname(e.target.value)} value={lastname} name='conpw' id='conpw' className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="******************"/>
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap w-full -mx-3 mb-6">
                                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                                <button className='bg-blue-700 hover:bg-blue-900 px-4 py-2 text-white rounded' onClick={()=>changePassword()}>Update</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <h1 className='font-semibold text-gray-700 mt-10'>Company details</h1>
                        <div className='w-full bg-gray-400 h-[2px]'></div>
                        <div className='w-full mt-10'>
                            <div className="w-full">
                                <div className='grid md:grid-cols-2 grid-cols-1 gap-2'>
                                    <div className='w-full max-w-lg'>
                                        <div className="flex flex-wrap -mx-3 mb-6">
                                            <div className="w-full px-3">
                                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor='companyname' >
                                                    Company Name
                                                </label>
                                                <input name='companyname' id='companyname' onChange={(e)=>setCompanyname(e.target.value)} value={companyname} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="mycompany (Pvt) Ltd." autoComplete='1'/>
                                            </div>
                                            <div className="w-full px-3">
                                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor='adr1' >
                                                    address line 1
                                                </label>
                                                <input name='adr1' id='adr1' onChange={(e)=>setComaddress1(e.target.value)} value={comaddress1} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="kandy" autoComplete='1'/>
                                            </div>
                                            <div className="w-full px-3">
                                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor='adr2' >
                                                    address line 2
                                                </label>
                                                <input name='adr2' id='adr2' onChange={(e)=>setComaddress2(e.target.value)} value={comaddress2} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="kandy" autoComplete='1'/>
                                            </div>
                                            <div className="w-full px-3">
                                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor='city' >
                                                    city
                                                </label>
                                                <input name='city' id='city' onChange={(e)=>setComcity(e.target.value)} value={comcity} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="kandy" autoComplete='1'/>
                                            </div>
                                            <div className="w-full px-3">
                                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor='country' >
                                                    country
                                                </label>
                                                <input name='country' id='country' onChange={(e)=>setComcountry(e.target.value)} value={comcountry} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="sri lanka" autoComplete='1'/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='w-full max-w-lg'>
                                        <div className="flex flex-wrap -mx-3 mb-6">
                                            <div className="w-full px-3">
                                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor='web' >
                                                    website
                                                </label>
                                                <input name='web' id='web' onChange={(e)=>setComweb(e.target.value)} value={comweb} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="www.mycompany.com" autoComplete='1'/>
                                            </div>
                                            <div className="w-full px-3">
                                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor='comemail' >
                                                    email
                                                </label>
                                                <input name='comemail' id='comemail' onChange={(e)=>setComemail(e.target.value)} value={comemail} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="example@gmail.com" autoComplete='1'/>
                                            </div>
                                            <div className="w-full px-3">
                                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor='comcontact' >
                                                    contact number
                                                </label>
                                                <input name='comcontact' id='comcontact' onChange={(e)=>setComcontact(e.target.value)} value={comcontact} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="+942653615" autoComplete='1'/>
                                            </div>
                                            
                                        </div>
                                        <div className="flex flex-wrap w-full -mx-3 mb-6">
                                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                                {
                                                    comfound ? <button className='bg-blue-700 hover:bg-blue-900 px-4 py-2 text-white rounded' onClick={()=>updateCompany()}>Update</button> :                                                   
                                                    <button className='bg-blue-700 hover:bg-blue-900 px-4 py-2 text-white rounded' onClick={()=>addCompany()}>Save</button>
                                                }
                                                
                                            </div>
                                        </div>                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                        <h1 className='font-semibold text-gray-700 mt-10'>High security area</h1>
                        <div className='w-full bg-gray-400 h-[2px]'></div>
                        <div className='w-full mt-10'>
                            <div className="w-full">
                                <div className='grid md:grid-cols-2 grid-cols-1 gap-2'>
                                    <div className="flex flex-wrap w-full -mx-3 mb-6">
                                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                            <button className='bg-blue-700 hover:bg-blue-900 px-4 py-2 text-white rounded' onClick={()=>logOut()}>Log Out</button>
                                            <button className='bg-red-600 hover:bg-red-800 px-4 py-2 text-white rounded ml-4' onClick={()=>removeAccount()}>Remove Account</button>
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

export default Settings
