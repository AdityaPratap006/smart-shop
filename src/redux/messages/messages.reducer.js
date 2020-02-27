import { ADD_MESSAGE, POP_MESSAGE, RESTART, CLEAR_CHAT } from './messages.types';

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
                messageList: [ ...state.messageList.slice(0,-1)],
            };
        
        case RESTART:
            return {
                ...state,
                messageList: [
                    {
                        type: 'text',
                        bot: true,
                        content: `Hello Sir!`,
                         
                    },
                    {
                        type: 'text',
                        bot: true,
                        content: `I'm EVE, your personal shopping assistant!`,
                        
                    },
                    {
                        type: 'text',
                        bot: true,
                        content: ` What would you like to purchase today?`,
                        
                    },
                    {
                        type: 'typeList',
                        bot: true,
                       
                    },
                ],
            };
        case CLEAR_CHAT:
            return {
                ...state,
                messageList: [],
            };
        default:
            return state;
    }
}

export default messagesReducer;