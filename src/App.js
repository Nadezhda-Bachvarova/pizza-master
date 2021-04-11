import React,{ Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import PizzaCreator from './containers/PizzaCreator/PizzaCreator';
import AuthControl from './containers/Authentication/AuthControl/AuthControl';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Logout from './containers/Authentication/Logout/Logout';
// import * as actions from './store/actions/index';

class App extends Component {

  render () {
    let routes = (
      <Switch>
        <Route path="/auth" component={AuthControl}/>
        <Route exact path="/" component={PizzaCreator}/>
        <Redirect to="/" />
      </Switch>
    );

    if ( this.props.isAuthenticated ) {
      routes = (
        <Switch>
          <Route path="/checkout" component={Checkout}/>
          <Route path="/orders" component={Orders}/>
          <Route path="/logout" component={Logout} />
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
    isAuthenticated: state.auth.token !== null
  };
};

export default withRouter( connect( mapStateToProps )( App ) );
