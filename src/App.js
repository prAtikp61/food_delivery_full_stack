import logo from './logo.svg';
import './App.css';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { darkTheme } from './Theme/DarkTheme';
import { NavBar } from './component/NavBar/NavBar';
import { Home } from './component/Home/Home';
import RestaurantDetails from './component/restaurant/RestaurantDetails';
import Cart from './component/Cart/Cart';
import Profile from './component/profile/Profile';
import CustomerRouters from './Routers/CustomerRouters';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUser } from './component/State/Authentication/Action';
import { findcart } from './component/State/Cart/Action';

function App() {
  const dispatch=useDispatch();
  const jwt=localStorage.getItem("jwt")
  const {auth}=useSelector(store=>store)
  useEffect(() => {
  const token = localStorage.getItem("jwt");
  if (token) {
    dispatch(getUser(token));
      dispatch(findcart(jwt))
  }
}, [dispatch]);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline/>
      <CustomerRouters/>
   </ThemeProvider>
  );
}

export default App;
