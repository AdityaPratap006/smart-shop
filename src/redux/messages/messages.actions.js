import { ADD_MESSAGE, POP_MESSAGE } from "./messages.types";

export const addMessage = (message) => {

    return ({
        type: ADD_MESSAGE,
        payload: message,
    });
}

export const popMessage = () => {
    return {type: POP_MESSAGE}
}