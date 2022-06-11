import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from "react-redux";
import { setUserInfo } from "./redux/actions";
import ClipLoader from "react-spinners/ClipLoader";
import LoginPopup from "./components/LoginPopup/LoginPopup";

function ProtectedRoutes() {
  const { isAuthenticated, isLoading, getAccessTokenSilently, user } =
    useAuth0();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(setUserInfo(getAccessTokenSilently, user?.email));
  // }, [dispatch, user]);

  return isAuthenticated ? (
    <Outlet />
  ) : isLoading ? (
    <div
      style={{
        marginTop: "10rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ClipLoader color="#ef8354" size={70} margin={10} />
    </div>
  ) : (
    <LoginPopup />
  );
}

export default ProtectedRoutes;
