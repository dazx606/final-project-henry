import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAuth0 } from "@auth0/auth0-react";
import { login } from '../../redux/actions'
import { useHref } from "react-router-dom";

function Login() {
    const loginf = useSelector(state => state.login)
    const dispatch = useDispatch()
    const { loginWithPopup } = useAuth0();
    const { logout } = useAuth0();
    

    return (
        <div>
            <div>Login</div>
            <button onClick={() => loginWithPopup( {screen_hint:'signup'} )}>Log In</button>

            <div>Logout</div>
            <button onClick={() => logout()}>Log Out</button>
        </div>

    )
}

export default Login