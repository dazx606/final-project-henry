import React, { useEffect } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { setUserInfo, saveUser } from "./redux/actions";
import Home from "./pages/Home/Home";
import CarDetail from "./pages/CarDetail/CarDetail";
import NavBar from "./components/NavBar/NavBar";
import CarsSelection from "./pages/CarsSelection/CarsSelection";
import Contact from "./pages/Contact/Contact";
import Footer from "./components/Footer/Footer";
import Faq from "./components/Faq/Faq";
import AboutUs from "./pages/AboutUs/AboutUs";
import ProfileOptions from "./pages/ProfileOptions/ProfileOptions";
import ProtectedRoutes from "./ProtectedRoutes";
import ProfileUpdate from "./pages/ProfileUpdate/ProfileUpdate";
import Booking from "./pages/Booking/Booking";
// import AdminUsers from "./components/AdminUsers/AdminUsers";
import AdminRoutes from "./AdminRoutes";
import AdminOptions from "./pages/AdminOptions/AdminOptions";
import RestrictBooking from "./RestrictBooking";
import RentalDetails from "./pages/RentalDetails/RentalDetails";

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, getAccessTokenSilently, user } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(setUserInfo(getAccessTokenSilently, user.email));
    }
  }, [dispatch, isAuthenticated, getAccessTokenSilently, user]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(saveUser(user.email, user.picture));
    }
  }, [user, dispatch]);

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
            <Route path="/user/:userId" element={<ProfileUpdate />} />
            <Route path="/profile/:userId" element={<ProfileOptions />} />
            <Route path="/reservation/:orderId" element={<RentalDetails />} />
            <Route path="/booking" element={<RestrictBooking />} />      
          </Route>
          <Route element={<AdminRoutes />}>
            <Route path="/adminOptions" element={<AdminOptions />} />
          </Route>
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
