import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactForm from './ContactForm/ContactForm';

class Checkout extends Component {

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace( '/checkout/contact-form' );
    }

    render () {
        let summary = <Redirect to="/" />
        if ( this.props.productsAmount ) {
            const purchasedRedirect = this.props.purchased ? <Redirect to="/"/> : null;
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary
                        products={this.props.productsAmount}
                        checkoutCancelled={this.checkoutCancelledHandler}
                        checkoutContinued={this.checkoutContinuedHandler} />
                    <Route
                        path={this.props.match.path + '/contact-form'}
                        component={ContactForm} />
                </div>
            );
        }
        return summary;
    }
}

const mapStateToProps = state => {
    return {
        productsAmount: state.pizzaCreator.products,
        purchased: state.order.purchased
    }
};

export default connect( mapStateToProps )( Checkout );