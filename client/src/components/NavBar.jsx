import React from 'react';
import { Link } from 'react-router-dom';


const NavBar = (props) => {
    return (
        <ul>
            <Link to='/login'>
                <li onClick={() => props.setAuthType('login')}>Login</li>
            </Link >
            <Link to='/register'>
                <li onClick={() => props.setAuthType('register')}>Register</li>
            </Link>
        </ul>
    )
}

export default NavBar;