import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addProduct = (name) => {
    return {
        type: actionTypes.ADD_PRODUCT,
        productName: name
    };
};

export const removeProduct = (name) => {
    return { 
        type: actionTypes.REMOVE_PRODUCT,
        productName: name
    };
};

export const setProducts = (products) => {
    return {
        type: actionTypes.SET_PRODUCTS,
        products: products
    };
};

export const fetchProductFailed = () => {
    return {
        type: actionTypes.FETCH_PRODUCTS_FAILED
    };
};

export const initProducts = () => {
    return dispatch => {
        axios.get('https://pizza-master-c580b-default-rtdb.europe-west1.firebasedatabase.app/products.json')
            .then( response => {
                dispatch(setProducts(response.data));
            } )
            .catch( error => {
                dispatch(fetchProductFailed());
            } );
    };
};