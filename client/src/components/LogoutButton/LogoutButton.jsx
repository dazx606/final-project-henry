import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

function LogoutButton() {
  const { logout, isAuthenticated, user, getAccessTokenSilently } = useAuth0();

  return (
    isAuthenticated && (
      <>
        <button onClick={() => logout()}>Sign Out</button>
        <div>{JSON.stringify(getAccessTokenSilently)}</div>
      </>
    )
  );
}

export default LogoutButton;
