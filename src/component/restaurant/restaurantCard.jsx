import React from 'react'
import { Card, Chip, IconButton } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { isPresentInFavorites } from '../config/logic'
import { addToFavorite } from '../State/Authentication/Action'

const RestaurantCard = ({ item }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const jwt = localStorage.getItem("jwt")
  const { auth } = useSelector(store => store)
  const favorites = auth?.favorites || []

const handleAddToFavorite = () => {
  console.log("Adding to favorites - JWT:", jwt);
  dispatch(addToFavorite(jwt, item.id));
}

const handleNavigateToRestaurant=()=>{
if(!item.open)
{
  const encodedName = encodeURIComponent(item.name);
  navigate(`/restaurant/${item.address.city}/${encodedName}/${item.id}`)
}
}
  const isOpen = true

  return (
    <Card className="m-5 w-[18rem] overflow-hidden rounded-md shadow-md">
      <div className={`${isOpen ? 'cursor-pointer' : 'cursor-not-allowed'} relative`}>
 <img
  src={(item.images?.[0] || item.photos?.[0])}
  alt="Restaurant"
  className="w-full h-[10rem] object-cover"
/>

        <Chip
          size="small"
          className="absolute top-2 left-2"
          color={item.open ? 'success' : 'error'}
          label={item.open ? 'Open' : 'Closed'}
        />
      </div>

      <div className="p-4 flex items-center justify-between">
        <div className="space-y-1">
          <p onClick={handleNavigateToRestaurant} className="font-semibold text-lg cursor-pointer">{item.name}</p>
          <p className="text-gray-500 text-sm">{item.description}</p>
        </div>
        <IconButton onClick={handleAddToFavorite}>
          {isPresentInFavorites(favorites, item) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
      </div>
    </Card>
  )
}

export default RestaurantCard
