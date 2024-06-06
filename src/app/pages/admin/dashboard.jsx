import React from 'react'
import DashboadrdSideBar from '../../layouts/dashboadrdSideBar'
import DashItem from '../../components/dashItem';

const Dashboard = () => {
    document.title = "Stockify | Dashboard";

    const items = [
        {name : "Total Customers", count : 20},
        {name : "Total Supliers", count : 12},
        {name : "Toatl Items", count : 200},
        {name : "Total Employees", count : 120}
    ];

  return (
    <div className='flex w-screen'>
        <DashboadrdSideBar />
        <div className='p-7 w-full'>
            <h1 className=' mb-4 text-2xl'>Dashboard</h1>
            <div className='w-full grid lg:grid-cols-4 grid-cols-1 gap-5'>
                {items.map((value, index)=>(
                    <DashItem key={index} name={value.name} count={value.count}/>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Dashboard