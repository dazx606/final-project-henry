import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from "react-redux";
import { setUserInfo } from "./redux/actions";

function ProtectedRoutes() {
  const { isAuthenticated, isLoading, getAccessTokenSilently, user } =
    useAuth0();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUserInfo(getAccessTokenSilently, user?.email));
  }, [dispatch, user]);

  return isAuthenticated ? (
    <Outlet />
  ) : isLoading ? (
    <div>Loading...</div>
  ) : (
    <div>No tienes permiso a esta pag</div>
  );
}

export default ProtectedRoutes;
