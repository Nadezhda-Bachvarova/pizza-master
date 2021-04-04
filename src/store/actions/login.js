import * as actionTypes from './actionTypes';

export const loginStart = () => {
    return {
        type: actionTypes.LOGIN_START,
        loading: true
    };
};

export const loginSuccess = (inputEmail, inputPassword) => {
    return {
        type: actionTypes.LOGIN_SUCCESS,
        email: inputEmail,
        password: inputPassword,
        login: true,
        isAuthenticated: true
    };
};

export const loginFail = (error) => {
    return {
        type: actionTypes.LOGIN_FAIL,
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem('email');
    localStorage.removeItem('password');
    return {
        type: actionTypes.LOGOUT,
        login: false
    };
};


export const setLoginRedirectPath = (path) => {
    return {
        type: actionTypes.SET_LOGIN_REDIRECT_PATH,
        path: path
    };
};

export const login = (email, password) => {
    return dispatch => {
        dispatch(loginStart());
        try {
            dispatch(loginStart())
            localStorage.setItem('email', email);
            localStorage.setItem('password', password);
            dispatch(loginSuccess())
        } catch(error) {
            dispatch(loginFail(error));
        }    
    }
};

export const loginCheckState = (inputEmail, inputPass) => {
    return dispatch => {
        const email = localStorage.getItem('email');
        if (!email) {
            dispatch(logout());
        } else {
            const password = localStorage.getItem('password');
            if (inputEmail === email && inputPass === password) {
                dispatch(loginSuccess(email, password));
            }
        }
    
    };
};