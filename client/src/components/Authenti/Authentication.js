import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import style from "./Authentication.module.css";
import { setUserInfo, saveUser, setProfileOptions } from "../../redux/actions";
import { NavLink } from "react-router-dom";

function Authentication({ setDisplay, display, handleLoginInfo }) {
  const {
    loginWithPopup,
    isAuthenticated,
    logout,
    user,
    isLoading,
    getAccessTokenSilently,
  } = useAuth0();
  const dispatch = useDispatch();
  const savedUser = useSelector((state) => state.savedUser);
  const completeUser = useSelector((state) => state.user);
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(saveUser(user.email)) 
      console.log(user);
    }  
   
  }, [user, dispatch])

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(saveUser(user.email));
    }
    console.log(user);
  }, [user, dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(setUserInfo(getAccessTokenSilently, user.email));
    }
  }, [dispatch, savedUser]);

  function handleProfileInfo(e) {
    setDisplay(!display)
    dispatch(setProfileOptions(e));
   
  }

  return (
    <div className={style.authBox}>
      {isAuthenticated && (
        <div className={style.authBox2}>
          {user.email_verified ? (
            !completeUser.completed ? (
              <div>
                <div className={style.head}>
                  {user.picture ? <img className={style.imgIcon} src={user.picture} />
                    : <div className={style.imgIcon}>{user.given_name ? user.given_name[0].toLocaleUpperCase() : user.nickname[0].toLocaleUpperCase()}</div>}
                  <div>
                    <h2 className={style.hello}>{`Hello ${user.given_name ? user.given_name : user.nickname}!`}</h2>
                    <h3 className={style.email}>{user?.email}</h3>
                  </div>
                </div>
                <div className={style.line}></div>

                <div className={style.exclam}>UPS! </div>
                <div className={style.msg}>Your Profile is incomplete.</div>
                <NavLink className={style.link} to={`/user/${savedUser[1]}`} onClick={handleLoginInfo}>
                  <div >Complete Profile</div>
                </NavLink>
              </div>
            ) : (
              <div>
                <div className={style.head}>
                  {user.picture ? <img className={style.imgIcon} src={user.picture} />
                    : <div>{completeUser.data.firstName[0].toUpperCase()}</div>}
                  <div >
                    <h2 className={style.hello}>{`Hello ${completeUser && completeUser.data.firstName}!`}</h2>
                    <h3 className={style.email}>{user?.email}</h3>
                  </div>
                </div>
                <div className={style.line}></div>
                <div className={style.welcome}>Welcome Back! </div>
                {/* <div className={style.exclam}>GREAT! </div>
                <div className={style.msg}>Everithing looks good with your information.</div> */}
                {/* <div className={style.msg}>You can rent a car now</div> */}
                <NavLink className={style.link} to={`/profile/${savedUser[1]}`} onClick={(e) => handleProfileInfo(e='information')}>
                  <div   >Profile</div>
                </NavLink>
                <NavLink className={style.link} to={`/profile/${savedUser[1]}`} onClick={(e) => handleProfileInfo(e='reservations')} >
                  <div  >My reservations</div>
                </NavLink>
              </div>
            )
          ) : (
            <div>
              <div className={style.head}>
                {user.picture ? <img className={style.imgIcon} src={user.picture} />
                  : <div className={style.imgIcon}>{user.given_name ? user.given_name[0].toLocaleUpperCase() : user.nickname[0].toLocaleUpperCase()}</div>}
                <div>
                  <h2 className={style.hello}>{`Hello ${user.given_name ? user.given_name : user.nickname}!`}</h2>
                  <h3 className={style.email}>{user?.email}</h3>
                </div>
              </div>
              <div className={style.line}></div>
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
      )
      }
    </div >
  );
}

export default Authentication;
