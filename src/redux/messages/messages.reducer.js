import { ADD_MESSAGE, POP_MESSAGE } from './messages.types';

const INITIAL_STATE = {
    messageList: [],
};

const messagesReducer = ( state = INITIAL_STATE, action ) => {

    const { type, payload } = action;

    switch (type) {
        case ADD_MESSAGE:
            return {
                ...state,
                messageList: [...state.messageList, payload],
            };
        
        case POP_MESSAGE:
            return {
                ...state,
                messageList: [ ...state.messageList.slice(0,-1)]
            }

        default:
            return state;
    }
}

export default messagesReducer;