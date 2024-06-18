import React from 'react'
import DashboadrdSideBar from '../../layouts/dashboadrdSideBar';

const Settings = () => {
    document.title = "Stockify | Settings";

    return (
        <>
            <DashboadrdSideBar />
            <div className="p-4 sm:ml-64">
                <div className="p-4">
                    <div className='w-full'>
                        <h1 className=' mb-4 text-3xl text-gray-800 font-semibold'>Account Settings</h1>
                        <div className='w-full mt-10'>
                            
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Settings
