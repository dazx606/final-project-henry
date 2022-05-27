import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import CarDetail from "./pages/CarDetail/CarDetail";
import NavBar from "./components/NavBar/NavBar";
import CarsSelection from "./pages/CarsSelection/CarsSelection";
import Contact from "./pages/Contact/Contact";
import Footer from "./components/Footer/Footer";
import Faq from "./components/Faq/Faq";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/city/:locationId" element={<CarsSelection />} />
          <Route path="/car/:carId" element={<CarDetail />} />
          <Route path="/faqs" element={<Faq />}/>
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
