import React from 'react';
import UseAuthForm from './AuthHooks'
// import Login from './Login';
// import Register from './Register';


const Auth = (props) => {
   const  {inputs, handleChange, handleSubmit} = UseAuthForm(props.authHandler);
    console.log(inputs);
    return (
        <form onSubmit={handleSubmit}>
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
            

            
            <label htmlFor="password">Password</label>
            <input
                onChange={handleChange}
                type="password" 
                value={inputs.password}
                name="password" required/>
            <input type="submit" />
        </form>
    )
}


export default Auth;