import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import messagesReducer from './messages/messages.reducer';
import productsReducer from './products/products.reducer';
import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';
import registerUserReducer from './registerUser/registerUser.reducer';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: [ 'cart' ],
}

const rootReducer = combineReducers({
    messages: messagesReducer,
    products: productsReducer,
    user: userReducer,
    cart: cartReducer,
    registerUser: registerUserReducer,
});

export default persistReducer(persistConfig, rootReducer);