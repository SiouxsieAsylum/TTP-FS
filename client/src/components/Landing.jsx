import React from 'react';
import { Redirect } from 'react-router-dom';
import Stocks from '../images/favicon.png';

const Landing = (props) => {
    if (props.isLoggedIn) return <Redirect to="/portfolio" />
    return  (
    <div className="landing page">
        <div className="landing-sidebar">
            <div className="icon-background">
                <img className="icon" src={Stocks} alt-text="logo" />
            </div>

            <h1 className="landing-sidebar-text sidebar-text-big">Folio</h1>
            <h2 className="landing-sidebar-text sidebar-text-small">Managing Investments</h2>
        </div>


    </div>)
}

export default Landing;