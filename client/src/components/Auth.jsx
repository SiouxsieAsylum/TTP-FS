import React, {useState, useEffect} from 'react';
import {Redirect, withRouter} from 'react-router-dom';
import lifecycle from 'react-pure-lifecycle';
import UseAuthForm from './AuthHooks'


const Auth = (props) => {
    const  {inputs, handleChange, handleSubmit} = UseAuthForm(props.authHandler, () => {props.history.push('/portfolio')});
    
    const params = props.match.params;

    useEffect(() => {
        if (params.auth) props.setAuthType(params.auth)
    })

    if (props.isLoggedIn) return <Redirect to="/portfolio" />



    return (
        
        <form className="auth-form" onSubmit={handleSubmit}>
            { props.authType === 'register' && 
            <>
                <label htmlFor="name">Name</label>
                <input
                    onChange={handleChange}
                    value={inputs.name}
                    name="name" required/> 


                <label htmlFor="email">Email Address</label>
                <input
                    onChange={handleChange}
                    type="email" 
                    value={inputs.email}
                    name="email" required/>
            </>
            }

            {props.authType === 'login' && 
                <>
                    <label htmlFor='username'>Email Address</label>
                    <input
                        onChange={handleChange}
                        type="email" 
                        value={inputs.username}
                        name='username' required/>
                </>
            }
            

            {props.authType && 
            <>
                <label htmlFor="password">Password</label>
                <input
                    onChange={handleChange}
                    type="password" 
                    value={inputs.password}
                    name="password" required/>
                <input type="submit" />
            </>
        }
        </form>
    )
}


export default withRouter(Auth);