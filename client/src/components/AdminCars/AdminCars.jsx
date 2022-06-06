import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import style from "./AdminCars.module.css";
import CreateCar from "./CreateCar";
import CreateModel from "./CreateModel";
import { getAllAdminCars } from "../../redux/actions";
import CarListItem from "./CarListItem";

function AdminCars() {
  const allCars = useSelector((state) => state.allCars);
  const { getAccessTokenSilently } = useAuth0();
  const [carOption, setCarOption] = useState("allCars");
  const [plate, setPlate] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllAdminCars(getAccessTokenSilently, plate));
  }, [dispatch, plate]);

  function handleCarsSearch(e) {
    let searchPlate = e.target.value;
    setPlate(searchPlate);
    dispatch(getAllAdminCars(getAccessTokenSilently, e.target.value));
  }
  function handleCarOption(e) {
    setCarOption(e.target.value);
  }

  return (
    <div>
      {carOption === "allCars" && (
        <div>
          <div className={style.searchCar}>
            <input
              className={`inputGlobal ${style.inputSearch}`}
              type="search"
              placeholder="Find car by license plate"
              value={plate}
              onChange={handleCarsSearch}
            />
            <div className={style.addButtons}>
              <div className={style.firstButton}>
                <button
                  className={`buttonGlobal ${style.addButton}`}
                  value="Add model"
                  onClick={handleCarOption}
                >
                  Add car model
                </button>
              </div>
              <button
                className={`buttonGlobal ${style.addButton}`}
                value="Add car"
                onClick={handleCarOption}
              >
                Add car
              </button>
            </div>
          </div>

          <div className={style.carsBox}>
            {allCars.length ? (
              <div>
                <div className={style.listTitle}>
                  <div className={style.imgIcon}></div>
                  <div className={style.brand}>Brand</div>
                  <div className={style.brand}>Model</div>
                  <div className={style.plate}>License Plate</div>
                  <div className={style.dltTitle}>Delete Car</div>
                </div>
                {allCars?.map((c) => (
                  <CarListItem car={c} key={c.id} />
                ))}
              </div>
            ) : (
              <div>Car not found</div>
            )}
          </div>
        </div>
      )}
      {carOption === "Add model" && (
        <div>
          <div className={style.searchCar}>
            <button
              className={`buttonGlobal`}
              value="allCars"
              onClick={handleCarOption}
            >
              All cars
            </button>
            <button
              className={`buttonGlobal`}
              value="Add car"
              onClick={handleCarOption}
            >
              Add car
            </button>
          </div>
          <div>
            <CreateModel />
          </div>
        </div>
      )}
      {carOption === "Add car" && (
        <div>
          <div className={style.searchCar}>
            <button
              className={`buttonGlobal`}
              value="allCars"
              onClick={handleCarOption}
            >
              All cars
            </button>
            <button
              className={`buttonGlobal`}
              value="Add model"
              onClick={handleCarOption}
            >
              Add car model
            </button>
          </div>
          <div>
            <CreateCar />
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminCars;
