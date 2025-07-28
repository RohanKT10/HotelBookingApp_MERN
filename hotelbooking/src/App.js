import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes,Route } from 'react-router-dom'; 

import Adminscreen from './screens/Adminscreen';
import Homescreen from './screens/Homescreen';
import Bookingscreen from './screens/Bookingscreen';
import Loginscreen from './screens/Loginscreen';
import Registerscreen from './screens/Registerscreen';
import Profilescreen from './screens/Profilescreen';
import Landingscreen from './screens/Landingscreen';

function App() {
  return (
    <div className="grid-container">
    <Navbar/>
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Landingscreen />} />
    <Route path="/home" element={<Homescreen />} />
    <Route path='/book/:roomid/:fromdate/:todate' element={<Bookingscreen />} />
    <Route path="/register" element={<Registerscreen />} />
    <Route path="/login" element={<Loginscreen />} />
    <Route path="/admin" element={<Adminscreen />} />
    <Route path="/profile" element={<Profilescreen />} />
    
    


    </Routes>
    

    </BrowserRouter>
    
    
    
    
    </div>
  );
}

export default App;



