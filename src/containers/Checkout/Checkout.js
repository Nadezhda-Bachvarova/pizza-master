import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactForm from './ContactForm/ContactForm';

class Checkout extends Component {
    state = {
        products: null,
        totalPrice: 0
    }

    componentDidMount () {
        const query = new URLSearchParams(this.props.location.search);
        const products = {};
        let price = 0;
        for (let param in query.entries()) {
            if (param[0] == 'price') {
                price = param[1];
            } else {
                products[param[0]] = Number(param[1]);
            }
        }
        this.setState({products: products, totalPrice: price});
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('checkout/contact-form');
    }

    render() {
        return (
            <div>
                <CheckoutSummary 
                    products={this.state.products}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}/>
                <Route 
                    path={this.props.match.path + '/contact-form'}
                    render={(props) => (<ContactForm products={this.state.products} price={this.state.totalPrice} {...props} />)}/>
            </div>
        );
    }
}

export default Checkout;