import React,{ Component } from 'react';

import Layout from './components/Layout/Layout';
import HomePage from './components/HomePage/HomePage';
import RegisterControl from './components/Register/RegisterControl/RegisterControl';
import LoginControl from './components/Login/LoginControl/LoginControl';

import {
  Switch,
  Route,
  Redirect,
  withRouter,
} from "react-router-dom";
class App extends Component {
  render () {
    return (
      <div>
        <Layout>
        </Layout>
        
        <Switch>
          <Route exact path="/" component={HomePage}/>
          <Route path="/register" component={RegisterControl}/>
          <Route path="/login" component={LoginControl}/>
        </Switch>
      </div>
    )
  }
}

export default App;
