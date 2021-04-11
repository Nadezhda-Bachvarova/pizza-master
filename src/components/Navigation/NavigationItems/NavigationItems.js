import React from 'react';
import { withRouter } from 'react-router-dom';

import classes from './NavigationItems.module.css';
import NavidationItem from './NavigationItem/NavigationItem';


const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavidationItem link="/about">About us</NavidationItem>
        <NavidationItem link="/" exact>Pizza</NavidationItem>
        {props.isAuthenticated ? <NavidationItem link="/orders">Orders</NavidationItem> : null}
        {!props.isAuthenticated 
            ? <NavidationItem link="/auth">Register   Signin</NavidationItem> 
            : <NavidationItem link="/logout">Logout</NavidationItem>}
    </ul>
);

export default withRouter(navigationItems);