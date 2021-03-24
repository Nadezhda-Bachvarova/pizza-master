import React,{ Component } from 'react';
import './App.css';
import HomePage from './components/HomePage/HomePage';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  withRouter,
} from "react-router-dom";

class App extends Component {
  render () {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={HomePage}/>
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App;
