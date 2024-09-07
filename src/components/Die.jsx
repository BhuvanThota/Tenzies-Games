import React from 'react'

export default function Die(props){
    return(
        <>
            <button className={props.isHeld?"die value hold":"die value"} onClick={props.handleClick} > {props.value}  </button>
        </>
    );

}