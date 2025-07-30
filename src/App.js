import logo from './logo.svg';
import './App.css';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { darkTheme } from './Theme/DarkTheme';
import { NavBar } from './component/NavBar/NavBar';
import { Home } from './component/Home/Home';
import RestaurantDetails from './component/restaurant/RestaurantDetails';
import Cart from './component/Cart/Cart';
import Profile from './component/profile/Profile';

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline></CssBaseline>
  
  <NavBar></NavBar>
 
 
  <Profile/>


   </ThemeProvider>
  );
}

export default App;
