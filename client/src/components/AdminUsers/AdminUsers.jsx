import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./adminUsers.module.css";
import { useAuth0 } from "@auth0/auth0-react";
import { deleteUser, getAdminUsers } from "../../redux/actions";
import UserListItem from "./UserListItem";
import DltAlert from "./DltAlert";

export default function AdminUsers() {
  const { getAccessTokenSilently } = useAuth0();
  const allUsers = useSelector((state) => state.users);
  const [email, setEmail] = useState('');
  const [alert, setAlert] = useState(false);
  const [dltUser, setDltUser] = useState({ email: '', id: '' })
  //   const [alert, setAlert] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAdminUsers(getAccessTokenSilently(), email));

  }, [dispatch, email]);

  function handleUserSearch(e) {
    let searchEmail = e.target.value;
    setEmail(e.target.value);
    dispatch(getAdminUsers(getAccessTokenSilently(), searchEmail))
  }

  function handleTClick(email, id) {
    setAlert(true)
    setDltUser({ ...dltUser, email: email, id: id })
  };
  function handleDltClick() {
    dispatch(deleteUser(getAccessTokenSilently(), dltUser.id))
    setAlert(false)
  }


  return (
    <div className={style.adminUsers}>
      <div className={style.searchUser}>
        <input className={`inputGlobal ${style.inputSearch}`} type='search' placeholder="Find user by email" value={email} onChange={handleUserSearch} />
      </div>

      <div className={style.usersBox}>
        {allUsers.length ?
          <div className={style.internBox} >
            <div className={style.listTitle}>
              <div className={style.namePemail}>
                <div className={style.nameT}>User</div>
                <div className={style.emailT}>Email</div>
              </div>
              <div className={style.trashTitle}>Delete</div>
            </div>
            {allUsers?.map((u) => <UserListItem handleTClick={handleTClick} key={u.id} user={u} />)}
          </div>
          :
          <div className={style.internBox}>User not found</div>
        }
      </div>
      {
        alert &&
        <div className={style.alert}>
          <DltAlert setAlert={setAlert} handleDltClick={handleDltClick} dltUser={dltUser} alert={alert} />
        </div>
      }

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
