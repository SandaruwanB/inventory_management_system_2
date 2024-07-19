import React from 'react'

const DashItem = ({name, count}) => {
  return (
    <div className='p-10 text-center bg-gradient-to-br from-green-700 to-blue-700 rounded-lg drop-shadow-lg'>
        <p className='text-white font-bold text-5xl'>{count}</p>
        <h1 className='text-white mt-3'>{name}</h1>
    </div>
  )
}

export default DashItem