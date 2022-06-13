import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import CarListItem from "./CarListItem";
import Pages from "./Pages";
import { deleteCar, getAllAdminCars } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import style from "./AllCars.module.css";
import DltCarAlert from "./DltCarAlert";

function AllCars({ plate, order }) {
    const allCars = useSelector((state) => state.allCars.cars);
    const carDeleted = useSelector((state) => state.carDeleted)
    const [page, setPage] = useState(1);
    const [alert, setAlert] = useState(false);
    const [dltCar, setDltCar] = useState({ plate: '' })
    const { getAccessTokenSilently } = useAuth0();
    const dispatch = useDispatch();    

    useEffect(() => {
        dispatch(getAllAdminCars(getAccessTokenSilently, plate, page, order));
    }, [dispatch, plate, carDeleted]);

    const pagination = (p) => {
        setPage(p);
        dispatch(getAllAdminCars(getAccessTokenSilently, plate, p, order));
    };
    function handleTClick(plate) {             
        setDltCar({plate: plate })
        setAlert(true)
    };
    function handleDltClick () {
        dispatch(deleteCar(getAccessTokenSilently, dltCar.plate))
        setAlert(false)
    };
    return (
        <div className={style.carsBox}>
            {allCars?.length ? (
                <div>
                    <div className={style.listTitle}>
                        <div className={style.imgIcon}></div>
                        <div className={style.brand}>Brand</div>
                        <div className={style.brand}>Model</div>
                        {/* <div className={style.brand}>Model Rating</div> */}
                        <div className={style.plate}>License Plate</div>
                        {/* <div className={style.dltTitle}>Delete Car</div> */}
                        <div className={style.more}></div>
                    </div>
                    {allCars?.map((c) => (
                        <CarListItem car={c} key={c.id} handleTClick={handleTClick} />
                    ))}
                    <div >
                        <Pages pagination={pagination} page={page} />
                    </div>
                </div>
            ) : (
                <div>Car not found</div>
            )}
            {
                alert &&
                <div className={style.alert}>
                    <DltCarAlert setAlert={setAlert} handleDltClick={handleDltClick} dltCar={dltCar} alert={alert} />
                    
                </div>
            }
        </div>
    )
}

export default AllCars