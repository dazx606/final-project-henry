import React, { useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from 'react-redux';
import AdminCars from '../../components/AdminCars/AdminCars';
import AdminReservations from '../../components/AdminReservations/AdminReservations';
import AdminUsers from '../../components/AdminUsers/AdminUsers';
import { setAdminOptions, setUserInfo } from '../../redux/actions';
import styles from "./AdminOptions.module.css"

function AdminOptions() {
    const dispatch = useDispatch();
    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
    const adminOptions = useSelector(state => state.adminOptions);   

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(setUserInfo(getAccessTokenSilently, user.email));
        }
    }, [dispatch, user]);


    return (
        <div className={styles.container}>
            <div className={styles.selection}>
                <div className={styles.selectionbox}>
                    <button
                        value='users'
                        className={adminOptions === 'users' ? styles.activeOpt : styles.options}
                        onClick={(e) => {
                            dispatch(setAdminOptions(e.target.value));
                        }}
                    >
                        Manage Users
                    </button>
                    <button
                        value='reservations'
                        className={adminOptions === 'reservations' ? styles.activeOpt : styles.options}
                        onClick={(e) => {
                            dispatch(setAdminOptions(e.target.value));
                        }}
                    >
                        Manage Reservations
                    </button>
                    <button
                        value='cars'
                        className={adminOptions === 'cars' ? styles.activeOpt : styles.options}
                        onClick={(e) => {
                            dispatch(setAdminOptions(e.target.value));
                        }}
                    >
                        Manage Cars
                    </button>
                </div>
            </div>
            <div className={styles.render}>
                {adminOptions === 'users' && <AdminUsers />}
                {adminOptions === 'reservations' && <AdminReservations />}
                {adminOptions === 'cars' && <AdminCars />}
            </div>
        </div>
    );

}

export default AdminOptions