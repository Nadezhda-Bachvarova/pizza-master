import React from 'react';

import Pizza from '../../Pizza/Pizza';
import classes from './CheckoutSummary.module.css';
import Button from '../../UI/Button/Button';
// import cover from '../../../../assets/images/cover.jpg';

const checkoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
                <h1>Yummy, your order is almost done!</h1>
                <div style={{width: '100%', margin: 'auto'}}>
                    <Pizza products={props.products}/>
                </div>
                {/* <img src={cover} alt='Do you want pizza?' style={{width: '100%', height: '300px', margin: 'auto'}}/> */}
            <Button btnType="Danger" clicked={props.checkoutCancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.checkoutContinued}>CONTINUE</Button>
        </div>
    )
}

export default checkoutSummary;