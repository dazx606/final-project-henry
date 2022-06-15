import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getCarDetails, deleteCarDetails, getRentingCar } from "../../redux/actions";
import Accessories from "../../components/Accessories/Accessories";

import styles from "./CarDetail.module.css";

function CarDetail() {
  const { carModel } = useParams();
  const dispatch = useDispatch();
  const carDetails = useSelector((state) => state.carDetails);

  const totalStars = 5;
  const completeStar = Math.floor(carDetails.rating);
  const emptyStar = Math.floor(totalStars - carDetails.rating);
  const halfStar = Number.isInteger(carDetails.rating);

  useEffect(() => {
    dispatch(getCarDetails(carModel));
    return () => {
      dispatch(deleteCarDetails());
    };
  }, [dispatch]);

  const handleClick = () => {
    dispatch(getRentingCar(carModel))
  }

  return (
    <>
      {Object.keys(carDetails).length !== 0 ? (
        <div>
          <div className={styles.container}>
            <div className={styles.mainimagecontainer}>
              <img
                className={styles.mainimage}
                src={carDetails.images[1]}
                alt=""
              />
            </div>
            <h2 className={styles.carName}>{`${carDetails.brand} ${carDetails.model}`}</h2>
            <div className={styles.options}>
              <div className={styles.flex}>
                <div className={styles.infoAndStarsContainer}>
                  <div className={styles.infoAndStars}>
                    <div className={styles.carinfo}>
                      <span className={styles.text}>
                        {carDetails.description}
                      </span>
                    </div>
                    <div className={styles.rating}>
                      <div className={styles.starsCont}>
                        {completeStar &&
                          [...Array(completeStar)].map((i, k) => {
                            return (
                              <div className={styles.starY} key={k}>
                                <i className="fa-solid fa-star"></i>
                              </div>
                            );
                          })}
                        {!halfStar && (
                          <div className={styles.starH}>
                            <i className="fa-regular fa-star-half-stroke"></i>
                          </div>
                        )}
                        {emptyStar !== 0 &&
                          [...Array(emptyStar)].map((i, k) => {
                            return (
                              <div className={styles.starG} key={k}>
                                <i className="fa-regular fa-star"></i>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.moreinfo}>
                  <div className={styles.accessories}>
                    <Accessories carDetails={carDetails} />
                  </div>
                </div>
              </div>
              <div className={styles.caroptions}>
                <NavLink to="/booking"><button onClick={handleClick} className={`buttonGlobal ${styles.reserve}`}>Reserve</button></NavLink>
              </div>
            </div>
          </div>

          <div className={styles.extraimages}>
            {carDetails.images[5] ?
              <div className={styles.second}>
                <div className={styles.firstsplit}>
                  <img className={styles.two} src={carDetails.images[2]} alt="" />
                </div>
                <div className={styles.secondsplit}>
                  <img
                    className={styles.three}
                    src={carDetails.images[3]}
                    alt=""
                  />
                </div>
              </div>
              :
              <div className={styles.first}>
                <img className={styles.one} src={carDetails.images[2]} alt="" />
              </div>
            }
            <div className={styles.first}>
              <img className={styles.one} src={carDetails.images[4]} alt="" />
            </div>
            {carDetails.images[5] ?
              <div className={styles.third}>
                <div className={styles.thirdsplit}>
                  <img
                    className={styles.four}
                    src={carDetails.images[5]}
                    alt=""
                  />
                </div>
              </div>
              :
              <div className={styles.first}>
                <img className={styles.one} src={carDetails.images[3]} alt="" />
              </div>
            }

          </div>
        </div>
      ) : (
        <span>...</span>
      )}
    </>
  );
}

export default CarDetail;
