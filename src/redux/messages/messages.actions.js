import { ADD_MESSAGE, POP_MESSAGE, RESTART, CLEAR_CHAT } from "./messages.types";

export const addMessage = (message) => {

    return ({
        type: ADD_MESSAGE,
        payload: message,
    });
}

export const popMessage = () => {
    return {type: POP_MESSAGE};
}

export const restartChat = () => {
    return {type: RESTART};
}

export const clearChat = () => {
    return {type: CLEAR_CHAT};
}