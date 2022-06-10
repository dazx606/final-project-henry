import React, { useEffect, useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from 'react-redux';
import AdminCars from '../../components/AdminCars/AdminCars';
import AdminReservations from '../../components/AdminReservations/AdminReservations';
import AdminUsers from '../../components/AdminUsers/AdminUsers';
import { setUserInfo } from '../../redux/actions';
import styles from "./AdminOptions.module.css"

function AdminOptions() {
    const dispatch = useDispatch();
    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
    const [alert, setAlert] = useState(false);
    const [showOptions, setShowOptions] = useState(false)
    const [adminOptions, setAdminOpt] = useState('')

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(setUserInfo(getAccessTokenSilently, user.email));
        }
        return setAdminOpt('');
    }, [dispatch, user]);



    return (
        <div className={styles.container} >
            <input type="checkbox" className={styles.checkbox} checked={showOptions} onChange={() => { }} />

            <div className={styles.selection}>
                <input type="checkbox" className={styles.checkbox2} checked={showOptions} onChange={() => { }} />
                <div className={styles.selectionbox}>
                    <input type="checkbox" className={styles.checkbox3} checked={showOptions} onChange={() => { }} />
                    <button
                        value='users'
                        className={adminOptions === 'users' ? styles.activeOpt : styles.options}
                        onClick={(e) => {
                            setAdminOpt(e.target.value);
                            setShowOptions(true);
                            if (adminOptions === 'users' && showOptions) setShowOptions(false);
                        }}
                    >
                        Manage Users
                    </button>
                    <button
                        value='reservations'
                        className={adminOptions === 'reservations' ? styles.activeOpt : styles.options}
                        onClick={(e) => {
                            setAdminOpt(e.target.value);
                            setShowOptions(true);
                            if (adminOptions === 'reservations'  && showOptions) setShowOptions(false);
                        }}
                    >
                        Manage Reservations
                    </button>
                    <button
                        value='cars'
                        className={adminOptions === 'cars' ? styles.activeOpt : styles.options}
                        onClick={(e) => {
                            setAdminOpt(e.target.value);
                            setShowOptions(true);
                            if (adminOptions === 'cars' && showOptions) setShowOptions(false);
                        }}
                    >
                        Manage Cars
                    </button>

                </div>
               
            </div>
            <div className={styles.render}>
                {adminOptions === 'users' && <AdminUsers alert={alert} setAlert={setAlert} />}
                {adminOptions === 'reservations' && <AdminReservations />}
                {adminOptions === 'cars' && <AdminCars />}

            </div>
        </div>
    );

}

export default AdminOptions