import React from 'react';

const Die = (props) => {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "#fff"
    }

    return (
        <div className="die-face" onClick={() => props.heldChecker(props.id)} style={styles}>
            <h2 className="die-number">{props.value}</h2>
        </div>
    );
}

export default Die;
