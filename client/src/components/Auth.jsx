import React, {useState, useEffect} from 'react';
import {Redirect, withRouter} from 'react-router-dom';
import lifecycle from 'react-pure-lifecycle';
import CustomInput from './CustomInput';
import Submit from './Submit';
import UseAuthForm from './AuthHooks';


const Auth = (props) => {
    const  {inputs, handleChange, handleSubmit} = UseAuthForm(props.authHandler, () => {props.history.push('/portfolio')});
    
    const params = props.match.params;

    useEffect(() => {
        if (params.auth && params.auth !== "portfolio") props.setAuthType(params.auth)
    })

    if (props.isLoggedIn) return <Redirect to="/portfolio" />



    return (
        
        <form className="auth-form" onSubmit={handleSubmit}>
            { props.authType === 'register' && 
            <>  
                <CustomInput 
                    name="Name"
                    label="Full Name"
                    changeHandler={handleChange}
                    inputs={inputs} />

                <CustomInput 
                    name="email"
                    label="Email Address"
                    type="email"
                    changeHandler={handleChange}
                    inputs={inputs} />

            </>
            }

            {props.authType === 'login' && 
                <>

                    <CustomInput 
                        name="username"
                        label="Email Address"
                        type="email"
                        changeHandler={handleChange}
                        inputs={inputs} />

                </>
            }
            

            {props.authType && 
            <>
                <CustomInput 
                    name="password"
                    label="Password"
                    type="password"
                    changeHandler={handleChange}
                    inputs={inputs} />

                <Submit />
            </>
        }
        </form>
    )
}


export default withRouter(Auth);