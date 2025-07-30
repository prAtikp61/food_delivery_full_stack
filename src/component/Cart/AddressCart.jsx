import React from 'react'

import HomeIcon from '@mui/icons-material/Home';
import { Button, Card } from '@mui/material';

const AddressCart = ({item,showButton,handleSelectAddress}) => {

  return (
   <Card className='flex gap-5 w-64 p-5'>
    <HomeIcon/>
    <div className='space-y-3 text-gray-500'>
        <h1 className='font-semibold text-lg text-white'>Home</h1>
        <p className=''>Mumbai SS-2 Sector-8 Navi Mumbai PinCode-400709</p>
       {showButton && (<Button variant="outlined" fullWidth onClick={()=>handleSelectAddress()}>Select</Button>)}
    </div>

   </Card>
  )
}

export default AddressCart