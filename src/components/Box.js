import React from 'react';
import { useState } from "react";

function Box(props) {
    const { date, past, backgroundColor } = props;
    return (
        <div className={`box`} style={{
            backgroundColor
        }}>
            {date}
        </div>
    );
}

export default Box;
