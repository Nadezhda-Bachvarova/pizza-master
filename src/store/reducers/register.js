import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    name: null,
    email: null,
    password: null,
    error: null,
    loading: false, 
    regRedirectPath: '/login',
    register: false
};

const registerStart = (state, action) => {
    return updateObject(state, { error: null, loading: true })
};

const registerSuccess = (state, action) => {
    return updateObject(state, { 
        name: action.name,
        email: action.email,
        password: action.password,
        error: null,
        loading: false,
        register: true
     } );
};

const registerFail = (state, action) => {
    return updateObject(state, { 
        error: action.error, 
        loading: false 
    })
};

const setRegisterRedirectPath = (state, action) => {
    return updateObject(state, { regRedirectPath: action.path })
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.REGISTER_START: return registerStart(state, action);
        case actionTypes.REGISTER_SUCCESS: return registerSuccess(state, action);
        case actionTypes.REGISTER_FAIL: return registerFail(state, action);
        case actionTypes.SET_REGISTER_REDIRECT_PATH: return setRegisterRedirectPath(state, action);
        default: return state;
    }
};

export default reducer;