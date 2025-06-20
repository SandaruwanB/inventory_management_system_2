import React from 'react'
import { InfinitySpin } from 'react-loader-spinner'

function Loader({color}) {
  return (
    <div className='flex flex-1 justify-center items-center h-screen'>
        <div className='items-center'>
            <InfinitySpin 
                visible={true}
                width="200"
                color={color}
                ariaLabel="infinity-spin-loading"
            />
            <div className='text-center text-gray-700 text-sm'>
                <span className='animate-bounce'>Loading...</span>
            </div>
        </div>
    </div>
  )
}

export default Loader