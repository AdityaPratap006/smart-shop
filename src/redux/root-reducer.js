import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import sessionStorage from 'redux-persist/lib/storage/session'

import messagesReducer from './messages/messages.reducer';
import productsReducer from './products/products.reducer';
import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';
import registerUserReducer from './registerUser/registerUser.reducer';
import routeReducer from './route/route.reducer';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: [ 'cart'],
}

const routePersistConfig = {
    key: 'route',
    storage: sessionStorage,
    whitelist: [ 'currentRoute' ]
}

const rootReducer = combineReducers({
    messages: messagesReducer,
    products: productsReducer,
    user: userReducer,
    cart: cartReducer,
    registerUser: registerUserReducer,
    route: persistReducer(routePersistConfig, routeReducer),
});

export default persistReducer(persistConfig, rootReducer);