import React from "react";
import './styles/Input.css';
import { useState } from "react";

const STYLES = [
    "input--clean--light",
    "input--clean--dark",
    "input--dark--border",
    "input--light--border",
];

const SIZES = [
    "input--big",
    "input--medium",
    "input--small",
];



const Input = ({onChange, insputSize, inputStyle, children, placeholder }) => {


    const checkInputStyle = STYLES.includes(inputStyle) ? inputStyle : STYLES[0];
    const checkInputSize = SIZES.includes(insputSize) ? insputSize : SIZES[0];

    return ( 
        <input
            type="text"
            className={
                `input ${checkInputSize} ${checkInputStyle}`
            }
            placeholder = {placeholder}
            onChange={onChange}
        >
        {children}    
        </input>
     );
}
 
export default Input;