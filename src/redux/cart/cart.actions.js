import { 
    ADD_CART_ITEM, 
    REMOVE_CART_ITEM, 
    CLEAR_ITEM_FROM_CART, 
    SET_CART_ITEMS, 
    ADD_CART_ITEM_START, 
    ADD_CART_ITEM_SUCCESS,
    ADD_CART_ITEM_FAILURE
} from './cart.types';

import Axios from 'axios';

import { addItemToCart } from './cart.utils';

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