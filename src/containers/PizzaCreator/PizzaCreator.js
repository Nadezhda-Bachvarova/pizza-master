import React, { Component } from 'react';

import Aux from '../../hoc/Aux/Aux';
import Pizza from '../../components/Pizza/Pizza';
import CreatePizzaControls from '../../components/Pizza/CreatePizzaControls/CreatePizzaControls';
import Modal from '../../components/UI/Modal/Modal';
import Order from '../../components/Pizza/Order/Order';

const INGREDIENT_PRICES = {
    cheese: 1.10,
    pepperoni: 1.40,
    mushroom: 0.90,
    olive: 0.70,
    origano: 0.20
};

class PizzaCreator extends Component {
    state = {
        products: {
            cheese: 0,
            pepperoni: 0,
            mushroom: 0,
            olive: 0,
            origano: 0
        },
        totalPrice: 5,
        purchasable: false,
        purchasing: false
    }

    updatePurchaseState (products) {
        const sum = Object.keys( products )
            .map( prodKey => {
                return products[prodKey];
            } )
            .reduce( ( sum, el ) => {
                return sum + el;
            }, 0 );
        this.setState( { purchasable: sum > 0 } );
    }

    addIngredientHandler = ( type ) => {
        const oldCount = this.state.products[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.products
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState( { totalPrice: newPrice, products: updatedIngredients } );
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = ( type ) => {
        const oldCount = this.state.products[type];
        if ( oldCount <= 0 ) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.products
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState( { totalPrice: newPrice, products: updatedIngredients } );
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        alert('You continue!');
    }

    render () {
        const disabledInfo = {
            ...this.state.products
        };
        for ( let key in disabledInfo ) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <Order
                        products={this.state.products}
                        price={this.state.totalPrice}
                        purchaseCancelled={this.purchaseCancelHandler}
                        purchaseContinued={this.purchaseContinueHandler} />
                </Modal>
                <Pizza products={this.state.products} />
                <CreatePizzaControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}
                    price={this.state.totalPrice} />
            </Aux>
        );
    }
}

export default PizzaCreator;