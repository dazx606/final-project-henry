import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LocationFilter from "../../components/LocationFilter/LocationFilter";
import Footer from "../../components/Footer/Footer";
import Carousel from "../../components/Carousel/Carousel";

function Home() {
  const city = useSelector((state) => state.city);

  return (
    <div>
      <div>Home</div>
      <div>
        <span>Looking for a Car? select a city </span>
        <LocationFilter />
        <Link to={`/city/${city}`}>
          <button>Go</button>
        </Link>
      </div>
      <Carousel/>
    </div>
  );
}

export default Home;
