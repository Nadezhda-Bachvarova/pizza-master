import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import pizzaCreatorReducer from './store/reducers/pizzaCreator';
import orderReducer from './store/reducers/order';
import registerReducer from './store/reducers/register';
import loginReducer from './store/reducers/login';
import usersReducer from './store/reducers/users';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    pizzaCreator: pizzaCreatorReducer,
    order: orderReducer,
    register: registerReducer,
    login: loginReducer,
    users: usersReducer,
});

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

const app = (
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
ReactDOM.render( app, document.getElementById('root'));

reportWebVitals();
