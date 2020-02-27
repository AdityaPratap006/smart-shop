import { ADD_CART_ITEM, REMOVE_CART_ITEM } from './cart.types';
import { addItemToCart } from './cart.utils';

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
        default:
            return state;
    }
}

export default cartReducer;