import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import style from "./Authentication.module.css";
import { setUserInfo, saveUser } from "../../redux/actions";
import { NavLink } from "react-router-dom";

function Authentication({ handleLoginInfo }) {
  const { loginWithPopup, isAuthenticated, logout, user, isLoading, getAccessTokenSilently } = useAuth0();
  const dispatch = useDispatch();
  const savedUser = useSelector((state) => state.savedUser);
  const completeUser = useSelector((state) => state.user);
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(saveUser(user.email)) 
    }  
   
  }, [user, dispatch])

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(setUserInfo(getAccessTokenSilently, user.email))
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(setUserInfo(getAccessTokenSilently, user.email));
    }
  }, [dispatch, savedUser]);

  return (
    <div className={style.authBox}>
      {isAuthenticated && (
        <div className={style.authBox2}>
          {user.email_verified ? (
            !completeUser.completed ? (
              <div>
                <h2 className={style.hello}>{`Hello ${user.given_name ? user.given_name : user.nickname}!`}</h2>
                <h3 className={style.welcome}>Welcome to RentACar</h3>
                <div className={style.exclam}>UPS! </div>
                <div className={style.msg}>Looks like your Profile is incomplete.</div>
                <NavLink to={`/user/${savedUser[1]}`} onClick={handleLoginInfo}>
                  <div className={style.link}>Complete Profile</div>
                </NavLink>
              </div>
            ) : (
              <div>
                <h2 className={style.hello}>{`Hello ${completeUser && completeUser.data.firstName}!`}</h2>
                <h3 className={style.welcome}>Welcome back</h3>
                <div className={style.exclam}>GREAT! </div>
                <div className={style.msg}>Everithing looks good with your information.</div>
                <div className={style.msg}>You can rent a car now</div>
                <NavLink to={`/user/${savedUser[1]}`} onClick={handleLoginInfo}>
                  <div className={style.link}>Visit Profile</div>
                </NavLink>
              </div>
            )
          ) : (
            <div>
              <h2 className={style.hello}>{`Hello ${user.given_name ? user.given_name : user.nickname}!`}</h2>
              <h3 className={style.welcome}>Welcome to RentACar</h3>
              <div className={style.exclam}>UPS! </div>
              <div className={style.msg}>Verify your email to continue</div>
            </div>
          )}

          {/* <NavLink to={`/user/${savedUser[1]}`} onClick={handleLoginInfo}>
            {savedUser[2] ? <div className={style.link}>Visit Profile</div>
              : <div className={style.link}>Complete Profile</div>}
          </NavLink> */}
          <div className={style.btnCont}>
            <button className={style.logBtn} onClick={() => logout()}>
              Log out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Authentication;
