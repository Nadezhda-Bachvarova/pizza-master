import React from 'react';

import classes from './Pizza.module.css';
import PizzaProduct from './PizzaProduct/PizzaProduct';

const pizza = (props) => {
    let productPizzaTransform = Object.keys(props.products)
        .map(prodKey => {
            return [...Array(props.products[prodKey])].map((_, i) => {
                return <PizzaProduct key={prodKey + i} type={prodKey}/>;
                });
        })
        .reduce((arr, el) => {
            return arr.concat(el)
        }, []);

        console.log(productPizzaTransform)

    if (productPizzaTransform.length === 0) {
        productPizzaTransform = <p>Please, choice the product/s!</p>
    }

    return (
        <div className={classes.PizzaContent}>
            <PizzaProduct type="pizza-and-crust">
                {productPizzaTransform}
            </PizzaProduct>
        </div>
    )
}

export default pizza;