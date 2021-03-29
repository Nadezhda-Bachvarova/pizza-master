import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import classes from './PizzaProduct.module.css';

class PizzaProduct extends Component {
    render() {
        let product = null;

        switch (this.props.type) {
            case ('pepperoni'):
                product = <Fragment>
                    <div className={[classes.Pepperoni, classes.ToppingPepperoniA].join(' ')}></div>
                    <div className={[classes.Pepperoni, classes.ToppingPepperoniB].join(' ')}></div>
                    <div className={[classes.Pepperoni, classes.ToppingPepperoniC].join(' ')}></div>
                    <div className={[classes.Pepperoni, classes.ToppingPepperoniD].join(' ')}></div>
                </Fragment>
                break;
            case ('mushroom'):
                product = <Fragment>
                    <div className={[classes.Mushroom, classes.ToppingMushroomA].join(' ')}></div>
                    <div className={[classes.Mushroom, classes.ToppingMushroomB].join(' ')}></div>
                    <div className={[classes.Mushroom, classes.ToppingMushroomC].join(' ')}></div>
                    <div className={[classes.Mushroom, classes.ToppingMushroomD].join(' ')}></div>
                </Fragment>
                break;
            case ('olive'):
                product = <Fragment>
                    <div className={[classes.Olive, classes.ToppingOliveA].join(' ')}></div>
                    <div className={[classes.Olive, classes.ToppingOliveB].join(' ')}></div>
                    <div className={[classes.Olive, classes.ToppingOliveC].join(' ')}></div>
                    <div className={[classes.Olive, classes.ToppingOliveD].join(' ')}></div>
                </Fragment>
                break;
            case ('oregano'):
                product = <Fragment>
                    <div className={[classes.Oregano, classes.ToppingOreganoA].join(' ')}></div>
                    <div className={[classes.Oregano, classes.ToppingOreganoB].join(' ')}></div>
                    <div className={[classes.Oregano, classes.ToppingOreganoC].join(' ')}></div>
                    <div className={[classes.Oregano, classes.ToppingOreganoD].join(' ')}></div>
                    <div className={[classes.Oregano, classes.ToppingOreganoE].join(' ')}></div>
                    <div className={[classes.Oregano, classes.ToppingOreganoF].join(' ')}></div>
                    <div className={[classes.Oregano, classes.ToppingOreganoG].join(' ')}></div>
                </Fragment>
                break;
            default:
                product = null;
        }
        return product;
    }
}

PizzaProduct.propTypes = {
    type: PropTypes.string.isRequired
};

export default PizzaProduct;