import React from "react";
import { Link } from "react router dom";

function CarCard({carId}) {
  return (
    <div>
      CarCard
      <Link to={`/car/${carId}`}>go to car detail</Link>
    </div>
  );
}

export default CarCard;
