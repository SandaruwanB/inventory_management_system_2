import React, { useEffect, useState } from 'react';
import DashboadrdSideBar from '../../layouts/dashboadrdSideBar';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';
import { apiConfig } from '../../../apiConfig';

 
 const InventoryComponents = () => {
    document.title = "Stockify | Inventory Details";

    const [grns, setGrns] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredGrns, setFilteredGrns] = useState([]);
    const [token, setToken] = useState("");
    
    useEffect(() => {
        setToken(`Bearer ${sessionStorage.getItem('session')}`);
        const getData = ()=>{
            axios.get(`${apiConfig.url}/api/inventory/all`, {
                headers : {
                    Authorization : token
                }
            }).then(result => {
                setGrns(result.data);
                setFilteredGrns(result.data); 
            });
        }
        if (token){
            getData();
        }
    }, [token]);

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        if (query === "") {
            setFilteredGrns(grns);
        } else {
            setFilteredGrns(grns.filter(item => item.prodctname.toLowerCase().includes(query)));
        }
    };

    return (
        <>
            <DashboadrdSideBar />
            <div className="p-4 sm:ml-64">
                <div className="p-4">
                    <div className='w-full'>
                        <h1 className=' mb-4 text-3xl text-gray-800 font-semibold'>Inventory Details</h1>
                        <div className='w-full mt-10'>
                            <div className='w-full flex justify-between'>
                                <div></div>
                                <div className='flex'>
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={handleSearch}
                                        className="p-2 border border-gray-300 rounded"
                                        placeholder="Search Products..."
                                    />
                                    <div className='text-gray-800 ml-4'>
                                        showing results <span className='text-blue-950 font-bold'>{filteredGrns.length}</span>
                                    </div>
                                </div>
                            </div>
                            <table className='w-full table-fixed border-collapse mt-3'>
                                <thead className='bg-gray-200 border-b-2 border-gray-400'>
                                    <tr>
                                        <th className='p-3 text-sm font-semibold tracking-wide text-left w-10'>No.</th>
                                        <th className='p-3 text-sm font-semibold tracking-wide text-left'>Product</th>
                                        <th className='p-3 text-sm font-semibold tracking-wide text-left'>On hand Qty</th>
                                        <th className='p-3 text-sm font-semibold tracking-wide text-left'>Out Qty</th>
                                        <th className='p-3 text-sm font-semibold tracking-wide text-left'>In Qty</th>
                                    </tr>
                                </thead>
                                <tbody className='divide-y divide-gray-200'>
                                    {
                                        filteredGrns.length > 0 ?
                                            filteredGrns.map((value, index) => {
                                                return (
                                                    <tr className={(index % 2) === 0 ? 'bg-white' : 'bg-gray-100'} key={index}>
                                                        <td className='p-3 text-sm text-gray-700'>{index + 1}</td>
                                                        <td className='p-3 text-sm text-gray-700'>{value.prodctname}</td>
                                                        <td className='p-3 text-sm text-gray-700'>{value.onhandqty}</td>
                                                        <td className='p-3 text-sm text-gray-700'>{value.outqty}</td>   
                                                        <td className='p-3 text-sm text-gray-700'>{ value.inqty }</td>                                                     
                                                    </tr>
                                                )
                                            })
                                            :
                                            <tr className='bg-white'>
                                                <td className='text-center text-blue-400 hover:underline cursor-pointer text-sm p-3' colSpan={5}>
                                                    <p>No Products Found.</p>
                                                </td>
                                            </tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
 }
 
 export default InventoryComponents