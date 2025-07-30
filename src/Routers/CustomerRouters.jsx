import React from 'react'
import {NavBar} from '../component/NavBar/NavBar'
import {Home} from '../component/Home/Home'
import { Route, Routes } from 'react-router-dom'
import Profile from '../component/profile/Profile'
import RestaurantDetails from '../component/restaurant/RestaurantDetails'
import Cart from '../component/Cart/Cart'
import Auth from '../component/Auth/Auth'


const CustomerRouters = () => {
  return (
    <div>
        <NavBar/>
        <Routes>
            <Route path='/' element={<Home/>}/>
              <Route path='/account/:register' element={<Home/>}/>
                <Route path='/restaurant/:city/:title/:id' element={<RestaurantDetails/>}/>
                  <Route path='/cart' element={<Cart/>}/>
                     <Route path='/my-profile/*' element={<Profile/>}/>
        </Routes>
        <Auth></Auth>
    </div>
  )
}

export default CustomerRouters