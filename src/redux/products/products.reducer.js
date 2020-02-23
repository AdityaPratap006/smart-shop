import { SET_PRODUCT_TYPE, SET_PRODUCT_CATEGORY, SET_PRODUCT_BRAND, SET_PRODUCT_LIST } from './products.types';

const INITIAL_STATE = {
    type: null,
    category: null,
    brand: null,
    list: [],
}

const productsReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case SET_PRODUCT_TYPE:
            
            return {
                ...state,
                type: action.payload
            }
        
        case SET_PRODUCT_CATEGORY:

            return {
                ...state,
                category: action.payload
            }
        
        case SET_PRODUCT_BRAND:

            return {
                ...state,
                brand: action.payload
            }

        case SET_PRODUCT_LIST:

            return {
                ...state,
                list: action.payload
            }
        
        default:
            return state;
    }
}

export default productsReducer;