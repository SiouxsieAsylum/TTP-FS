import React, {useState} from 'react';

const CustomInput = (props) => {

    const [isFocused, toggleFocus] = useState(false)

    return (
        <>
            <label 
                className={isFocused? "focused-text input-label": "input-label"}
                htmlFor={props.name}>{props.label}</label>
            <input
                type={props.type ? props.type : "text"}
                className={isFocused ? "focused-input input-class" : "input-class"}
                onFocus={() => toggleFocus(true)}
                onBlur={()=> toggleFocus(false)}
                onChange={props.changeHandler}
                value={props.inputs[props.name]}
                name={props.name} required/> 
        </>
    )

}

export default CustomInput;