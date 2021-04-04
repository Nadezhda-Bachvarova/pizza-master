import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import classes from './LoginControl.module.css';
// import * as actions from '../../../store/actions/index';

// import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';


class LoginControl extends Component {
    state = {
        user: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false,
                contentValidation: this.props.emailStore,
                error: 'Invalid email!'
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                contentValidation: this.props.passwordStore,
                error: 'Invalid password!'
            }  
        }     
    }

    checkValidity(value, rules) {
        let isValid = true;

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.contentValidation) {
            isValid = value === rules.contentValidation;
        }
        return isValid;
    }

    inputChangedHandler = (event, controlField) => {
        const currentUser = {
            ...this.state.user,
            [controlField]: {
                ...this.state.user[controlField],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.user[controlField].validation),
                touched: true
            }
        };
        this.setState({ user: currentUser })
    }

    submitHandler = (event) => {
        event.preventDefault();

        let users = this.props.users
        users.forEach(user => {
            if(user.email === this.state.user.email.value && user.password === this.state.user.password.value) {
                localStorage.setItem('user', JSON.stringify(user))
                // set isAutenticated = true !!!
                this.props.history.push('/')
            }
        });
    };       

    render() {
        const formElementsArray = [];
        for (let key in this.state.user) {
            formElementsArray.push({
                id: key,
                config: this.state.user[key]
            });
        }
        let form = formElementsArray.map(formElement => (
            <Input 
                key={formElement.id}
                elementType={formElement.config.elementType} 
                elementConfig={formElement.config.elementConfig} 
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                touched={formElement.config.touched}
                error={formElement.config.error}
                changed={(event) => this.inputChangedHandler(event, formElement.id)}/>    
        ));

        // if (this.props.loading) {
        //     form = <Spinner />
        // }

        return (
            <div className={classes.LoginControl}>
            <button className={classes.Back} onClick={() => {this.props.history.push('/')}}>Back</button>
                <form onSubmit={this.submitHandler}>
                    <h3>LOGIN</h3>
                        {form}
                    <button>LOGIN</button>
                </form>
                    <button onClick={() => {this.props.history.push('/register')}}>REGISTER</button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        users: state.users,
        // isAutenticated: state.isAutenticated
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default  withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginControl));
