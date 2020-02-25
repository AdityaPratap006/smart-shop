import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import messagesReducer from './messages/messages.reducer';
import productsReducer from './products/products.reducer';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: [ 'products' ],
}

const rootReducer = combineReducers({
    messages: messagesReducer,
    products: productsReducer,
});

export default persistReducer(persistConfig, rootReducer);