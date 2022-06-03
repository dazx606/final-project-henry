import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./adminUsers.module.css";
import { useAuth0 } from "@auth0/auth0-react";
import { deleteUser, getAdminUsers } from "../../redux/actions";

export default function AdminUsers() {
  const { getAccessTokenSilently } = useAuth0();
  const users = useSelector((state) => state.users);
  //   const [alert, setAlert] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAdminUsers(getAccessTokenSilently));
  }, []);

  return users.map((user) => <UserCard key={user.id} user={user} />);
}

function UserCard({ user }) {
  const dispatch = useDispatch();
  const { getAccessTokenSilently } = useAuth0();
  function handleClick(e) {
    e.preventDefault();
    dispatch(deleteUser(getAccessTokenSilently, user.id));
  }
  return (
    <div className={styles.userContainer}>
      {/* <div>
          <span>Picture</span>
          <span>{user.data.picture ? user.data.picture : "N/A"}</span>
        </div> */}

      <div>
        <span className={styles.infoUser}>firstName:</span>
        <span className={styles.infoData}>{user.firstName}</span>
      </div>
      <div>
        <span className={styles.infoUser}>LastName:</span>
        <span className={styles.infoData}>{user.lastName}</span>
      </div>
      <div>
        <span className={styles.infoUser}>Email:</span>
        <span className={styles.infoData}>{user.email}</span>
      </div>
      <div>
        <span className={styles.infoUser}>License:</span>
        <span className={styles.infoData}>{user.license}</span>
      </div>
      <div>
        <span className={styles.infoUser}>DocumentId:</span>
        <span className={styles.infoData}>{user.documentId}</span>
      </div>
      <div>
        <span className={styles.infoUser}>Phone:</span>
        <span className={styles.infoData}>{user.phone}</span>
      </div>
      {/* <div>
          <span>Drivers</span>
          <span></span>
          <span>lastName</span>
        </div>
        <div>
          <span>Payment</span>
          <span>firstName</span>
          <span>lastName</span>
        </div> */}
      <div>
        <button onClick={handleClick}>x</button>
      </div>
    </div>
  );
}
