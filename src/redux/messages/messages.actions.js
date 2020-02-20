import { ADD_MESSAGE } from "./messages.types";

export const addMessage = (message) => {

    return ({
        type: ADD_MESSAGE,
        payload: message,
    });
}