import React from 'react';
import CreatePizzaControl from './CreatePizzaControl/CreatePizzaControl';

import classes from './CreatePizzaControls.module.css';

const controls = [
    { label: 'Pepperoni', type: 'pepperoni'},
    { label: 'Mushroom', type: 'mushroom'},
    { label: 'Olive', type: 'olive'},
    { label: 'Oregano', type: 'oregano'}
]

const createPizzaControls = (props) => (
    <div className={classes.CreatePizzaControls}>
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl => (
            <CreatePizzaControl
                key={ctrl.label} 
                label={ctrl.label}
                added={() => props.ingredientAdded(ctrl.type)}
                removed={() => props.ingredientRemoved(ctrl.type)}
                disabled={props.disabled[ctrl.type]} />
        ))}
        <button 
            className={classes.OrderButton}
            disabled={!props.purchasable}
            onClick={props.ordered}>SEND YOUR ORDER</button>
    </div>
);

export default createPizzaControls;