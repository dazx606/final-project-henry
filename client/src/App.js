import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import CarDetail from './pages/CarDetail/CarDetail';
import NavBar from './componets/NavBar/NavBar';
import CarsSelection from './pages/CarsSelection/CarsSelection';
import Contact from './pages/Contact/Contact';


function App() {
  return (
    <React.Fragment>
      <Route path='/' component={NavBar} />
      <Route exact path='/' component={Home} />
      <Route path='/contact' component={Contact} />
      <Route path='/selection/:locationId' component={CarsSelection} />
      <Route path='/car/:carId' component={CarDetail} />
    </React.Fragment>
  );
}

export default App;
