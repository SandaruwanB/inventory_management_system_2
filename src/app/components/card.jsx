import React from 'react'
import { Icon } from '@iconify/react'

const Card = ({image, name, contact, address, index, qty, price}) => {

    return (
        <div className='bg-gray-200 w-full p-4 cursor-pointer rounded hover:bg-gray-300'>
            <div className='text-center w-full flex justify-center items-center text-gray-600'>
                <img src={image} alt="pro_image" className='rounded-md' />
            </div>
            <div className='flex justify-between font-semibold mt-4 text-gray-800'>
                <div>{name}</div>
                <div className={`${qty > 0 ? 'text-green-700' : 'text-red-700'}`}>{qty}</div>
            </div>
            <div className='flex justify-between mt-3 text-white'>
                <button className='bg-gray-600 p-1 rounded-md hover:bg-gray-800' ><Icon icon="basil:edit-solid" width={24} /></button>
                <button className='bg-red-600 p-1 rounded-md hover:bg-red-800' ><Icon icon="material-symbols-light:delete" width={26}/></button>
            </div>
        </div>
    )
}

export default Card
