import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    email: null,
    password: null,
    error: null,
    loading: false, 
    logRedirectPath: '/',
    login: false
};

const loginStart = (state, action) => {
    return updateObject(state, { error: null, loading: true })
};

const loginSuccess = (state, action) => {
    return updateObject(state, { 
        email: action.email,
        password: action.password,
        error: null,
        loading: false,
        login: true
    });
};

const loginFail = (state, action) => {
    return updateObject(state, { 
        error: action.error, 
        loading: false 
    });
};

const setLoginRedirectPath = (state, action) => {
    return updateObject(state, { logRedirectPath: action.path })
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_START: return loginStart(state, action);
        case actionTypes.LOGIN_SUCCESS: return loginSuccess(state, action);
        case actionTypes.LOGIN_FAIL: return loginFail(state, action);
        case actionTypes.SET_LOGIN_REDIRECT_PATH: return setLoginRedirectPath(state, action);
        default: return state;
    };
};

export default reducer;