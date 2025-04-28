import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DashboadrdSideBar from '../../../layouts/dashboadrdSideBar';
import axios from 'axios';
import { apiConfig } from '../../../../apiConfig';
import { ToastContainer } from 'react-toastify';
import { PDFDownloadLink } from '@react-pdf/renderer';
import GrnPDF from '../../../components/grnPDF';

const EditGrn = () => {
    document.title = "New Invent Technologies | GRN";

    const [grn, setGrn] = useState([]);
    const [selected, setSelected] = useState([]);
    const [suplier, setSuplier] = useState([]);
    const [company, setCompany] = useState([]);
    const [token, setToken] = useState("");

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        setToken(`Bearer ${sessionStorage.getItem('session')}`);
        const getData = ()=>{
            axios.get(`${apiConfig.url}/api/company/all`, {
                headers : {
                  Authorization : token
                }
              }).then(result=>{
                setCompany(result.data[0]);
            });      
            axios.get(`${apiConfig.url}/api/grn/get/${id}`, {
                headers : {
                  Authorization : token
                }
              }).then(result=>{
                setGrn(result.data);
                setSelected(result.data.movements);
                setSuplier(result.data.suplier);
            });
        }
        if (token){
            getData();
        }
    },[id, token]);



  return (
      <>
          <DashboadrdSideBar />
          <div className="p-4 sm:ml-64">
              <div className="p-4">
                  <div className='w-full'>
                      <h1 className=' mb-4 text-2xl text-gray-800 font-semibold'><span className='text-md text-blue-950 hover:underline cursor-pointer' onClick={()=>navigate("/user/grn")}>GRN</span> / {grn.grncode}</h1>
                      <div className='mt-10 flex justify-between'>
                          <div>
                              <h1 className='font-semibold text-gray-700'>View GRN details</h1>
                          </div>
                          <div className='mr-2'>
                              <PDFDownloadLink document={<GrnPDF suplier={suplier} selected={selected} company={company} grn={grn} />} fileName='grn'>
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
                                              <input name='payslip' id='username' value={grn.grncode} className="appearance-none block uppercase text-4xl w-full text-gray-700 py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" readOnly/>
                                          </div>
                                      </div>
                                      <div className="flex flex-wrap -mx-3 mb-6">
                                          <div className="w-full px-3">
                                              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor='suplier'>
                                                  Suplier <span className='text-red-400 text-xs'>*</span>
                                              </label>
                                              <select id='suplier' value={0} name='suplier' className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" readOnly>
                                                  <option>{grn.suplier ? grn.suplier.firstname + " " + grn.suplier.lastname + " " + grn.suplier.companyname + " " + grn.suplier.city : ""}</option>
                                              </select>
                                          </div>
                                      </div>
                                      <div className="flex flex-wrap -mx-3 mb-6">
                                          <div className="w-full px-3">
                                              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor='date'>
                                                  Date <span className='text-red-400 text-xs'>*</span>
                                              </label>
                                              <input name='date' id='date' value={grn.date} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"  type="date" readOnly/>
                                          </div>
                                      </div>
                                  </div>
                                  <div className='w-full max-w-lg'>
                                      <div className="flex flex-wrap -mx-3 mb-6">
                                          <div className="w-full px-3">
                                              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor='note' >
                                                  Note
                                              </label>
                                              <textarea rows={5} name='note' id='note' className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"  type="text" placeholder="note" readOnly>{grn.note}</textarea>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <h1 className='font-semibold text-gray-700 mt-2'>Products Details</h1>
                      <div className='w-full bg-gray-400 h-[2px]'></div>
                      <div className='w-100'>
                          <table className='w-full table-fixed border-collapse mt-3'>
                              <thead className='bg-gray-200 border-b-2 border-gray-400'>
                                  <tr>
                                      <th className='p-1 text-sm font-semibold tracking-wide text-left pl-5'>Product</th>
                                      <th className='p-1 text-sm font-semibold tracking-wide text-left'>Count</th>
                                      <th className='p-1 text-sm font-semibold tracking-wide text-center'>Availability</th>
                                  </tr>
                              </thead>
                              <tbody>
                                  {
                                    selected.map((value, index)=>(
                                      <tr key={index}>
                                          <td className='p-1 text-sm font-semibold tracking-wide text-left pl-5'>{value.product.prodctname}</td>
                                          <td className='p-1 text-sm font-semibold tracking-wide text-left'>{value.quantity}</td>
                                          <td className='p-1 text-sm font-semibold tracking-wide text-center'>{value.product.onhandqty > 10  ? <p className='text-green-600'>available</p> : <p className='text-red-600'>Low stock</p>}</td>
                                      </tr>
                                    ))
                                  }
                              </tbody>
                          </table>
                          <div className='mt-10 w-100'>
                              <button onClick={()=>navigate('/user/grn')} className='ml-4 bg-gray-700 hover:bg-gray-900 px-4 py-2 text-white rounded'>Back</button>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <ToastContainer />
      </>
  )
}

export default EditGrn
