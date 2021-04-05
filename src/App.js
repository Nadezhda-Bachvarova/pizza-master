import React,{ Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import PizzaCreator from './containers/PizzaCreator/PizzaCreator';
import RegisterControl from './containers/Register/RegisterControl/RegisterControl';
import LoginControl from './containers/Login/LoginControl/LoginControl';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Logout from './containers/Login/Logout';
import * as actions from './store/actions/index';

class App extends Component {
  componentDidMount () {
    this.props.onTryAutoSignup();
  }

  render () {
    let routes = (
      <Switch>
        <Route path="/register" component={RegisterControl}/> 
        <Route path="/login" component={LoginControl}/>
        <Route exact path="/" component={PizzaCreator}/>
        <Redirect to="/" />
      </Switch>
    );

    if ( this.props.login ) {
      routes = (
        <Switch>
          <Route path="/checkout" component={Checkout}/>
          <Route path="/orders" component={Orders}/>
          <Route path="/" component={Logout}/>
          <Route exact path="/" component={PizzaCreator}/>
          <Redirect to="/" />
        </Switch>
      );
    }
    return (
      <div>
        <Layout>
          {routes}
        </Layout>     
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    login: state.login.login
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch( actions.loginCheckState() )
  };
};

export default withRouter( connect( mapStateToProps, mapDispatchToProps )( App ) );
