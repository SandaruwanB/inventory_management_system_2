import React from 'react'
import DashboadrdSideBar from '../../layouts/dashboadrdSideBar';

const Settings = () => {
    document.title = "Stockify | Settings";

    return (
        <div className='flex w-screen'>
            <DashboadrdSideBar />
            <div className='p-7 w-full'>
                <h1 className=' mb-4 text-3xl text-gray-800 font-semibold ml-10'>Settings</h1>
                <div className='w-full mt-10'>
                    
                </div>
            </div>
        </div>
    )
}

export default Settings
