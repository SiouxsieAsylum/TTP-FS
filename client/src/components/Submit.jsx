import React, {useState} from 'react';

const Submit = (props) => {

    const [isHovered, toggleHover] = useState(false);

    return (
        <input 
            type="submit"
            onMouseEnter={() => toggleHover(true)} 
            onMouseLeave={() => toggleHover(false)}
            className={isHovered ? "hovered-button submit-button input-class": "submit-button input-class"}/>
    )
}

export default Submit;