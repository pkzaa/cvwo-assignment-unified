// Error box that only shows up when an error occurs

import React from "react";
import { CardPanel } from "react-materialize";

export default function ErrorBox(props) {
    return props.error ? (
        <>
            <CardPanel className="red darken-2">
                <span className="white-text">
                    {props.error}
                </span>
            </CardPanel>
        </>
    ) : (<></>)
}; 
