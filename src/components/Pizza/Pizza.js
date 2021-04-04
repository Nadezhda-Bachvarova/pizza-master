import React from 'react';
 
import classes from './Pizza.module.css';
import classesProduct from './PizzaProduct/PizzaProduct.module.css';
import PizzaProduct from './PizzaProduct/PizzaProduct';

const pizza = (props) => {
    console.log(props);
    let productPizzaTransform = Object.keys(props.products)
        .map(prodKey => {
            return [...Array(props.products[prodKey])].map((_, i) => {
                return <PizzaProduct key={prodKey + i} type={prodKey}/>;
                });
        })
        .reduce((arr, el) => {
            return arr.concat(el)
        }, []);

    if (productPizzaTransform.length === 0) {
        productPizzaTransform = <p>Please, choice the product/s!</p>
    }

    return (
        <div className={classes.PizzaContent}>
            <div className={classesProduct.Pizza}>
                <div className={classesProduct.Crust}>
                    <div className={classesProduct.Cheese}>
                        {productPizzaTransform}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default pizza;