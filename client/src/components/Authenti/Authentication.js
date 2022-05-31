import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAuth0 } from "@auth0/auth0-react";
import style from "./Authentication.module.css"
import { saveUser } from '../../redux/actions';
import { NavLink } from 'react-router-dom';

function Authentication() {
  const { loginWithPopup, isAuthenticated, logout, user, isLoading } = useAuth0();
  const dispatch = useDispatch();
  const savedUser = useSelector(state => state.savedUser)
  useEffect(() => {
    if (isAuthenticated) dispatch(saveUser(user.email))
    console.log(savedUser)
  }, [user])

  return (
    <div className={style.authBox} >
      {isLoading ?
        <div>Loading...</div>
        :
        !isAuthenticated &&
        <div>
          <h3>Hey! You are not Logged!</h3>
          <h3>Log in or Sig up to continue</h3>
          <button onClick={() => loginWithPopup()}>Log In</button>
          <button onClick={() => loginWithPopup({ screen_hint: 'signup' })}>Sign Up</button>
        </div>}

      {isAuthenticated &&
        <div>
          <h2>Welcome {user.email}</h2>
          {!savedUser[2]?
          <h3>You Profile is incomplete. Let us know you better before we rent you a car</h3>
          :<h3>Everithing looks good with your information. You can rent a car now</h3>}
          <NavLink to={`/user/${savedUser[1]}`} >
            {savedUser[2]?<div>Visit Profile</div>
            :<div>Complet Profile</div>}
          </NavLink>
          <button onClick={() => logout()}>Log out</button>
        </div>
      }

    </div>
  )
}

export default Authentication