import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "./redux/actions";

function AdminRoutes() {
    const dbUser = useSelector(state => state.user)

    const { isAuthenticated, isLoading, getAccessTokenSilently, user } =
        useAuth0();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setUserInfo(getAccessTokenSilently, user?.email));
    }, [dispatch, user]);

    return isAuthenticated && dbUser.data.admin ?(
        <Outlet />
  ) : isLoading ? (
    <div>Loading...</div>
  ) : (
    <div>No tienes permiso a esta pag</div>
  );
}

export default AdminRoutes;