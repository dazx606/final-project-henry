import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./adminUsers.module.css";
import { useAuth0 } from "@auth0/auth0-react";
import { deleteUser, getAdminUsers } from "../../redux/actions";
import UserListItem from "./UserListItem";

export default function AdminUsers() {
  const { getAccessTokenSilently } = useAuth0();
  const allUsers = useSelector((state) => state.users);
  //   const [alert, setAlert] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAdminUsers(getAccessTokenSilently()));
  }, [dispatch]);

  return (
    <div className={style.usersBox}>
    <div className={style.userListItem }>
    <div className={style.imgIcon}></div>
      <div className={style.name}>First Name</div>
      <div className={style.name}>Last Name</div>
      <div className={style.email}>Email</div>
      <div className={style.trashIcon}>Delete User</div>
    </div>
      {allUsers?.map((u) => <UserListItem key={u.id} user={u} />)}
    </div>
    

  ) 
}

// function UserCard({ user }) {
//   const dispatch = useDispatch();
//   const { getAccessTokenSilently } = useAuth0();
//   function handleClick(e) {
//     e.preventDefault();
//     dispatch(deleteUser(getAccessTokenSilently, user.id));
//   }
//   return (
//     <div className={styles.userContainer}>
//       {/* <div>
//           <span>Picture</span>
//           <span>{user.data.picture ? user.data.picture : "N/A"}</span>
//         </div> */}

//       <div>
//         <span className={styles.infoUser}>firstName:</span>
//         <span className={styles.infoData}>{user.firstName}</span>
//       </div>
//       <div>
//         <span className={styles.infoUser}>LastName:</span>
//         <span className={styles.infoData}>{user.lastName}</span>
//       </div>
//       <div>
//         <span className={styles.infoUser}>Email:</span>
//         <span className={styles.infoData}>{user.email}</span>
//       </div>
//       <div>
//         <span className={styles.infoUser}>License:</span>
//         <span className={styles.infoData}>{user.license}</span>
//       </div>
//       <div>
//         <span className={styles.infoUser}>DocumentId:</span>
//         <span className={styles.infoData}>{user.documentId}</span>
//       </div>
//       <div>
//         <span className={styles.infoUser}>Phone:</span>
//         <span className={styles.infoData}>{user.phone}</span>
//       </div>
//       {/* <div>
//           <span>Drivers</span>
//           <span></span>
//           <span>lastName</span>
//         </div>
//         <div>
//           <span>Payment</span>
//           <span>firstName</span>
//           <span>lastName</span>
//         </div> */}
//       <div>
//         <button onClick={handleClick}>x</button>
//       </div>
//     </div>
//   );
// }
