import { combineReducers } from 'redux';

import messagesReducer from './messages/messages.reducer';


const rootReducer = combineReducers({
    messages: messagesReducer,
});

export default rootReducer;