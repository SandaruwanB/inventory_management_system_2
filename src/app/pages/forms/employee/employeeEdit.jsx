import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import DashboadrdSideBar from '../../../layouts/dashboadrdSideBar';
import { ToastContainer, toast } from 'react-toastify';
import { apiConfig } from '../../../../apiConfig';
import validator from 'validator';

const EmployeeEdit = () => {
  document.title = "Stockify | Employees";

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [jobtitle, setJobtitle] = useState("");
  const [contact, setContact] = useState("");
  const [addressline1, setAddressline1] = useState("");
  const [addressline2, setAddressline2] = useState("");
  const [city, setCity] = useState("");
  const [postalcode, setPostalcode] = useState("");
  const [gender, setGender] = useState("");
  const [epf, setEpf] = useState("");
  const [nic, setNic] = useState("");
  const [isWorking, setIsWorking] = useState(1);
  const navigate = useNavigate();

  const {id} = useParams();

  useEffect(()=>{
    axios.get(`${apiConfig.url}/api/employees/get/${id}`).then(result=>{
        setFirstname(result.data.firstname); 
        setLastname(result.data.lastname);
        setEmail(result.data.email);
        setJobtitle(result.data.jobtitle);
        setContact(result.data.contact);
        setAddressline1(result.data.addressline1);
        setAddressline2(result.data.addressline2);
        setCity(result.data.city);
        setPostalcode(result.data.postalcode);
        setGender(result.data.gender);
        setEpf(result.data.epfnumber);
        setNic(result.data.nic);
        setIsWorking(result.data.is_working);
      });
  },[id]);

  const updateEmployee = ()=>{
      if (firstname === "" || lastname === "" || email === "" || jobtitle === "" || city === "" || epf === ""){
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
      else if(!validator.isEmail(email)){
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
          axios.put(`${apiConfig.url}/api/employees/update/${id}`,{
                email : email,
                firstname : firstname,
                lastname : lastname,
                gender : gender,
                jobtitle : jobtitle,
                contact : contact,
                addressline1 : addressline1,
                addressline2 : addressline2,
                city : city,
                postalcode : postalcode,
                epfnumber : epf,
                nic : nic,
                is_working : isWorking
          }).then(result=>{
            if(result.status === 200){
                  toast.success('Successfully Updated!', {
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
                      <h1 className=' mb-4 text-2xl text-gray-800 font-semibold'><span className='text-md text-blue-950 hover:underline cursor-pointer' onClick={()=>navigate("/user/employees")}>Employees</span> / Edit</h1>
                      <h1 className='font-semibold text-gray-700 mt-10'>Edit employee details</h1>
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
                                              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor='job' >
                                                  Job title <span className='text-red-400 text-xs'>*</span>
                                              </label>
                                              <input name='job' id='job' onChange={(e)=>setJobtitle(e.target.value)} value={jobtitle} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="manager"/>
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
                                      <div className="flex flex-wrap -mx-3 mb-6">
                                          <div className="w-full px-3">
                                              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor='epf'>
                                                  EPf number
                                              </label>
                                              <input name='epf' id='epf' onChange={(e)=>setEpf(e.target.value)} value={epf} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"  type="text" placeholder="GK123"/>
                                          </div>
                                      </div>
                                      <div className="flex flex-wrap -mx-3 mb-6">
                                        <div className="w-full px-3">
                                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor='nic'>
                                                NIC number
                                            </label>
                                            <input name='nic' id='nic' onChange={(e)=>setNic(e.target.value)} value={nic} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"  type="text" placeholder="995261561315v"/>
                                        </div>
                                       </div>
                                  </div>
                                  <div className='w-full max-w-lg'>
                                      <div className="flex flex-wrap -mx-3 mb-6">
                                            <div className="w-full px-3">
                                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor='isworking'>
                                                    Is Currently Working
                                                </label>
                                                <select id='isworking' name='isworking' onChange={(e)=>setIsWorking(e.target.value)} value={isWorking} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" >
                                                    <option value={1}>Yes</option>
                                                    <option value={0} >No</option>
                                                </select>
                                            </div>
                                      </div>
                                      <div className="flex flex-wrap -mx-3 mb-6">
                                          <div className="w-full px-3">
                                              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor='gender'>
                                                  Gender
                                              </label>
                                              <select id='gender' name='gender' onChange={(e)=>setGender(e.target.value)} value={gender} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" >
                                                  <option value="none">None</option>
                                                  <option value="male">Male</option>
                                                  <option value="female" >Female</option>
                                              </select>
                                          </div>
                                      </div>
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
                                              <button className='bg-blue-700 hover:bg-blue-900 px-4 py-2 text-white rounded' onClick={()=>updateEmployee()}>Update</button>
                                              <button className='bg-gray-700 hover:bg-gray-900 px-4 py-2 text-white rounded ml-4' onClick={()=>navigate('/user/employees')}>Cancel</button>
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

export default EmployeeEdit
