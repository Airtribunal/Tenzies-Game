import React from 'react';
import {TextField} from '@mui/material';


const Settinngs = (props) => {
    return (
        <section className="settings-section">
            <h1 className="settings-title">Settings</h1>
            <div className="settings-container">
                <TextField className="settings-input dies" id="outlined-basic" label="Amount of Dies" variant="outlined" />
                <TextField className="settings-input numbers" id="outlined-basic" label="Numbers" variant="outlined" />
            </div>
            <button className="back-button" onClick={props.backToWelcome}>Back</button>
        </section>
    );
}

export default Settinngs;
