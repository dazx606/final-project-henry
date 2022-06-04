import { useDispatch, useSelector } from "react-redux";
import ProfileOrders from "../../components/ProfileOrders/ProfileOrders";
import styles from "./ProfileOptions.module.css";
import { setProfileOptions } from "../../redux/actions";
import ProfileInfo from "../../components/ProfileInfo/ProfileInfo";

function ProfileOptions() {  
  const profileOptions = useSelector((state) => state.profileOptions);
  const dispatch = useDispatch()

  return (
    <div className={styles.container}>
      <div className={styles.selection}>
        <div className={styles.selectionbox}>
          <button
            value='information'
            className={styles.options}
            onClick={(e) => {
              dispatch(setProfileOptions(e.target.value));
            }}
          >
            Profile Information
          </button>
          <button
            value='reservations'
            className={styles.options}
            onClick={(e) => {
              dispatch(setProfileOptions(e.target.value));
            }}
          >
            My Reservations
          </button>
        </div>
      </div>
      <div className={styles.render}>
        {profileOptions === 'information' && <ProfileInfo />}
        {profileOptions === 'reservations' && <ProfileOrders />}
      </div>
    </div>
  );
}





export default ProfileOptions;
