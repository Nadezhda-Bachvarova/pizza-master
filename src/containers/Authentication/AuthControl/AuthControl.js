import React, { Component} from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Button from '../../../components/UI/Button/Button';
import classes from './AuthControl.module.css';
import Input from '../../../components/UI/Input/Input';
import Spinner from '../../../components/UI/Spinner/Spinner';
import * as actions from '../../../store/actions/index';


class AuthControl extends Component {
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
                    minLengthPassword: 6,
                    maxLengthPassword: 20
                },
                valid: false,
                touched: false,
                password: false,
                error: 'The Password must be minimum 6 characters and maximum 20 characters!'
            }, 
        },
        isSignup: true,
        massage: null   
    }

    checkValidity(value, rules) {
        let isValid = true;
        let password = null;

        if (!rules) {
            return true;
        }
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.isEmail) {
            const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            isValid = pattern.test(value) && isValid
        } 
        if (rules.minLengthPassword) {
            password = value;
            isValid = value.length >= rules.minLengthPassword && isValid;
        } 
        if (rules.maxLengthPassword) {
            isValid = value.length <= rules.maxLengthPassword && isValid;
        }
        return isValid;
    }

    componentDidMount() {
        if (!this.props.pizzaCreating && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath();
        }
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
        this.props.onAuth( this.state.user.email.value, this.state.user.password.value, this.state.isSignup ); 
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSignup: !prevState.isSignup};
        });
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

        if (this.props.loading) {
            form = <Spinner />
        }

        let errorMessage = null;
        if (this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            );
        }

        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath}/>
        }

        let title =  null;
        let label = null;
        let buttonText = null;
        if (this.state.isSignup) {
            title = (<h3>REGISTER ACCOUNT</h3>)
            label = ('You have registration yet?')
            buttonText = ('SIGNIN')
        } else {
            title = (<h3>SIGNIN</h3>)
            label = ('You don\'t have registration? Let\'s do it.')
            buttonText = ('SIGNUP')
        }

        return (
            <div className={classes.RegisterControl}>
                {authRedirect}
                {errorMessage}
                {title}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="AuthCurrent">SUBMIT</Button>
                </form>
                    <p>{label} <Button btnType="Auth" clicked={this.switchAuthModeHandler}>{buttonText}</Button></p>
                    
            </div>
        )
    };
};

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        pizzaCreating: state.pizzaCreator.building,
        authRedirectPath: state.auth.authRedirectPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: ( email, password, isSignup ) => dispatch( actions.auth( email, password, isSignup ) ),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    };
};

export default connect(mapStateToProps, mapDispatchToProps) (AuthControl);