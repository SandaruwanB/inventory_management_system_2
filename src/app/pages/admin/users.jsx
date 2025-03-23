import React, { useEffect, useState } from 'react';
import DashboadrdSideBar from '../../layouts/dashboadrdSideBar';
import { confirmDialog, ConfirmDialog } from 'primereact/confirmdialog';
import { ToastContainer, toast } from 'react-toastify';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { apiConfig } from '../../../apiConfig';

const Users = () => {
    document.title = "Stockify | Users";

    const [users, setUsers] = useState([]);
    const [popupvisibility, setPopupvisibility] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [token, setToken] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        setToken(`Bearer ${sessionStorage.getItem('session')}`);
        const getData = ()=>{
            axios.get(`${apiConfig.url}/api/users/all`, {
                headers : {
                    Authorization : token
                }
            }).then(result => {
                setUsers(result.data);
                setFilteredUsers(result.data);
            })
        }
        if (token){
            getData();
        }
    }, [token])

    const editUser = (id) => {
        navigate(`/user/users/edit/${id}`);
    }

    const removeUser = (id) => {
        setPopupvisibility(true);
        confirmDialog({
            message: 'Are you sure you want to remove this user?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => deleteUser(id),
            reject: () => { setPopupvisibility(false) },
            rejectClassName: 'mr-2 bg-transparent',
            acceptClassName: 'bg-red-600 text-white px-3 py-1 hover:bg-red-700'
        });
    }

    const deleteUser = async (id) => {
        setPopupvisibility(false);
        await axios.delete(`${apiConfig.url}/api/users/delete/${id}`, {
            headers : {
                Authorization : token
            }
        }).then(() => {
            toast.info('Successfully Removed!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            const remainingUsers = users.filter((result) => result.id !== id);
            setUsers(remainingUsers);
            setFilteredUsers(remainingUsers);
        })
    }

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        if (query === "") {
            setFilteredUsers(users);
        } else {
            setFilteredUsers(users.filter(user =>
                `${user.firstname} ${user.lastname}`.toLowerCase().includes(query)
                || user.email.toLowerCase().includes(query)
                || user.username.toLowerCase().includes(query)
                || user.phone.toLowerCase().includes(query)
                || user.address.toLowerCase().includes(query)
                || user.role.toLowerCase().includes(query)
            ));
        }
    };

    return (
        <>
            <DashboadrdSideBar />
            <div className="p-4 sm:ml-64">
                <div className="p-4">
                    <div className='w-full'>
                        <h1 className='mb-4 text-3xl text-gray-800 font-semibold'>Users</h1>
                        <div className='w-full mt-10'>
                            <div className='w-full flex justify-between'>
                                <div>
                                    <button onClick={() => navigate('/user/users/add')} className='bg-green-800 hover:bg-green-950 text-white font-semibold px-3 py-1 rounded'>Add New</button>
                                </div>
                                <div className='flex'>
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={handleSearch}
                                        className="p-2 border border-gray-300 rounded"
                                        placeholder="Search Users..."
                                    />
                                    <div className='text-gray-800 ml-4'>
                                        showing results <span className='text-blue-950 font-bold'>{filteredUsers.length}</span>
                                    </div>
                                </div>
                            </div>
                            <table className='w-full table-fixed border-collapse mt-3'>
                                <thead className='bg-gray-200 border-b-2 border-gray-400'>
                                    <tr>
                                        <th className='p-3 text-sm font-semibold tracking-wide text-left w-10'>No.</th>
                                        <th className='p-3 text-sm font-semibold tracking-wide text-left'>User Name</th>
                                        <th className='p-3 text-sm font-semibold tracking-wide text-left'>Email Address</th>
                                        <th className='p-3 text-sm font-semibold tracking-wide text-left'>Name</th>
                                        <th className='p-3 text-sm font-semibold tracking-wide text-left'>Phone</th>
                                        <th className='p-3 text-sm font-semibold tracking-wide text-left'>Address</th>
                                        <th className='p-3 text-sm font-semibold tracking-wide text-left'>Role</th>
                                        <th className='p-3 text-sm font-semibold tracking-wide text-left'>Actions</th>
                                    </tr>
                                </thead>
                                <tbody className='divide-y divide-gray-200'>
                                    {
                                        filteredUsers.length > 0 ?
                                            filteredUsers.map((value, index) => {
                                                return (
                                                    <tr className={(index % 2) === 0 ? 'bg-white' : 'bg-gray-100'} key={index}>
                                                        <td className='p-3 text-sm text-gray-700'>{index + 1}</td>
                                                        <td className='p-3 text-sm text-gray-700'>{value.username}</td>
                                                        <td className='p-3 text-sm text-gray-700'>{value.email}</td>
                                                        <td className='p-3 text-sm text-gray-700'>{value.firstname + " " + value.lastname}</td>
                                                        <td className='p-3 text-sm text-gray-700'>{value.phone}</td>
                                                        <td className='p-3 text-sm text-gray-700'>{value.address}</td>
                                                        <td className='p-3 text-sm text-gray-700'>{value.role}</td>
                                                        <td className='p-3 text-sm text-gray-700'>
                                                            <button className='hover:text-green-500' onClick={() => editUser(value.id)}><Icon icon="basil:edit-solid" width={26} /></button>
                                                            <button className='ml-4 hover:text-red-500' onClick={() => removeUser(value.id)}><Icon icon="material-symbols-light:delete" width={28} /></button>
                                                            <ConfirmDialog visible={popupvisibility} />
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                            :
                                            <tr className='bg-white'>
                                                <td className='text-center text-blue-400 hover:underline cursor-pointer text-sm p-3' colSpan={8}>
                                                    <p>No users found.</p>
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

export default Users;
