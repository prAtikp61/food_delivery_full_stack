import { Card, CardActions, CardContent, CardMedia, IconButton, Typography } from '@mui/material'
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete'

const EventCard = () => {
  return (
    <div>
        <Card sx={{width:345}}>
            <CardMedia sx={{height:345}} image='https://cdn.pixabay.com/photo/2022/02/12/15/03/biryani-7009119_1280.jpg'/>
            <CardContent>
                <Typography variant='h5'>
                    Indian Fast Foodz
                </Typography>
                 <Typography variant='body2'>
                    50% off on your early booking
                </Typography>
                <div className='py-2 space-y-2 '>
                    <p>{"mumbai"}</p>
                    <p className='text-sm text-blue-500'>April 13, 2024 12:00 AM</p>
                    <p className='text-sm text-red-500'>  April 15, 2024 12:00 AM</p>
                </div>
            </CardContent>
          
          { true && <CardActions>
                <IconButton>
                    <DeleteIcon/>
                </IconButton>
            </CardActions>

          }
        </Card>
    </div>
  )
}

export default EventCard