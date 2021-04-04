import { updateObject } from '../utility';

const addUser = (state, action) => {
    return [
        ...state,
        action.user
    ]
};

const setUserName = (state, action) => {
    return updateObject(state, {
        name: action.name
    })
}

const loginUser = (state, action) => {
    return updateObject(state, {
        email: action.email,
        password: action.password
    })
}

const logoutUser = (state, action) => {
    return updateObject(state, action)
}


const reducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_USER': return addUser(state, action);
        case 'LOGIN_USER': return loginUser(state, action);
        case 'LOGOUT': return logoutUser(state, action);
        case 'SET_USER_NAME': return setUserName(state, action);
        default: return state;
    }
};

export default reducer;