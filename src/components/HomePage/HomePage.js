import React,{ Component } from 'react';
import classes from './HomePage.module.css';
import coverPhoto from '../../assets/images/cover.jpg';

class HomePage extends Component {
    render() {
        return (
            <div className={classes.HomePage}>
                <image src={coverPhoto} alt="MyPizza"/>
            </div>
        )
    }
}

export default HomePage;