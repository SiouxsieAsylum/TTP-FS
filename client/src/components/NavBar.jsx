import React from 'react';


const NavBar = (props) => {
    return (
        <ul>
            <li onClick={() => props.setAuthType('login')}>Login</li>
            <li onClick={() => props.setAuthType('register')}>Register</li>
        </ul>
    )
}

export default NavBar;