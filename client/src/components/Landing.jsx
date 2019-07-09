import React from 'react';
import { Redirect } from 'react-router-dom';

const Landing = (props) => {
    if (props.isLoggedIn) return <Redirect to="/portfolio" />
    return  <h1>Welcome!!</h1>
}

export default Landing;