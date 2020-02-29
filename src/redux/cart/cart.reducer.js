import { ADD_CART_ITEM, CLEAR_ITEM_FROM_CART, REMOVE_CART_ITEM,  } from './cart.types';
import { addItemToCart, removeItemFromCart } from './cart.utils';

const INITIAL_STATE = {
    cartItems: [],
}

const cartReducer = (state = INITIAL_STATE, action) => {

    const { type, payload } = action;

    switch (type) {
        case ADD_CART_ITEM:
            return {
                ...state,
                cartItems: addItemToCart(state.cartItems, payload)
            };
        case REMOVE_CART_ITEM:
            return {
                ...state,
                cartItems: removeItemFromCart(state.cartItems, payload)
            };
        case CLEAR_ITEM_FROM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter(item => item._id !== payload._id)
            };
        default:
            return state;
    }
}

export default cartReducer;