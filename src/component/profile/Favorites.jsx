import React from 'react'
import RestaurantCard from '../restaurant/restaurantCard'
import { useSelector } from 'react-redux'

const Favorites = () => 
  {
    const {auth}=useSelector(store=>store)
       console.log("favorites =", auth.favorites);
  return (
    <div>
      <h1 className='py-5  text-xl font-semibold  text-center'>My Favorites</h1>
      <div className='flex flex-wrap gap-3 justify-center'>
        {auth.favorites.map((item)=><RestaurantCard item={item}/>)
    
      }
      </div>
    </div>
  )
}

export default Favorites