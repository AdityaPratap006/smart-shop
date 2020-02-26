import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import messagesReducer from './messages/messages.reducer';
import productsReducer from './products/products.reducer';
import userReducer from './user/user.reducer';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: [ 'products' ],
}

const rootReducer = combineReducers({
    messages: messagesReducer,
    products: productsReducer,
    user: userReducer,
});

export default persistReducer(persistConfig, rootReducer);