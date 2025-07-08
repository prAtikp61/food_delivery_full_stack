import logo from './logo.svg';
import './App.css';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { darkTheme } from './Theme/DarkTheme';
import { NavBar } from './component/NavBar/NavBar';
import { Home } from './component/Home/Home';

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline></CssBaseline>
  
  <NavBar></NavBar>
 
 <Home></Home>
   </ThemeProvider>
  );
}

export default App;
