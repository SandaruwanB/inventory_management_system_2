import React from 'react'
import { Icon } from '@iconify/react'

const Card = ({image, name, contact, address, index, qty, price}) => {
  return (
    <div className='bg-gray-200 w-full p-4 cursor-pointer rounded hover:bg-gray-300'>
        <div className='text-center w-full flex justify-center items-center text-gray-600'>
            <img src={image} alt="image" className='rounded-md' />
        </div>
        <div className='flex justify-between font-semibold mt-4 text-gray-800'>
            <div>{name}</div>
            <div className={`${qty > 0 ? 'text-green-700' : 'text-red-700'}`}>{qty}</div>
        </div>
    </div>
  )
}

export default Card
