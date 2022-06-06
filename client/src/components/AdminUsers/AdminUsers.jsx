import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./adminUsers.module.css";
import { useAuth0 } from "@auth0/auth0-react";
import { deleteUser, getAdminUsers } from "../../redux/actions";
import UserListItem from "./UserListItem";
import { getAllUsersInfo } from "../../services/services";

export default function AdminUsers() {
  const { getAccessTokenSilently } = useAuth0();
  const allUsers = useSelector((state) => state.users);
  const [email, setEmail] = useState('');
  const [alert, setAlert] = useState({sure: false, ok: false});
  const [dltUser, setDltUser] = useState({email:'', id: ''})
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
    setAlert({...alert, sure: true})
    setDltUser({...dltUser, email: email, id: id})
  };
  function handleDltClick(){
    dispatch(deleteUser(getAccessTokenSilently(), dltUser.id))
    setAlert({...alert, ok: true});
    setTimeout(setAlert({...alert, sure: false, ok:false}, 10000));
  }

  return (
    <div>
      <div className={style.searchUser}>
        <input className={`inputGlobal ${style.inputSearch}`} type='search' placeholder="Find user by email" value={email} onChange={handleUserSearch} />
      </div>

      <div className={style.usersBox}>
        {allUsers.length ?
          <div>
            <div className={style.listTitle}>
              <div className={style.imgIcon}></div>
              <div className={style.name}>First Name</div>
              <div className={style.name}>Last Name</div>
              <div className={style.email}>Email</div>
              <div className={style.trashIcon}>Delete User</div>
            </div>
            {allUsers?.map((u) => <UserListItem handleTClick={handleTClick} key={u.id} user={u} />)}
          </div>
          :
          <div>User not found</div>

        }
      </div>
      {
        alert.sure ? 
        !alert.ok ? 
        <div>
          <div>Are you sure you want to delete the user {dltUser.email}?</div>
          <button onClick={handleDltClick}>Delete</button>
        </div>
        : 
        <div>
          The user {dltUser.email} has been deleted
        </div>
        : null
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
