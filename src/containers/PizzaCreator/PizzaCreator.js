import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Pizza from '../../components/Pizza/Pizza';
import CreatePizzaControls from '../../components/Pizza/CreatePizzaControls/CreatePizzaControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderInformation from '../../components/Pizza/OrderInformation/OrderInformation';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';
import axios from '../../axios-orders';



class PizzaCreator extends Component {
    state = {
        purchasing: false
    }

    componentDidMount() {
        console.log(this.props); 
        this.props.onInitProducts();    
    }

    updatePurchaseState(products) {
        const sum = Object.keys(products)
            .map(prodKey => {
                return products[prodKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0;
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        const queryParams = [];
        for ( let i in this.state.products) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.products[i]));
        }
        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
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
        order = <OrderInformation
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
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        products: state.pizzaCreator.products,
        price: state.pizzaCreator.totalPrice,
        error: state.pizzaCreator.error,
        // isAuthenticated: state.auth.token !== null   -> login.token !== null
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onProductAdded: (productName) => dispatch(actions.addProduct(productName)),
        onProductRemoved: (productName) => dispatch(actions.removeProduct(productName)),
        onInitProducts: () => dispatch(actions.initProducts()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        // onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PizzaCreator);