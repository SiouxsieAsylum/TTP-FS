import React from 'react';
import {Link} from 'react-router-dom';
import Stocks from '../images/favicon.png';


const LogOut = () => {
    return (
    <div className="landing page">
        <div className="landing-sidebar">
            <div className="icon-background">
                <img className="icon" src={Stocks} alt-text="logo" />
            </div>

            <h1 className="landing-sidebar-text sidebar-text-big">Folio</h1>
            <h2 className="landing-sidebar-text sidebar-text-small">Managing Investments</h2>
        </div>

        <h1 className="positioned-header">You are now logged out. Click here to go <Link to="/">Home.</Link></h1>
    </div>
    )
}

export default LogOut;