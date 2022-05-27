import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCarDetails } from "../../redux/actions";

import styles from "./CarDetail.module.css";

function CarDetail() {
  const { carId } = useParams();
  const dispatch = useDispatch();
  const carDetails = useSelector((state) => state.carDetails);

  useEffect(() => {
    //dispatch(getCarDetails(carId));
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <div className={styles.mainimagecontainer}>
        <img
          className={styles.mainimage}
          src="https://i.ibb.co/80ycS4G/911-I.png"
          alt=""
        />
      </div>
      <div className={styles.options}>
        <div className={styles.carinfo}>
          <span className={styles.text}>
            The most prominent design feature is its widened 911 Turbo-style
            bodywork, with prominent wheel arches, but without the side air
            intakes typical of Turbo versions. This distinguishing feature sets
            it apart from all other 911 models.
          </span>
        </div>
        <div className={styles.moreinfo}>
          <div className={styles.accessories}>Accesorios para agregar</div>
          <div className={styles.rating}>Calificacion</div>
        </div>
        <div className={styles.caroptions}>
          <button className={styles.reserve}>Reserve</button>
        </div>
      </div>
      <div className={styles.extraimages}>
        <div className={styles.second}>
          <div className={styles.firstsplit}>
            <img
              className={styles.two}
              src="https://i.ibb.co/Ypd5Ndb/911-4.jpg"
              alt=""
            />
          </div>
          <div className={styles.secondsplit}>
            <img
              className={styles.three}
              src="https://i.ibb.co/9VcqyVb/911-3.jpg"
              alt=""
            />
          </div>
        </div>
        <div className={styles.first}>
          <img
            className={styles.one}
            src="https://i.ibb.co/sKyJFjm/911-5.jpg"
            alt=""
          />
        </div>

        <div className={styles.third}>
          <div className={styles.thirdsplit}>
            <img
              className={styles.four}
              src="https://i.ibb.co/F3K31rM/911-2.png"
              alt=""
            />
          </div>
          <div className={styles.fourthsplit}>
            <img
              className={styles.five}
              src="https://i.ibb.co/Wf5H2qg/911-1.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarDetail;
