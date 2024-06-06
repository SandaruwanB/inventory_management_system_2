import React from 'react'
import DashboadrdSideBar from '../../layouts/dashboadrdSideBar'

const Dashboard = () => {
  return (
    <div className='flex'>
        <DashboadrdSideBar />
        <div className='p-7'>content</div>
    </div>
  )
}

export default Dashboard