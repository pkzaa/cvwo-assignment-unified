// Wrapper for hiding things

import React from "react";

export default function HideWrapper(props) {
    return props.show === true ? props.children : <></>
}; 
