import { combineReducers } from 'redux';

import messagesReducer from './messages/messages.reducer';
import productsReducer from './products/products.reducer';


const rootReducer = combineReducers({
    messages: messagesReducer,
    products: productsReducer,
});

export default rootReducer;