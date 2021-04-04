import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import classes from './RegisterControl.module.css';
import Input from '../../../components/UI/Input/Input';
// import Spinner from '../../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';


class RegisterControl extends Component {
    state = {
        user: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Name'
                },
                value: '',
                validation: {
                    required: true,
                    minLengthName: 2,
                    maxLengthName: 20
                },
                valid: false,
                touched: false,
                error: 'The Name must be minimum 2 characters and maximum 20 characters!'
            },
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
                error: 'Must be a valid email!'
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6,
                    maxLength: 20
                },
                valid: false,
                touched: false,
                error: 'The Password must be minimum 6 characters and maximum 20 characters!'
            },
            repeatpassword: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Repeat Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLengthPassword: 6,
                    maxLengthPassword: 20
                },
                valid: false,
                touched: false,
                repPassword: false,
                error: 'Password don\'t match!'
            }  
        },
        isSignup: true     
    }

    checkValidity(value, rules) {
        let isValid = true;
        let password = null;
        let repeatPassword = null;

        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLengthName) {
            isValid = value.length >= rules.minLengthName && isValid;
        }
        
        if (rules.maxLengthName) {
            isValid = value.length <= rules.maxLengthName && isValid;
        }

        if (rules.minLengthPassword) {
            password = value;
            isValid = value.length >= rules.minLengthPassword && isValid;
        }

        if (rules.maxLengthPassword) {
            isValid = value.length <= rules.maxLengthPassword && isValid;
        }

        if (rules.isEmail) {
            const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            isValid = pattern.test(value) && isValid
        } 

        if (rules.repPassword) {
            repeatPassword = value;
            isValid = (password === repeatPassword) && isValid;
        }

        if (rules.isName) {
            const pattern = !/[^a-zA-Z]/;
            isValid = pattern.test(value) && isValid
        }
        return isValid;
    }

    inputChangedHandler = ( event, controlName ) => {
        const updateUserState = {
            ...this.state.user,
            [controlName]: {
                ...this.state.user[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.user[controlName].validation),
                touched: true
            }
        };
        this.setState({ user: updateUserState })
    }

    submitHandler = (event) => {
        event.preventDefault();
        let user = {
            name: this.state.user.name.value,
            email: this.state.user.email.value,
            password: this.state.user.password.value
        }
        this.props.addUser(user)
        this.signinHandler()
        // console.log('Users: ', this.props.users)
    }

    signinHandler = () => {
        this.props.history.push('/login');
    }

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

        return (
            <div className={classes.RegisterControl}>
                <form onSubmit={this.submitHandler}>
                    <h3>REGISTER ACCOUNT</h3>
                    {form}
                    <button className={classes.Signup}>Confirm</button>
                </form>
                    <button className={classes.Signin} onClick={this.signinHandler}>LOGIN</button>
            </div>
        )
    };
};

const mapStateToProps = state => {
    return {
        users: state.users
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addUser: user => dispatch(actions.addUser(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterControl);