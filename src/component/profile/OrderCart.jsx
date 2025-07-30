import { Card,Button } from '@mui/material'
import React from 'react'

const OrderCart = () => {
  return (
    <Card className='flex justify-between items-center p-5'>
        <div className='flex items-center space-x-5 '>
            <img className='h-20 w-20' src="https://cdn.pixabay.com/photo/2022/02/12/15/03/biryani-7009119_1280.jpg" alt="" />
        </div>
        <div>
            <p>Biryani</p>
            <p>Rs.600</p>
        </div>
        <div>
            <Button className='cursor-not-allowed'>Completed</Button>
        </div>
    </Card>
  )
}

export default OrderCart