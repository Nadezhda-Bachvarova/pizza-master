import React from 'react';

import classes from './NavigationItems.module.css';
import NavidationItem from './NavigationItem/NavigationItem';


const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavidationItem link="/" exact>Pizza</NavidationItem>
        <NavidationItem link="/orders">Orders</NavidationItem>
        {props.isAuthenticated
            ? <NavidationItem link="/logout">Logout</NavidationItem>
            : <NavidationItem link="/login">Login</NavidationItem>}
        {!props.isAuthenticated
            ? <NavidationItem link="/register">Register</NavidationItem>
            : null}
    </ul>
);

export default navigationItems;