import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DashboadrdSideBar from '../../../layouts/dashboadrdSideBar';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { apiConfig } from '../../../../apiConfig';
import validator from 'validator';

const EditUser = () => {
    document.title = "Stockify | Users";

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [contact, setContact] = useState("");
    const [address, setAddress] = useState("");
    const [role, setRole] = useState("");
    const [password, setPasssword] = useState("");

    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        axios.get(`${apiConfig.url}/api/users/get/${id}`).then(result=>{
            setUsername(result.data.username);
            setEmail(result.data.email);
            setFirstname(result.data.firstname);
            setLastname(result.data.lastname);
            setContact(result.data.phone);
            setAddress(result.data.address);
            setRole(result.data.role)
        });
    },[id]);

    const updateUser = async ()=>{
        if (username === "" || firstname === "" || lastname === "" || email === "" || role === ""){
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
            toast.error('Invalid email address!', {
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
            await axios.put(`${apiConfig.url}/api/users/update/${id}`, {
                username : username,
                email : email,
                password : password,
                firstname : firstname,
                lastname : lastname,
                phone : contact,
                address : address,
                role : role,
                updatedAt : Date.now()
            }).then(result=>{
                if (result.status === 200){
                    toast.success('Succesfully Recorded.!', {
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
            }).catch(err=>{
                toast.error('This details already exists!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            })
        }
    }

  return (
    <>
        <DashboadrdSideBar />
        <div className="p-4 sm:ml-64">
            <div className="p-4">
                <div className='w-full'>
                    <h1 className=' mb-4 text-2xl text-gray-800 font-semibold'><span className='text-md text-blue-950 hover:underline cursor-pointer' onClick={()=>navigate("/user/users")}>Users</span> / Edit</h1>
                    <h1 className='font-semibold text-gray-700 mt-10'>Edit user details</h1>
                    <div className='w-full bg-gray-400 h-[2px]'></div>
                    <div className='w-full mt-10'>
                        <div className="w-full">
                            <div className='grid md:grid-cols-2 grid-cols-1 gap-2'>
                                <div className='w-full max-w-lg'>
                                    <div className="flex flex-wrap -mx-3 mb-6">
                                        <div className="w-full px-3">
                                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor='username' >
                                                User name <span className='text-red-400 text-xs'>*</span>
                                            </label>
                                            <input name='username' id='username' onChange={(e)=>setUsername(e.target.value)} value={username} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="example"/>
                                        </div>
                                    </div>
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
                                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor='address' >
                                                Address
                                            </label>
                                            <input name='address' id='address' onChange={(e)=>setAddress(e.target.value)} value={address} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="Kandy"/>
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
                                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor='password'>
                                                Password <span className='text-red-400 text-xs'>*</span>
                                            </label>
                                            <input name='password' id='password' onChange={(e)=>setPasssword(e.target.value)} value={password} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"  type="text" placeholder="******************"/>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap -mx-3 mb-6">
                                        <div className="w-full px-3">
                                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor='gender'>
                                                Role <span className='text-red-400 text-xs'>*</span>
                                            </label>
                                            <select id='gender' name='gender' onChange={(e)=>setRole(e.target.value)} value={role} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" >
                                                <option >None</option>
                                                <option value="user">User</option>
                                                <option value="admin" >Admin</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap w-full -mx-3 mb-6">
                                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                            <button className='bg-blue-700 hover:bg-blue-900 px-4 py-2 text-white rounded' onClick={()=>updateUser()}>Update</button>
                                            <button className='bg-gray-700 hover:bg-gray-900 px-4 py-2 text-white rounded ml-4' onClick={()=>navigate('/user/users')}>Cancel</button>
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

export default EditUser
