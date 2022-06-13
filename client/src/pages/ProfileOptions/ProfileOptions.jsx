import { useDispatch, useSelector } from "react-redux";
import ProfileOrders from "../../components/ProfileOrders/ProfileOrders";
import styles from "./ProfileOptions.module.css";
import { setProfileOptions } from "../../redux/actions";
import ProfileInfo from "../../components/ProfileInfo/ProfileInfo";
import { useState } from "react";

function ProfileOptions() {
  const profileOptions = useSelector((state) => state.profileOptions);
  const [showOptions, setShowOptions] = useState(false)
  const dispatch = useDispatch();

  return (
    <div className={styles.container}>
      <input type="checkbox" className={styles.checkbox} checked={showOptions} onChange={() => { }} />
      <div className={styles.selection}>
        <input type="checkbox" className={styles.checkbox2} checked={showOptions} onChange={() => { }} />
        <div className={styles.selectionbox}>
          <input type="checkbox" className={styles.checkbox3} checked={showOptions} onChange={() => { }} />
          <button
            value="information"
            className={profileOptions === "information" ? styles.activeOpt : styles.options}
            onClick={(e) => {
              dispatch(setProfileOptions(e.target.value));
              setShowOptions(true);
              if (profileOptions === "information" && showOptions) setShowOptions(false);
            }}
          >
            Profile Information
          </button>
          <button
            value="reservations"
            className={profileOptions === "reservations" ? styles.activeOpt : styles.options}
            onClick={(e) => {
              dispatch(setProfileOptions(e.target.value));
              setShowOptions(true);
              if (profileOptions === "reservations" && showOptions) setShowOptions(false);
            }}
          >
            My Reservations
          </button>
        </div>
      </div>
      <div className={styles.render}>
        {profileOptions === "information" && <ProfileInfo />}
        {profileOptions === "reservations" && <ProfileOrders />}
      </div>
    </div>
  );
}

export default ProfileOptions;
