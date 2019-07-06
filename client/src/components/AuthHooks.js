import React, {useState} from 'react';

const UseAuthForm = (callback) => {
    const [inputs, setInputValues] = useState({});
    const handleSubmit = (e) => {
        e && e.preventDefault();
        let name = inputs.name;
        let email = inputs.email;
        let username = inputs.username;
        let password = inputs.password;

        let fullUser = name ? {name, email, password} : {username, password}

        callback(fullUser);
    }

    const handleChange = (e) => {
        e.persist();
        setInputValues(inputs => ({...inputs, [e.target.name]: e.target.value}))
    }

    return {
        handleChange,
        handleSubmit,
        inputs
    }
}

export default UseAuthForm;