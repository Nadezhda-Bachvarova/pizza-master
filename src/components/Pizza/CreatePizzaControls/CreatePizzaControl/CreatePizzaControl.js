import React from 'react';

import classes from './CreatePizzaControl.module.css';

const createPizzaControl = (props) => (
    <div className={classes.CreatePizzaControl}>
        <div className={classes.Label}>{props.label}</div>
        <button 
            className={classes.Remove} 
            onClick={props.removed} 
            disabled={props.disabled}>-</button>
        <button 
            className={classes.Add} 
            onClick={props.added}>+</button>
    </div>
)

export default createPizzaControl;