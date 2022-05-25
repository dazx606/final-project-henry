import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import CarDetail from './pages/CarDetail/CarDetail';
import NavBar from './componets/NavBar/NavBar';
import CarsSelection from './pages/CarsSelection/CarsSelection';
import Contact from './pages/Contact/Contact';


function App() {
  return (
    <Routes>
      <Route path='/' element={<NavBar />} >
        <Route path='/' element={<Home />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/city/:locationId' element={<CarsSelection />} />
        <Route path='/car/:carId' element={<CarDetail />} />
      </Route>
    </Routes>
  );
}

export default App;
