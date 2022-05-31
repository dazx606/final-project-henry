import React, { useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { getUserInfo } from "../../redux/actions/index";
import { useDispatch, useSelector } from "react-redux";

function LogoutButton() {
  const { logout, isAuthenticated, user, getAccessTokenSilently } = useAuth0();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user);

  const callPrivateEndPoint = async () => {
    dispatch(getUserInfo(getAccessTokenSilently, user?.email));
  };

  return (
    isAuthenticated && (
      <>
        <button onClick={() => logout()}>Sign Out</button>
        <button onClick={callPrivateEndPoint}>Get User</button>
      </>
    )
  );
}

export default LogoutButton;
