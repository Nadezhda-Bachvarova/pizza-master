import React,{ Component } from 'react';

import Layout from './components/Layout/Layout';
import PizzaCreator from './containers/PizzaCreator/PizzaCreator';
import RegisterControl from './components/Register/RegisterControl/RegisterControl';
import LoginControl from './components/Login/LoginControl/LoginControl';

import {
  Switch,
  Route
} from "react-router-dom";
class App extends Component {

  render () {
    return (
      <div>
        <Layout>
          <Switch>
            <Route exact path="/" component={PizzaCreator}/>
            <Route path="/register" component={RegisterControl}/> 
            <Route path="/login" component={LoginControl}/>
          </Switch>
        </Layout>     
      </div>
    )
  }
}

export default App;
