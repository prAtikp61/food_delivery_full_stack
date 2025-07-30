import React from 'react'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import EventIcon from '@mui/icons-material/Event';

import LogOutIcon from '@mui/icons-material/Logout';
import { Divider, Drawer, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';



const menu=[
    {title:"Orders",icon:<ShoppingBagIcon/>},
      {title:"Favorites",icon:<FavoriteIcon/>},
        {title:"Home",icon:<HomeIcon/>},
          {title:"Payemts",icon:<AccountBalanceWalletIcon/>},
            {title:"Notifications",icon:<NotificationsActiveIcon/>},
              {title:"Events",icon:<EventIcon/>},
               {title:"LogOut",icon:<LogOutIcon/>},
              
    
]

const ProfileNavigation = ({open,handleClose}) => {

const navigate=useNavigate();

const handleNavigate=(item)=>{
navigate(`/my-profile/${item.title.toLowerCase()}`)
} 

const isSmallScreen=useMediaQuery('(max-width:900px)');
  return (
   <div>
    <Drawer open={isSmallScreen? open :true} 
     onClose={handleClose} 
     variant={isSmallScreen?"temporary":"permanent"} 
     anchor='left'
      sx={{zIndex:-1,position:"sticky"}}>

        <div className='w-[50vw] lg:w-[20vw] h-[100vh] flex flex-col justify-center text-xl  gap-8 pt-16'>
          {menu.map((item,i)=><>
          <div onClick={()=>handleNavigate(item)}  className='px-5 flex items-center space-x-5 cursor-pointer'>
            {item.icon}
            <span>{item.title}</span>
          </div>
          {i!==menu.length-1 && <Divider/>}
          </>)} 
        </div>

    </Drawer>
   </div>
  )
}

export default ProfileNavigation