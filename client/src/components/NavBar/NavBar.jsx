import React from 'react';
import {NavLink, Outlet} from 'react-router-dom';

function NavBar() {
  return (
    <div>
        <div>
            codigo de NavBar
        </div>
        <Outlet />
    </div>
  )
}

export default NavBar