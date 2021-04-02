import React from 'react';

// import Pizza from '../../Pizza';
import classes from './CheckoutSummary.module.css';
import Button from '../../../UI/Button/Button';
import cover from '../../../../assets/images/cover.jpg';

const checkoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <div>
                <h1>Yummy, your order is almost done!</h1>
                <img src={cover} alt='Do you want pizza?' style={{width: '100%', height: '300px', margin: 'auto'}}/>
            </div>
            <Button btnType="Danger" clicked>Cancel</Button>
            <Button btnType="Success" clicked>CONTINUE</Button>
        </div>
    )
}

export default checkoutSummary;