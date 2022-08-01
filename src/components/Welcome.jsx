import React from 'react';

const Welcome = (props) => {
    return (
        <section className='welcome-section'>
            <div className="welcome-container">
                <div className="welcome-text">
                    <h1 className="welcome-logo">Tenzies Game</h1>
                    <p className="welcome-direction">If You are ready to play, just click the button below. Have Fun!</p>
                </div>
                <button onClick={props.handleClick} className="welcome-start-button welcome-button">Switch</button>
                {/* <button className="welcome-settings-button welcome-button" onClick={props.openSettings}>Settings</button> */}
                <p className="author">Created by Airtribunal</p>
            </div>
        </section>
    );
}

export default Welcome;
