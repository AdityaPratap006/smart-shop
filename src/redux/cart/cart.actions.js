import { 
    ADD_CART_ITEM, 
    REMOVE_CART_ITEM, 
    CLEAR_ITEM_FROM_CART, 
    SET_CART_ITEMS, 
    ADD_CART_ITEM_START, 
    ADD_CART_ITEM_SUCCESS,
    ADD_CART_ITEM_FAILURE,
    REMOVE_CART_ITEM_START,
    REMOVE_CART_ITEM_SUCCESS,
    REMOVE_CART_ITEM_FAILURE,
    CLEAR_ITEM_FROM_CART_START,
    CLEAR_ITEM_FROM_CART_SUCCESS,
    CLEAR_ITEM_FROM_CART_FAILURE,
} from './cart.types';

import Axios from 'axios';

import { addItemToCart, removeItemFromCart } from './cart.utils';

export const setCartItems = cartItems => ({
    type: SET_CART_ITEMS,
    payload: cartItems,
})

export const addCartItem = item => ({
    type: ADD_CART_ITEM,
    payload: item,
})

export const removeCartItem = item => ({
    type: REMOVE_CART_ITEM,
    payload: item,
})

export const clearItemFromCart = item => ({
    type: CLEAR_ITEM_FROM_CART,
    payload: item,
})



//asynchronous actions

//add
export const addCartItemStart = (item) => ({
    type: ADD_CART_ITEM_START,
    payload: item
})

export const addCartItemSuccess = (cartItems) => ({
    type: ADD_CART_ITEM_SUCCESS,
    payload: cartItems
})

export const addCartItemFailure = (errorMessage,item) => ({
    type: ADD_CART_ITEM_FAILURE,
    payload: {err: errorMessage, item: item}
})

export const addCartItemStartAsync = (userId, cartItemsArray, item) => {

    return dispatch => {

        dispatch(addCartItemStart(item));
        Axios
        .post(`https://smart-shop-api.herokuapp.com/${userId}/addtocart`,{
            cartItems: addItemToCart(cartItemsArray, item)
        })
        .then(res => res.data)
        .then(userData => userData.data.cart)
        .then(cartItems => {
            console.log({userCart: cartItems});
            dispatch(addCartItemSuccess(cartItems));
        })
        .catch(err => {

            dispatch(addCartItemFailure(err.message, item));
        })
    }
}


//remove
export const removeCartItemStart = (item) => ({
    type: REMOVE_CART_ITEM_START,
    payload: item
})

export const removeCartItemSuccess = (cartItems) => ({
    type: REMOVE_CART_ITEM_SUCCESS,
    payload: cartItems
})

export const removeCartItemFailure = (errorMessage,item) => ({
    type: REMOVE_CART_ITEM_FAILURE,
    payload: {err: errorMessage, item: item}
})

export const removeCartItemStartAsync = (userId, cartItemsArray, item) => {

    return dispatch => {

        dispatch(removeCartItemStart(item));
        Axios
        .post(`https://smart-shop-api.herokuapp.com/${userId}/addtocart`,{
            cartItems: removeItemFromCart(cartItemsArray, item)
        })
        .then(res => res.data)
        .then(userData => userData.data.cart)
        .then(cartItems => {
            console.log({userCart: cartItems});
            dispatch(removeCartItemSuccess(cartItems));
        })
        .catch(err => {

            dispatch(removeCartItemFailure(err.message, item));
        })
    }
}

//clear
export const clearCartItemStart = (item) => ({
    type: CLEAR_ITEM_FROM_CART_START,
    payload: item
})

export const clearCartItemSuccess = (cartItems) => ({
    type: CLEAR_ITEM_FROM_CART_SUCCESS,
    payload: cartItems
})

export const clearCartItemFailure = (errorMessage,item) => ({
    type: CLEAR_ITEM_FROM_CART_FAILURE,
    payload: {err: errorMessage, item: item}
})

export const clearCartItemStartAsync = (userId, cartItemsArray, item) => {

    return dispatch => {

        dispatch(clearCartItemStart(item));
        Axios
        .post(`https://smart-shop-api.herokuapp.com/${userId}/addtocart`,{
            cartItems: cartItemsArray.filter(cartItem => cartItem._id !== item._id)
        })
        .then(res => res.data)
        .then(userData => userData.data.cart)
        .then(cartItems => {
            console.log({userCart: cartItems});
            dispatch(clearCartItemSuccess(cartItems));
        })
        .catch(err => {

            dispatch(clearCartItemFailure(err.message, item));
        })
    }
}
