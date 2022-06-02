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
import AboutUs from "./pages/AboutUs/AboutUs";
import Profile from "./pages/Profile/Profile";
import ProfileOptions from "./pages/ProfileOptions/ProfileOptions";
import ProtectedRoutes from "./ProtectedRoutes";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/city/:locationId" element={<CarsSelection />} />
          <Route path="/car/:carModel" element={<CarDetail />} />
          <Route path="/faqs" element={<Faq />} />
          <Route path="/about" element={<AboutUs />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/user/:userId" element={<Profile />} />
            <Route path="/profile/:userId" element={<ProfileOptions />} />
          </Route>
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
