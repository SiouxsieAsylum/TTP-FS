import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';


const NavLink = (props) => {

    const [isHovered, toggleHover] = useState(false);

    return (
        <Link 
            onMouseEnter={() => toggleHover(true)} 
            onMouseLeave={() => toggleHover(false)}
            className={isHovered ? "hovered-link": ""}
            to={"/" + props.clickArg}>
            <li onClick={() => props.clickFunction && props.clickFunction()}>{props.clickArg.toUpperCase()}</li>
        </Link>
    )
}


const NavBar = (props) => {
    if (props.isLoggedIn) {
        return (
            <ul className="nav-bar">
                <NavLink
                    clickFunction={props.logout}
                    clickArg="logout"
                    />
            </ul>

        )
    } else {
        return (
            <ul className="nav-bar">
                <NavLink 
                    clickArg="login"
                    />
                <NavLink 
                    clickArg="register"
                    />
            </ul>
        )
    }

}

export default NavBar;