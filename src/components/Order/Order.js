import React from 'react';

import classes from './Order.module.css';

const order = ( props ) => {
    const products = [];

    for ( let productName in props.products ) {
        products.push(
            {
                name: productName,
                amount: props.products[productName]
            }
        );
    }

    const productOutput = products.map(el => {
        return <span 
            style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '5px'
                }}
            key={el.name}>{el.name} ({el.amount})</span>;
    });

    return (
        <div className={classes.Order}>
            <p>Products: {productOutput}</p>
            <p>Price: <strong>LV {Number.parseFloat( props.price ).toFixed( 2 )}</strong></p>
        </div>
    );
};

export default order;