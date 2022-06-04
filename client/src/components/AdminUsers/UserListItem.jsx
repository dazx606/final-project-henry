import React, { useEffect } from 'react';
import style from "./adminUsers.module.css";

function UserListItem(user) {
    const noInfo = 'No Info';
    const tUser = user.user;

    useEffect(() => {
        
    }, [user])

    return (
        <div className={style.userListItem}>
            {tUser.picture ? <img  className={style.imgIcon} src={tUser.picture} /> : null}
            <div className={style.name}>{tUser.firstName ? tUser.firstName : noInfo}</div>
            <div className={style.name}>{tUser.lastName ? tUser.lastName : noInfo}</div>
            <div className={style.email}>{tUser.email}</div>
            <div className={style.trashIcon}>
                <i className="fa-solid fa-trash-can"></i>
            </div>
        </div>
    )
}

export default UserListItem