import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAuth0 } from "@auth0/auth0-react";
import style from "./Authentication.module.css"

function Authentication() {
  const { loginWithPopup, isAuthenticated, logout, user, isLoading } = useAuth0();
  //className={style.authBox}

  return (
    <div className={style.authBox} >
      {isLoading?
       <div>Loading...</div>
      :
      !isAuthenticated &&
        <div>
          <h3>Hey! You are not Logged!</h3>
          <h3>Log in or Sig up to continue</h3>
          <button onClick={() => loginWithPopup()}>Log In</button>
          <button onClick={() => loginWithPopup({screen_hint:'signup'})}>Sign Up</button>
        </div>}

      {isAuthenticated &&
        <div>
          <h2>Welcome {user.email}</h2>

          <button onClick={() => logout()}>Log out</button>
        </div>
      }

    </div>
  )
}

export default Authentication