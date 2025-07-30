import { Avatar, Badge, Box, colors, IconButton } from '@mui/material'
import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { pink } from '@mui/material/colors';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import "./NavBar.css"
import { Person } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { store } from '../State/Authentication/store';

export const NavBar = () => {
  const navigate=useNavigate();
  const {auth} =useSelector(store=>store)
  console.log("Redux user in NavBar:", auth.user);
  return (
 
    <Box className='px-5 sticky z-50 top-0 py-[.8rem] bg-[#e91e63] lg:px-20 flex justify-between'>
        
          <div className='lg:mr-10 cursor-pointer flex items-center space-x-4'>
            <li className='logo font-semibold text-gray-300 text-2xl'>
              Pratz Food
            </li>
          </div>
      

        <div className='flex items-center space-x-2 lg:space-x-10'>
          <div className=''>
            <IconButton >
               <SearchIcon  sx={{fontSize:"1.5rem"}}>

               </SearchIcon>
            </IconButton>
          </div>

         <div className=''>
  {auth.user && auth.user.fullName ? (
    <Avatar sx={{ bgcolor: "white", color: pink.A400 }}>
      {auth.user.fullName[0].toUpperCase()}
    </Avatar>
  ) : (
    <IconButton onClick={() => navigate("/account/login")}>
      <Person />
    </IconButton>
  )}
</div>


          <div className=''>
            <IconButton >
              <Badge color='secondary' badgeContent={3}>
               <ShoppingCartIcon  sx={{fontSize:"1.5rem"}}>

               </ShoppingCartIcon>
               </Badge>
            </IconButton>
          </div>

        </div>
    </Box>
  )
}
