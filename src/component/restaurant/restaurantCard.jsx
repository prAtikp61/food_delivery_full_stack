import React from 'react'
import { Card, Chip, IconButton } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'

const RestaurantCard = () => {
  const isOpen = true;
  const isFavorite = true;

  return (
    <Card className="m-5 w-[18rem] overflow-hidden rounded-md shadow-md">
      <div className={`${isOpen ? 'cursor-pointer' : 'cursor-not-allowed'} relative`}>
        <img
          src="https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg"
          alt="Restaurant"
          className="w-full h-[10rem] object-cover"
        />
        <Chip
          size="small"
          className="absolute top-2 left-2"
          color={isOpen ? 'success' : 'error'}
          label={isOpen ? 'Open' : 'Closed'}
        />
      </div>

      <div className="p-4 flex items-center justify-between">
        <div className="space-y-1">
          <p className="font-semibold text-lg">Indian Fast Food</p>
          <p className="text-gray-500 text-sm">Craving for food</p>
        </div>
        <IconButton>
          {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
      </div>
    </Card>
  )
}

export default RestaurantCard
