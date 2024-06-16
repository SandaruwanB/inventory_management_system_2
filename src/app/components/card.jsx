import React from 'react'
import { Icon } from '@iconify/react'

const Card = ({image, name, contact, address, index}) => {
  return (
        <div className='h-full flex justify-center'>
            <div className='bg-gray-200 p-5 rounded-md hover:bg-gray-300 cursor-pointer'>
                <img src={image} alt="def_img" width={90} />
                <div className='mt-2'>
                    <p>{name}</p>
                    <p className='text-gray-600 text-sm'>{address}</p>
                    <p className='text-gray-600 text-sm'>{contact}</p>
                </div>
                <div className='flex justify-between mt-3'>
                    <button className='text-white bg-green-600 p-1 rounded hover:bg-green-800' ><Icon icon="basil:edit-solid" width={20} /></button>
                    <button className='text-white bg-red-600 p-1 rounded hover:bg-red-800'><Icon icon="material-symbols-light:delete" width={20} /></button>
                </div>
            </div>
        </div>
  )
}

export default Card
