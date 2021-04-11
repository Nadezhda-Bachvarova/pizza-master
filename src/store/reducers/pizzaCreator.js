import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    products: null,
    totalPrice: 5,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false,
    creating: false,
    building: false
}

const PRODUCT_PRICES = {
    pepperoni: 1.40,
    mushroom: 0.90,
    olive: 0.70,
    oregano: 0.20,
};

const addProduct = (state, action) => {
        const updatedProduct = { [action.productName]: state.products[action.productName] + 1 }
        const updatedProducts = updateObject( state.products, updatedProduct );
        const updatedState = {
            products: updatedProducts,
            totalPrice: state.totalPrice + PRODUCT_PRICES[action.productName],
            creating: true,
            building: true
        }  
        return updateObject( state, updatedState );
};

const removeProduct = (state, action) => {
    const updatedProduct = { [action.productName]: state.products[action.productName] - 1 }
    const updatedProducts = updateObject( state.products, updatedProduct );
    const updatedSt = {
        products: updatedProducts,
        totalPrice: state.totalPrice - PRODUCT_PRICES[action.productName],
        creating: true
    }
    return updateObject( state, updatedSt );
};

const setProducts = (state, action) => {
    return updateObject( state, {
        products: {
            pepperoni: action.products.pepperoni,
            mushroom: action.products.mushroom,
            olive: action.products.olive,
            oregano: action.products.oregano
        },
        totalPrice: 4,
        error: false,
        creating: false
    } );
};

const fetchProductsFailed = (state, action) => {
    return updateObject( state, { error: true } );
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.ADD_PRODUCT: return addProduct( state, action );
        case actionTypes.REMOVE_PRODUCT: return removeProduct(state, action);
        case actionTypes.SET_PRODUCTS: return setProducts(state, action);    
        case actionTypes.FETCH_PRODUCTS_FAILED: return fetchProductsFailed(state, action);
        default: return state;
    }
};

export default reducer;