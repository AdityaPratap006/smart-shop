import { ADD_CART_ITEM, REMOVE_CART_ITEM } from './cart.types';

export const addCartItem = item => ({
    type: ADD_CART_ITEM,
    payload: item
})