import React, { Component } from 'react';

import Aux from '../../hoc/Aux/Aux';
import Pizza from '../../components/Pizza/Pizza';
import CreatePizzaControls from '../../components/Pizza/CreatePizzaControls/CreatePizzaControls';
import Modal from '../../components/UI/Modal/Modal';
import Order from '../../components/Pizza/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import Checkout from '../Checkout/Checkout';

const PRODUCT_PRICES = {
    pepperoni: 1.40,
    mushroom: 0.90,
    olive: 0.70,
    oregano: 0.20,
};

class PizzaCreator extends Component {
    state = {
        products: null,
        totalPrice: 5,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        axios.get('https://pizza-master-c580b-default-rtdb.europe-west1.firebasedatabase.app/products.json')
            .then(response => {
                this.setState({ products: response.data });
            })
            .catch(error => {
                this.setState({error: true})
            })
    }

    updatePurchaseState(products) {
        const sum = Object.keys(products)
            .map(prodKey => {
                return products[prodKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        this.setState({ purchasable: sum > 0 });
    }

    addProductHandler = (type) => {
        const oldCount = this.state.products[type];
        if (this.state.products[type] === 0) {
            const updatedCount = oldCount + 1;
            const updatedProducts = {
                ...this.state.products
            };
            updatedProducts[type] = updatedCount;
            const oldPrice = this.state.totalPrice;
            const newPrice = oldPrice + PRODUCT_PRICES[type];
            this.setState({ totalPrice: newPrice, products: updatedProducts });
            this.updatePurchaseState(updatedProducts);
        }
    }

    removeProductHandler = (type) => {
        const oldCount = this.state.products[type];
        if (oldCount <= 0) {
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
        this.setState({ totalPrice: newPrice, products: updatedProducts });
        this.updatePurchaseState(updatedProducts);
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        this.setState({ loading: true });
        const orderInformation = {
            products: this.state.products,
            price: this.state.totalPrice,
            customer: {
                name: 'Nadezhda',
                adress: {
                    street: 'Mladost',
                    postCode: '1784',
                    city: 'Sofia'
                },
                email: 'test@test.com'
            },
            payMethod: 'cash'
        }
        axios.post('/orders.json', orderInformation)
            .then(response => {
                this.setState({ loading: false, purchasing: false });
            })
            .catch(error => {
                this.setState({ loading: false, purchasing: false });
            });
    }

    render() {
        const disabledInfo = {
            ...this.state.products
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let order = null;
        if (this.state.loading) {
            order = <Spinner />
        }

        let pizza = this.state.error ? <p>Products can't be loaded!</p> : <Spinner/>
        if (this.state.products) {
            pizza = (
            <Aux>
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
        order = <Order
            products={this.state.products}
            price={this.state.totalPrice.toFixed(2)}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler} />
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {order}
                </Modal>
                {pizza}
                <Checkout/>
            </Aux>
        );
    }
}

export default PizzaCreator;