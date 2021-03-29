import React, { Component } from 'react';

import Aux from '../../hoc/Aux/Aux';
import Pizza from '../../components/Pizza/Pizza';
import CreatePizzaControls from '../../components/Pizza/CreatePizzaControls/CreatePizzaControls';
import Modal from '../../components/UI/Modal/Modal';
import Order from '../../components/Pizza/Order/Order';

const PRODUCT_PRICES = {
    pepperoni: 1.40,
    mushroom: 0.90,
    olive: 0.70,
    oregano: 0.20
};

class PizzaCreator extends Component {
    state = {
        products: {
            pepperoni: 0,
            mushroom: 0,
            olive: 0,
            oregano: 0
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

    addProductHandler = ( type ) => {
        const oldCount = this.state.products[type];
        if (this.state.products[type] === 0) {
            const updatedCount = oldCount + 1;
            const updatedProducts = {
                ...this.state.products
            };
            updatedProducts[type] = updatedCount;
            const oldPrice = this.state.totalPrice;
            const newPrice = oldPrice + PRODUCT_PRICES[type];
            this.setState( { totalPrice: newPrice, products: updatedProducts } );
            this.updatePurchaseState(updatedProducts);
        }
    }

    removeProductHandler = ( type ) => {
        const oldCount = this.state.products[type];
        if ( oldCount <= 0 ) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedProducts = {
            ...this.state.products
        };
        updatedProducts[type] = updatedCount;
        const priceDeduction = PRODUCT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState( { totalPrice: newPrice, products: updatedProducts } );
        this.updatePurchaseState(updatedProducts);
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
                    ingredientAdded={this.addProductHandler}
                    ingredientRemoved={this.removeProductHandler}
                    disabled={disabledInfo}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}
                    price={this.state.totalPrice} />
            </Aux>
        );
    }
}

export default PizzaCreator;