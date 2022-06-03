import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import AdminCars from '../../components/AdminCars/AdminCars';
import AdminReservations from '../../components/AdminReservations/AdminReservations';
import AdminUsers from '../../components/AdminUsers/AdminUsers';
import { setAdminOptions } from '../../redux/actions';
import styles from "./AdminOptions.module.css"

function AdminOptions() {
    const dispatch = useDispatch();
    const adminOptions = useSelector(state => state.adminOptions);


    return (
        <div className={styles.container}>
            <div className={styles.selection}>
                <div className={styles.selectionbox}>
                    <button
                        value='users'
                        className={styles.options}
                        onClick={(e) => {
                            dispatch(setAdminOptions(e.target.value));
                        }}
                    >
                        Manage Users
                    </button>
                    <button
                        value='reservations'
                        className={styles.options}
                        onClick={(e) => {
                            dispatch(setAdminOptions(e.target.value));
                        }}
                    >
                        Manage Reservations
                    </button>
                    <button
                        value='cars'
                        className={styles.options}
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
                {adminOptions === 'reservations' && <AdminReservations /> }
                {adminOptions === 'cars' && <AdminCars/> }
            </div>
        </div>
    );

}

export default AdminOptions