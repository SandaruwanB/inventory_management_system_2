import React from 'react';
import DashboadrdSideBar from '../../layouts/dashboadrdSideBar';
import { Icon } from '@iconify/react';
import Card from '../../components/card';

const Inventory = () => {
    document.title = "Stockify | Inventory";

    const inventory = [
        {
            "name" : "Paper Bundle 12",
            "image" : "/assets/images/productSample.png",
            "qty" : 10,
        },
        {
            "name" : "A4 100 bundle",
            "image" : "/assets/images/productSample.png",
            "qty" : 0,
        }
    ];

    const addNew = ()=>{
        console.log("Add new clicked");
    }

    const editEmployee = (id)=>{
        console.log("Edit clicked" + id);
    }

    const removeEmployee = (id)=>{
        console.log("Delete clicked" + id);
    }

    return (
    <div className='flex w-screen'>
        <DashboadrdSideBar />
        <div className='p-7 w-full'>
            <h1 className=' mb-4 text-3xl text-gray-800 font-semibold ml-10'>Inventory</h1>
            <div className='w-full mt-10'>
                <div className='w-full flex justify-between'>
                    <div>
                    </div>
                    <div className='flex'>
                        <div className=' text-gray-800 '>
                            showing results <span className='text-blue-950 font-bold'>{inventory.length}</span>
                        </div>                       
                    </div>
                </div>
                <div className='grid lg:grid-cols-7 gap-5 mt-5 w-full md:grid-cols-3 sm:grid-cols-2 grid-cols-1'>
                    <div className='bg-gray-200 w-full p-4 cursor-pointer rounded hover:bg-gray-300' onClick={()=>addNew()}>
                        <div className='text-center w-full flex justify-center items-center text-gray-600'>
                            <Icon icon="icon-park-solid:add" width={150} />
                        </div>
                        <div className='text-center font-semibold mt-2'>
                            Add New
                        </div>
                    </div>
                    {
                        inventory.map((value, index)=>{
                            return (
                                <Card image={value.image} name={value.name} qty={value.qty} key={index} index={index} />
                            );
                        })
                    }
                </div>
            </div>
        </div>
    </div>
    )
}

export default Inventory
