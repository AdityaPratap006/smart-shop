import { ADD_MESSAGE } from './messages.types';

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
        default:
            return state;
    }
}

export default messagesReducer;