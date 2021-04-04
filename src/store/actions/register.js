import * as actionTypes from './actionTypes';

export const registerStart = () => {
    return {
        type: actionTypes.REGISTER_START,
        loading: true
    };
};

export const registerSuccess = (name, email, password) => {
    return {
        type: actionTypes.REGISTER_SUCCESS,
        regRedirectPath: '/login',
        register: true,
        name: name,
        email: email,
        password: password
    };
};

export const registerFail = (error) => {
    return {
        type: actionTypes.REGISTER_FAIL,
        error: error
    };
};

export const register = (name, email, password) => {
    return dispatch => {
        dispatch(registerStart());
        try {
            dispatch(registerSuccess(name, email, password));
            localStorage.setItem('name', name)
            localStorage.setItem('email', email);
            localStorage.setItem('password', password);
        } catch(error) {
            dispatch(registerFail(error));
        }    
    };
};

export const setRegisterRedirectPath = (path) => {
    return {
        type: actionTypes.SET_REGISTER_REDIRECT_PATH,
        path: path
    };
};