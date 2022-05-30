import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCarDetails } from "../../redux/actions";

import styles from "./CarDetail.module.css";

function CarDetail() {
  const { carModel } = useParams();
  const dispatch = useDispatch();
  const carDetails = useSelector((state) => state.carDetails);

  useEffect(() => {
    dispatch(getCarDetails(carModel));
  }, [dispatch]);

  return (
    <>
      {Object.keys(carDetails).length !== 0 ? (
        <div className={styles.container}>
          <div className={styles.mainimagecontainer}>
            <img
              className={styles.mainimage}
              src={carDetails.images[1]}
              alt=""
            />
          </div>
          <div className={styles.options}>
            <div className={styles.carinfo}>
              <span className={styles.text}>
                AQUI VA UNA DESCRIPCION BREVE DEL MODELO SELECCIONADO... Lorem
                ipsum, dolor sit amet consectetur adipisicing elit. Harum
                veritatis autem nam, excepturi cum iusto, quo sequi illo fugit
                exercitationem animi, explicabo commodi facilis minima.
                Reiciendis porro tempora accusamus quis?
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
            <div className={styles.first}>
              <img className={styles.one} src={carDetails.images[4]} alt="" />
            </div>

            <div className={styles.third}>
              <div className={styles.thirdsplit}>
                <img
                  className={styles.four}
                  src={carDetails.images[5]}
                  alt=""
                />
              </div>
              <div className={styles.fourthsplit}>
                <img
                  className={styles.five}
                  src={carDetails.images[6]}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <span>...</span>
      )}
    </>
  );
}

export default CarDetail;
