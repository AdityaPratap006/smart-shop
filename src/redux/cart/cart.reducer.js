import { 
    ADD_CART_ITEM, 
    CLEAR_ITEM_FROM_CART, 
    REMOVE_CART_ITEM, 
    SET_CART_ITEMS,
    ADD_CART_ITEM_START,
    ADD_CART_ITEM_SUCCESS,
    ADD_CART_ITEM_FAILURE,
    REMOVE_CART_ITEM_START,
    REMOVE_CART_ITEM_SUCCESS,
    REMOVE_CART_ITEM_FAILURE,  
} from './cart.types';

import { addItemToCart, removeItemFromCart } from './cart.utils';

const INITIAL_STATE = {
    cartItems: [],
    addingItem: false,
    addError: '',
    removingItem: false,
    removeError: '',
    clearingItem: false,
    clearError: '',
}

const cartReducer = (state = INITIAL_STATE, action) => {

    const { type, payload } = action;

    switch (type) {
        case SET_CART_ITEMS:
            return {
                ...state,
                cartItems: [...payload]
            };


        case ADD_CART_ITEM:
            return {
                ...state,
                cartItems: addItemToCart(state.cartItems, payload)
            };
        case ADD_CART_ITEM_START:
            return {
                ...state,
                addingItem: true,
                cartItems: addItemToCart(state.cartItems, payload)
            };
        case ADD_CART_ITEM_SUCCESS:
            return {
                ...state,
                addingItem: false,
                addError:'',
                cartItems: [...payload]
            };
        case ADD_CART_ITEM_FAILURE:
            return {
                ...state,
                addingItem: false,
                addError: payload.err,
                cartItems: removeItemFromCart(state.cartItems, payload.item)
            };


        case REMOVE_CART_ITEM:
            return {
                ...state,
                cartItems: removeItemFromCart(state.cartItems, payload)
            };
        case REMOVE_CART_ITEM_START:
            return {
                ...state,
                removingItem: true,
                cartItems: removeItemFromCart(state.cartItems, payload)
            };
        case REMOVE_CART_ITEM_SUCCESS:
            return {
                ...state,
                removeError: '',
                removingItem: false,
                cartItems: [...payload],
            };
        case REMOVE_CART_ITEM_FAILURE:
            return {
                ...state,
                removingItem: false,
                removeError: payload.err,
                cartItems: addItemToCart(state.cartItems, payload.item)
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