import React from 'react';

import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

const orderInformation = (props) => {
    const productSummary = Object.keys(props.products)
        .map( prodKey => {
            return (
                <li key={prodKey}>
                    <span style={{ textTransform: 'capitalize' }}>{prodKey}</span>: {props.products[prodKey]}
                </li> );
        });

    return (
        <Aux>
            <h3>Your Order</h3>
            <p>Your pizza contain following products:</p>
            <ul>
                {productSummary}
            </ul>
            <p><strong>Total Price: {props.price} lv</strong></p>
            <p>Do you finish your order?</p>
            <Button btnType="Danger" clicked={props.purchaseCancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
        </Aux>
    );  
};

export default orderInformation;