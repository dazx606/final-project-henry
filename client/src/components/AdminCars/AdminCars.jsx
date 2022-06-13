import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import style from "./AdminCars.module.css";
import CreateCar from "./CreateCar";
import CreateModel from "./CreateModel";
import { getAllAdminCars } from "../../redux/actions";
import AllCars from "./AllCars";


function AdminCars() {

  const { getAccessTokenSilently } = useAuth0();
  const [carOption, setCarOption] = useState("allCars");
  const [plate, setPlate] = useState("");
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();


  function handleCarsSearch(e) {
    let searchPlate = e.target.value;
    setPlate(searchPlate);
    dispatch(getAllAdminCars(getAccessTokenSilently, e.target.value, page));
  }
  function handleCarOption(e) {
    setCarOption(e.target.value);
  }

  return (
    <div>
      {carOption === "allCars" && (
        <div className={style.adminCars}>
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
              <div className={style.secondButton}>
                <button
                  className={`buttonGlobal ${style.addButton}`}
                  value="Add car"
                  onClick={handleCarOption}
                >
                  Add car
                </button>
              </div>
            </div>
          </div>
          < AllCars plate={plate} />
        </div>
      )}


      {carOption === "Add model" && (
        <div>
          <div className={style.searchCar}>
            <div className={style.addButtons}>
              <div className={style.allButton}>
                <button
                  className={`buttonGlobal`}
                  value="allCars"
                  onClick={handleCarOption}
                >
                  All cars
                </button>
              </div>
              <div className={style.secondButton}>
                <button
                  className={`buttonGlobal`}
                  value="Add car"
                  onClick={handleCarOption}
                >
                  Add car
                </button>
              </div>
            </div>
          </div>
          <div>
            <CreateModel />
          </div>
        </div>
      )}
      {carOption === "Add car" && (
        <div>
          <div className={style.searchCar}>
            <div className={style.addButtons}>
              <div className={style.allButton}>
                <button
                  className={`buttonGlobal`}
                  value="allCars"
                  onClick={handleCarOption}
                >
                  All cars
                </button>
              </div>
              <div className={style.firstButton}>
                <button
                  className={`buttonGlobal`}
                  value="Add model"
                  onClick={handleCarOption}
                >
                  Add car model
                </button>
              </div>
            </div>
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
