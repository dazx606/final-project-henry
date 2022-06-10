import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "./redux/actions";
import Rating from "./components/Rating/Rating";

function ProtectedRoutes() {
  const { isAuthenticated, isLoading, getAccessTokenSilently, user } =
    useAuth0();
  const dispatch = useDispatch();
  const dbUser = useSelector(state => state.user)

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(setUserInfo(getAccessTokenSilently, user?.email));
    }
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
