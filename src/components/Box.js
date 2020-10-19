import React from 'react';
import { useState } from "react";

function Box(props) {
    const { date, past, backgroundColor, borderColor } = props;
    return (
        <div className={`box`} style={{
            backgroundColor: backgroundColor ? backgroundColor : borderColor,
            borderStyle: "solid",
            borderWidth: "2px",
            borderColor
        }}>
            {/* {date} */}
        </div>
    );
}

export default Box;
