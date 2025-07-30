import React from 'react'
import OrderCart from './OrderCart'

const Orders = () => {
  return (
    <div>
      <div className='flex items-center flex-col'>
        <h1 className=' text-xl text-center py-7 font-semibold '>my orders</h1>
        <div className='space-y-5 w-full lg:w-1/2'>
        {
          [1,1,1,1].map((item)=><OrderCart/>)
        }
        </div>
      </div>
    </div>
  )
}

export default Orders