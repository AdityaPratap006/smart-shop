import { ADD_CART_ITEM, REMOVE_CART_ITEM, CLEAR_ITEM_FROM_CART, SET_CART_ITEMS } from './cart.types';

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