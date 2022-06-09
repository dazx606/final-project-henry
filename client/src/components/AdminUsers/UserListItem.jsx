import React, { useEffect, useState } from 'react';
import style from "./adminUsers.module.css";

function UserListItem({user, handleTClick}) {
    const noInfo = 'No Info';

    return (

        <div className={style.userListItem}>
            <div className={style.name}>{user.firstName ? user.firstName : noInfo}</div>
            <div className={style.name}>{user.lastName ? user.lastName : noInfo}</div>
            <div className={style.email}>{user.email}</div>
            <div className={style.trashIcon} value={user.id} name={user.email} onClick={(email, id) => handleTClick(user.email, user.id)}>
                <i className="fa-solid fa-trash-can" ></i>
            </div>
        </div>


    )
}

export default UserListItem