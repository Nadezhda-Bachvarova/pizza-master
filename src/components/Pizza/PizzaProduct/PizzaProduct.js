import React,{ Component } from 'react';
import PropTypes from 'prop-types';

import classes from './PizzaProduct.module.css';

class PizzaProduct extends Component {
    render() {
        let product = null;

        switch (this.props.type) {
            case ('pizza-and-crust'):
                product =   (<div className={classes.Pizza}>
                                <div className={classes.Crust}></div>
                            </div>);
                break;
            case('cheese'):
                product = (<div className={classes.Pizza}>
                                <div className={classes.Crust}>
                                    <div className={classes.Cheese}></div>
                                </div>
                            </div>);
                break;
            case('pepperoni'):
                product = (<div className={[classes.Pepperoni, classes.Topping-1, classes.Topping-2, 
                    classes.Topping-3, classes.Topping-4].join(' ')}></div>)
                break;
            case('mushroom'):
                product = (<div className={[classes.Mushroom, classes.Topping-5, classes.Topping-6, 
                    classes.Topping-7, classes.Topping-8].join(' ')}></div>)
                break;
            case('olive'):
                product = (<div className={[classes.Olive, classes.Topping-9, classes.Topping-10, 
                    classes.Topping-11, classes.Topping-12].join(' ')}></div>)
                break;
            case('origano'):
                product = (<div className={[classes.Origano, classes.Topping-13, classes.Topping-14, classes.Topping-15, classes.Topping-16,
                    classes.Topping-17, classes.Topping-18, classes.Topping-19].join(' ')}></div>)
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