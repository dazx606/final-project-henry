import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUserInfo } from '../../redux/actions';
import { useAuth0 } from "@auth0/auth0-react";
import style from "./Rating.module.css";
import Rate from './Rate';

function Rating() {
    const [hide, setHide] = useState(true)
    const dbUser = useSelector(state => state.user);
    const dispatch = useDispatch();
    const { isAuthenticated, getAccessTokenSilently, user } = useAuth0();

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(setUserInfo(getAccessTokenSilently, user?.email));
        }
    }, [dispatch, user]);

    useEffect(() => {
        if (dbUser.reservations?.length) {
            setHide(false)
        }
    }, [dispatch, dbUser])


    return !hide && (
        <div className={style.popUp} >
            < Rate dbUser={dbUser} setHide={setHide} />
        </div>

    )
}
export default Rating